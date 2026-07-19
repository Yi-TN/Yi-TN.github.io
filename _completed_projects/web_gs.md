---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /completed_projects/web_gs/
title: "WebGPU Gaussian Splatting Renderer"
excerpt: "A real-time 3D Gaussian Splatting renderer that runs in the browser."

header:
  teaser: /assets/images/web_gs/castle.png
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/web_gs/strawberry.png
  actions:
    - label: "GitHub"
      url: "https://github.com/KoS-Y1/Web-GS-Renderer"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "Gaussian Splatting Renderer"
  - title: "Programming Language"
    text: "JavaScript, WGSL"
  - title: "Highlight"
    text: "Gaussian Splatting; WebGPU; Radix Sort"
  - title: "Team"
    text: "Solo"
  - title: "Work Period"
    text: "June 2026"
---

A real-time [3D Gaussian Splatting](https://arxiv.org/pdf/2308.04079) renderer that runs in the browser, written in
JavaScript and WGSL on WebGPU.

## Features

- GPU-driven tile-based Gaussian splatting rasterizer
- GPU radix sort over per-tile splat instances, with a parallel prefix-sum scan
- Full spherical harmonics (degree 3) evaluated per frame from the view direction
- Load user input `.ply` model by file picker or drag-and-drop
- Live per-pass GPU timings, splat count, and FPS graph via [Tweakpane](https://tweakpane.github.io/docs/)

## Pipeline

Every frame is a chain of compute passes ending in one small render pass. The whole chain is skipped to improve the
performance when the camera hasn't moved, the canvas hasn't resized, and the model hasn't changed.

| #   | Pass         | Shader                | Dispatch                          |
| --- | ------------ | --------------------- | --------------------------------- |
| 1   | Preprocess   | `preprocess.wgsl`     | 1 thread per Gaussian (wg 32)     |
| 2   | Offset scan  | `offset_scan.wgsl`    | 1 workgroup                       |
| 3   | Emit         | `emit.wgsl`           | 1 thread per Gaussian (wg 256)    |
| 4   | Indirect arg | `indirect_arg.wgsl`   | 1 thread                          |
| 5   | Radix sort   | `radix_parallel.wgsl` | 4 passes × 5 dispatches, indirect |
| 6   | Tile ranges  | `tile_ranges.wgsl`    | 1 thread per instance, indirect   |
| 7   | Raster       | `raseter.wgsl`        | 1 workgroup per 16×16 tile        |
| 8   | Blit         | `blit.wgsl`           | 4-vertex triangle strip           |

- **Preprocess**: one thread per Gaussian. Projects each one to screen space, and culls whatever is behind the near
  plane or off-screen. Each survivor writes its conic/opacity, pixel center, color, tile AABB, and depth, so every later
  pass reads compact per-splat data instead of the raw Gaussian buffer.

- **Offset scan**: a single workgroup walks the per-Gaussian tiles-touched counts in 256-element blocks with a running
  carry, turning them into exclusive start offsets. The grand total is the frame's instance count.

- **Emit**: one thread per Gaussian expands it into one `(key, physicalIndex)` entry per touched tile, written starting
  at that Gaussian's offset. The 32-bit sort key is `[tile id : 16 | depth : 16]`, so a single unsigned sort orders by
  tile first and front-to-back depth second. `physicalIndex` points back at the Gaussian, so per-splat data is never
  duplicated.

- **Indirect arg**: clamps the instance count to the worst case, writes the sort's dispatch grid into the indirect
  buffer, and patches the real instance count into all four radix uniform slots. From here the sort's dispatch sizes
  come from the GPU, not the CPU.

- **Radix sort**: see below.

- **Tile ranges**: because the keys are sorted with the tile id in the high bits, each tile's instances are contiguous.
  Each thread compares its key's tile against its neighbor's and records the `(start, end)` boundary.

- **Raster**: one workgroup per 16×16 tile, one thread per pixel. Walks its tile's range in batches of 256,
  cooperatively staging each batch's conic/opacity/position into workgroup memory, then alpha-blends front-to-back. A
  workgroup-wide vote breaks the loop early once every pixel in the tile has saturated (`T < 1e-4`). Writes to an
  `rgba8unorm` storage texture.

- **Blit**: samples that texture onto the swap chain.

## Radix Sort

Least-significant-digit radix sort over the 32-bit key: **4 passes × 8 bits**, 256 digits, 256 elements per block. Keys
and physical indices ping-pong between two buffer pairs:

| Shift | Reads     | Writes    |
| ----- | --------- | --------- |
| 0     | `keys[0]` | `keys[1]` |
| 8     | `keys[1]` | `keys[0]` |
| 16    | `keys[0]` | `keys[1]` |
| 24    | `keys[1]` | `keys[0]` |

Four passes means the sorted result lands back in `keys[0]`, which is exactly what the tile-ranges and raster passes
bind.

Each pass runs **count → scan → reorder**:

- **Count**: each block histograms its 256 keys into workgroup memory, then writes its per-digit totals into the counts
  buffer **digit major**: `counts[digit * blockCountMax + block]`. That layout is the trick that makes the next step
  work: a single exclusive scan over the whole array yields, for every `(digit, block)` pair, the global position where
  that block's run of that digit begins.
- **Scan**: exclusive prefix sum over the counts buffer (the interesting part; see below).
- **Reorder**: each thread counts how many earlier threads in its block share its digit, then scatters to
  `counts[digit * blockCountMax + block] + rank`. Ranking against *earlier* threads only is what keeps the sort stable,
  which is what makes four independent 8-bit passes compose into a correct 32-bit sort.

Keys, physical indices, and the counts buffer are all allocated at worst-case size. `blockCountMax` is
`ceil(maxInstance / 256)` and the counts buffer is `256 × blockCountMax` entries. The uniform's `instanceCount` is
seeded with the worst case on the CPU, then overwritten with the real count by the indirect arg pass, so the dispatch
and the sort itself only touch live data, while the buffer layout stays fixed.

### Single-Workgroup Scan

The first implementation scanned the counts buffer in one workgroup, looping over it block by block with a carry, the
same shape as the offset scan. It's simple and correct, and it was catastrophically slow: **1414 ms**, over 99% of the
frame.

The reason is the size of the buffer it has to walk. The counts buffer is `256 × ceil(maxInstance / 256)` entries, and
`maxInstance` is the worst case (`gaussianCount × 64`) — for a model with hundreds of thousands of Gaussians that's tens
of millions of `u32`s. One workgroup means 256 threads serialize over all of it, four times a frame, while the rest of
the GPU idles.

This variant is preserved in `src/shaders/radix.wgsl` for reference. It is no longer imported by the renderer.

### Parallel Scan

The fix is the standard three-phase scan
from [GPU Gems 3, Ch. 39](https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-39-parallel-prefix-sum-scan-cuda),
which trades one serial walk for three fully parallel dispatches:

- **Scan local**: every 256-element block does its own Hillis-Steele inclusive scan in workgroup memory, converts it to
  exclusive, and writes its block total to a block-sums buffer. All blocks run concurrently.
- **Scan block sums**: one workgroup scans the (much smaller) block-sums buffer, giving each block its global base
  offset.
- **Scan add offset**: every block adds its base back into its local prefixes, again fully parallel.

Same result, but the only serial step now walks the block sums rather than the full counts array.

## Optimization

Per-frame averages from the in-app **GPU pass (ms)** panel. The `count`, `scan*`, and `reorder` rows are summed across
all four radix passes, since the profiler accumulates per label per frame.

### Single-Workgroup Scan

| Step         | Time (ms)    |
| ------------ | ------------ |
| preprocess   | 0.25         |
| offset scan  | 3.888        |
| emit         | 0.053        |
| indirect arg | 0.002        |
| count        | 0.16         |
| scan         | 1414.27      |
| reorder      | 0.39         |
| tile ranges  | 0.027        |
| raster       | 0.774        |
| blit         | 0.008        |
| **TOTAL**    | **1419.821** |

### Parallel Scan

| Step            | Time (ms)  |
| --------------- | ---------- |
| preprocess      | 0.727      |
| offset scan     | 4.782      |
| emit            | 0.309      |
| indirect arg    | 0.003      |
| count           | 0.689      |
| scan local      | 4.389      |
| scan block sums | 4.745      |
| scan add offset | 3.989      |
| reorder         | 3.372      |
| tile ranges     | 0.061      |
| raster          | 1.202      |
| blit            | 0.007      |
| **TOTAL**       | **24.274** |

## Screenshots
![Strawberry](/assets/images/web_gs/strawberry.png)
![Castle](/assets/images/web_gs/castle.png)

## Live Demo

<iframe src="/assets/demos/web_gs/"
        style="width:100%;aspect-ratio:16/9;border:1px solid #444;border-radius:6px"
        allowfullscreen></iframe>

{% include feature_row %}
Requires a WebGPU browser (Chrome/Edge 113+, or Safari 26+). Drag a `.ply` onto the canvas to load your own model.
{: .notice--success}


## Models

- [Strawberry](https://superspl.at/scene/84df8849)
- [Cochem Imperial Castle, Germany](https://superspl.at/scene/9b18007e)

## Reference

- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [WebGPU Samples](https://github.com/webgpu/webgpu-samples)
- [The PLY Format](https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply/)
- [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://arxiv.org/pdf/2308.04079)
- [Differential Gaussian Rasterization](https://github.com/graphdeco-inria/diff-gaussian-rasterization)
- [Introduction to GPU Radix Sort](https://gpuopen.com/download/Introduction_to_GPU_Radix_Sort.pdf)
- [GPU Gems 3, Chapter 39. Parallel Prefix Sum (Scan) with CUDA](https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-39-parallel-prefix-sum-scan-cuda)
