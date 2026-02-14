---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /in_progress/vrez_rt/
title: "VRez-RT"
excerpt: "A **Vulkan** real-time ray tracing and game engine."

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
    text: "3D Game Engine"
  - title: "Programming Language"
    text: "C++"
  - title: "Highlight"
    text: "Vulkan; Ray Tracing; Game Engine"
  - title: "Team"
    text: "Solo"

---

{% include feature_row %}
**This project is still in progress**
{: .notice--success}

**VRez-RT** started as a real-time ray tracing renderer. After reading  
[*Game Engine Architecture*](https://www.gameenginebook.com/), the scope expanded significantly.

This project is now both:
- A major upgrade to [VRez](/completed_projects/vrez/)
- A foundation for a full-featured game engine

The goal is to integrate a modern **PBR** rendering pipeline alongside hardware-accelerated **ray tracing**, and use this unified rendering system as the core of the engine.

## Rasterization

The rasterization path is based on the deferred and forward **PBR rendering pipeline** previously implemented in [VRez](/completed_projects/vrez/).

### Data Oriented Design (WIP)

While object-oriented design (OOD) is still widely used, modern game and rendering engines increasingly adopt **data-oriented design (DOD)** along with **bindless descriptors** to reduce CPU overhead. This becomes especially important when thousands of entities in a scene require rendering (or even frequent logic updates). As a result, I transitioned from a traditional OOD structure to a more data-driven workflow.

To improve flexibility when moving resources in memory, I also represent meshes, materials, and other assets using lightweight handles (a simple ``uint32_t`` for now) rather than raw pointers.


Below is a simplified structure of the render system：

``` c++
class SceneRenderer{
public:
    void Render()

private:
    std::vector<glm::mat4> m_entityTransforms{};
    std::vector<MeshHandle> m_entityMeshes{};
    std::vector<MaterialHandle> m_entityMaterials{};

......
}

```

Instead of calling ``entity->Draw()`` for every object, the renderer groups and sorts entities based on their mesh data, then issues batched ``vkCmdDrawIndexed`` calls. Materials are uploaded as an array at the beginning of the render pass, and push constants are used to pass the index of the active texture into the shader. This approach reduces cache misses and minimizes expensive draw and binding operations, resulting in improved rendering performance.

This design is still evolving as implementation details are refined, but the same data-oriented pattern will also be extended to other engine systems in the future.

## Ray Tracing (WIP)

### Workflow

Below is a brief workflow (subject to updates).

![Workflow](/assets/images/vrez_rt/workflow.png)



## Physics (TODO)
Planned integration of **NVIDIA PhysX** for:
- Rigid body simulation
- Collision detection
- Physics queries 

## Scripting (TODO)
Planned support for Lua scripting to enable:
- Gameplay logic
- Rapid iteration
- Tool-side customization

## Improvement

Here are some improvements compared to [VRez](/completed_projects/vrez/).

### Frames In Flight
[VRez](/completed_projects/vrez/) only uses a single frame of rendering context and relies on strict CPU–GPU synchronization. As a result, the CPU often has to stall while waiting for the GPU to finish processing the current frame before it can begin preparing the next one. This can significantly reduce overall throughput and introduce unnecessary idle time.

Modern rendering and game engines typically adopt a **double-buffering (or multi-buffering)** approach, where the CPU can begin updating resources for frame *n+1* while the GPU is still consuming resources for frame *n*. In Vulkan, this technique is commonly referred to as **frames in flight**.

I integrated this pattern into the project to improve parallelism between the CPU and GPU, reducing stalls and achieving smoother frame pacing.

### Reference-Counted Vulkan Object Management

Because Vulkan objects must be destroyed manually and in a specific order, I designed a reference-counted wrapper that automatically manages object lifetimes.

```cpp
template<typename Handle, class Deleter>
struct VkRcObject {
    std::atomic<uint32_t> m_refCount{1u};
    Handle                m_handle{};
    Deleter               m_deleter;

    VkRcObject(Handle handle, Deleter deleter)
        : m_handle(handle)
        , m_deleter(std::move(deleter)) {}
};

template<typename Handle, class Deleter>
class VkRc {
public:
    VkRc() noexcept = default;

    static VkRc MakeVkRc(Handle handle, Deleter deleter) {
        if (handle == VK_NULL_HANDLE) {
            return {};
        }
        return VkRc(new VkRcObject<Handle, Deleter>(handle, std::move(deleter)));
    }

    VkRc(const VkRc &other) noexcept
        : m_object(other.m_object) {
        this->IncreaseRef();
    }

    VkRc(VkRc &&other) noexcept
        : m_object(other.m_object) {
        other.m_object = nullptr;
    }

    VkRc &operator=(const VkRc &other) noexcept {
        if (this != &other) {
            other.IncreaseRef();
            Release();
            m_object = other.m_object;
        }
        return *this;
    }

    VkRc &operator=(VkRc &&other) noexcept {
        if (this != &other) {
            Release();
            m_object = other.m_object;
            other.m_object = nullptr;
        }

        return *this;
    }

    ~VkRc() { Release(); }

    [[nodiscard]] const Handle &GetHandle() const noexcept {
        if (m_object) {
            return m_object->m_handle;
        }
        return {};
    }

private:
    VkRcObject<Handle, Deleter> *m_object = nullptr;

    explicit VkRc(VkRcObject<Handle, Deleter> *object) noexcept
        : m_object(object) {}

    void IncreaseRef() {
        if (m_object) {
            ++m_object->m_refCount;
        }
    }

    void DecreaseRef() {
        if (m_object) {
            --m_object->m_refCount;
        }
    }

    void Release() {
        if (!m_object) {
            return;
        }

        DecreaseRef();
        if (m_object->m_refCount == 0) {
            if (m_object->m_handle != VK_NULL_HANDLE) {
                m_object->m_deleter(m_object->m_handle);
            }
            delete m_object;
        }
        m_object = nullptr;
    }
};


```

### More Compatible Thread Wrapper

Since some toolchains (e.g., Clang) don’t support std::jthread, I added a small wrapper for better portability.

```cpp
#pragma once

#include <thread>

// MSVC
#if defined(_cpp_lib_jthread) && (__cpp_lib_jthread >= 201911L)
    using Thread = std::jthread;

// CLANG
#else
class Thread {
public:
    Thread() noexcept = default;
    Thread(const Thread&) = delete;
    Thread& operator=(const Thread&) = delete;

    Thread(Thread&&) = default;
    Thread& operator=(Thread&&) = default;

    template <class F, class... Args>
    explicit Thread(F&& f, Args&&... args) : m_thread(std::forward<F>(f), std::forward<Args>(args)...) {}

    ~Thread() {
        if (m_thread.joinable()) {
            m_thread.join();
        }
    }


private:
    std::thread m_thread;
};
#endif

```

### Better Logging

I integrated [spdlog](https://github.com/gabime/spdlog) for structured logs with timestamps and levels, replacing SDL_Log.

![Log](/assets//images/vrez_rt/log.png)

### Better Shader Lanaguage
I migrated the project to use [Slang](https://github.com/shader-slang/slang), a modern shader language with a more expressive and ergonomic design. Compared to GLSL, Slang offers improved usability, better abstraction support, and a cleaner workflow for cross-platform shader development.