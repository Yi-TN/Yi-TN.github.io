---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /completed_projects/vrez/
title: "VRez Renderer"
excerpt: "A **Vulkan** real-time renderer with **Physically Based Rendering**, **Image-Based Lighting**, **Forward + Deferred Pipelines**, **Shadow Map**, and **FXAA**."

header:
  teaser: /assets/images/vrez/2.png 
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/vrez/1.png
  actions:
    - label: "GitHub"
      url: "https://github.com/KoS-Y1/VRez"
  caption: "Screenshot of my project VRez"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "3D Real-time Renderer"
  - title: "Programming Language"
    text: "C++"
  - title: "Highlight"
    text: "Vulkan renderer; deferred & forward pipelines; PBR; IBL; shadow map; FXAA"
  - title: "Team"
    text: "Solo"
  - title: "Work Period"
    text: "May 2025 – Sep 2025"

screenshots:
  - url: /assets/images/vrez/1.png
    image_path: /assets/images/vrez/1.png
  - url: /assets/images/vrez/2.png
    image_path: /assets/images/vrez/2.png
  - url: /assets/images/vrez/3.png
    image_path: /assets/images/vrez/3.png
  - url: /assets/images/vrez/4.png
    image_path: /assets/images/vrez/4.png

rendering_feature:
  - url: /assets/images/vrez/shadowmap.png
    image_path: /assets/images/vrez/shadowmap.png
    title: "Shadow Map"
  - url: /assets/images/vrez/position_metallic.png
    image_path: /assets/images/vrez/position_metallic.png
    title: "World Position & Metallic"
  - url: /assets/images/vrez/normal_roughness.png
    image_path: /assets/images/vrez/normal_roughness.png
    title: "Normal & Roughness"
  - url: /assets/images/vrez/albedo_ao.png
    image_path: /assets/images/vrez/albedo_ao.png
    title: "Albedo & Ambient Occlusion"
  - url: /assets/images/vrez/emissive.png
    image_path: /assets/images/vrez/emissive.png
    title: "Emissive"
  - url: /assets/images/vrez/depth.png
    image_path: /assets/images/vrez/depth.png
    title: "Depth Buffer"
  - url: /assets/images/vrez/pbr.png
    image_path: /assets/images/vrez/pbr.png
    title: "PBR in Deferred Pass"
  - url: /assets/images/vrez/forward_pbr.png
    image_path: /assets/images/vrez/forward_pbr.png
    title: "PBR in Forward Pass"
  - url: /assets/images/vrez/forward_depth.png
    image_path: /assets/images/vrez/forward_depth.png
    title: "Depth Buffer (Forward)"
  - url: /assets/images/vrez/skybox.png
    image_path: /assets/images/vrez/skybox.png
    title: "Skybox"
  - url: /assets/images/vrez/fxaa.png
    image_path: /assets/images/vrez/fxaa.png
    title: "FXAA On vs Off"
  - url: /assets/images/vrez/ui.png
    image_path: /assets/images/vrez/ui.png
    title: "UI"
---

{% include feature_row %}

## Screenshots

Here are some screenshots.

{% include gallery id="screenshots" caption="Screenshots of the app." %}

## Workflow

Here is the high-level workflow of the app:

![workflow](/assets/images/vrez/workflow.png)

## Rendering Features

The renderer is implemented by Vulkan, with GLSL for shaders.

### Deferred & Forward Rendering Pipeline

Very basic deferred & forward pipeline.

+ **Shadow Maps** (Depth Only)
    + Render *shadow-casting* objects to shadow maps
+ **Deferred Pass** (GBuffer + Lighting)
    + Render ever *opaque* object
    + Render *skybox*
+ **Forward Pass** 
    + Share depth buffer with Deferred Pass
    + Combine deferred buffers and calculate *PBR Lighting*
    + Render *transparent* objects (But for simple testing, I only used a opaque Castle, and it looks the same as the deferred rendered one)
+ **Post Processing**
    + FXAA
+ ** UI Pass**
    + ImGui UI

{% include gallery id="rendering_feature" caption="Graphics Pipeline" %}

### Based Rendering & Image Based Lighting

Inspired by [Learn OpenGL](https://learnopengl.com/), I implemented Physically Based Rendering (PBR) and Image-Based Lighting (IBL) to achieve realistic rendering results.

![PBR&IBL](/assets/images/vrez/pbr_result.png)

### Fast Approximate Anti-Aliasing

Based on [NVIDIA FXAA - TIMOTHY LOTTES](https://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf), I integrated FXAA (Fast Approximate Anti-Aliasing) into my renderer, achieving a fast and visually pleasing anti-aliasing effect.

## Other Features

### Thread Pool

To improve loading performance, I implemented a thread pool to handle parallelized asset loading.
This allows multiple assets (such as textures, meshes, and shaders) to load concurrently, reducing startup time and improving responsiveness.

Below is a snippet of the critical part of the worker thread logic:

```

void ThreadPool::Worker() {
    while (true) {
        std::function<void()> job;
        {
            std::unique_lock lock(m_mutex);
            // Wait for an available task
            m_cv.wait(lock, [this]() { return !m_tasks.empty() || m_stopped; });

            // Exit when
            // 1) Thread pool is shutting down and all tasks are finished
            // 2) Explicitly asked to stop
            if (m_stopped && m_tasks.empty()) {
                return;
            }

            // Fetch one task
            job = std::move(m_tasks.front());
            m_tasks.pop();
        }

        job();

        m_pendingTasks.fetch_sub(1, std::memory_order::memory_order_acq_rel);
        if (m_pendingTasks.load(std::memory_order_relaxed) == 0) {
            m_idleCv.notify_all();
        }
    }
}

```

### Shader System

I implemented a runtime GLSL-to-SPIR-V compilation system using [glslang](https://github.com/KhronosGroup/glslang). And I also integrated shader reflection with [SPIRV-Reflect](https://github.com/KhronosGroup/SPIRV-Reflect), allowing the engine to automatically extract descriptor bindings and push constants.

## To Improve

During development, I identified several areas for improvement:
+ The current logging system uses SDL_Log, which could be replaced with a more structured and formatted logging framework.
+ Vulkan objects currently require manual destruction. This approach is error-prone, and adopting a resource management pattern (such as reference counting or RAII wrappers) would make the system safer and more maintainable.

I am addressing these issues and exploring improved designs in my next project, VRez-RT.