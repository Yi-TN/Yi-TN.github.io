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

The goal is to integrate a modern **PBR** rendering pipeline alongside hardware-accelerated ray tracing**, and use this unified rendering system as the core of the engine.

## Rasterization

The rasterization path is based on the deferred and forward **PBR rendering pipeline** previously implemented in [VRez](/completed_projects/vrez/).

## Ray Tracing (WIP)

### Workflow

Below is a brief workflow (subject to updates).

![Workflow](/assets/images/vrez_rt/workflow.png)

## Levle / Scene System (WIP)

Similar to Unity and Unreal, a *Level* (or *Scene*) represents the primary workspace where game objects are placed to construct the game world. This includes:

- Geometry
- Lighting
- Environment data
- Global scene parameters

Scene data is stored in a **JSON file** and loaded at runtime.

Below is a simplified scene resource structure (subject to updates):

```cpp
struct SceneResource {
    std::vector<VulkanObject> instances;
    std::vector<ObjDesc>      objDescs;

    SceneGlobals globals;

    // GPU buffers for scene data
    VulkanBuffer objBuffer;
    VulkanBuffer cameraBuffer;

    SceneResource() = default;
    SceneResource(VulkanState& state, const SceneConfig& config);

    ......
};
```

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