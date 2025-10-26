---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /in_progress/vrez_rt/
title: "VRez-RT"
excerpt: "A **Vulkan** real-time **Ray Tracer**."

header:
  teaser: /assets/images/vrez_rt/cover.png 
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/vrez_rt/bg.png
#   actions:
#     - label: "GitHub"
#       url: "https://github.com/KoS-Y1/VRez"
#   caption: "Screenshot of my project VRez"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "3D Real-time Ray Tracer"
  - title: "Programming Language"
    text: "C++"
  - title: "Highlight"
    text: "Vulkan; Ray Tracing"
  - title: "Team"
    text: "Solo"


{% include feature_row %}

** This project is still in progress**
{: .notice--success}

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