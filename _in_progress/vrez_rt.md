---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /in_progress/vrez_rt/
title: "VRez-RT"
excerpt: "A **Vulkan** real-time Ray Tracer."

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

---

{% include feature_row %}

** This project is still in progress**
{: .notice--success}

## Workflow

Below is a brief workflow (subject to updates).

![Workflow](/assets/images/vrez_rt/workflow.png)

## Improvement

Here are some improvements compared to [VRez](/_completed_projects/vrez.md).

### Reference-Counted Vulkan Object Management

Because Vulkan objects must be destroyed manually and in a specific order, I designed a reference-counted wrapper that automatically manages object lifetimes.

```
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

```

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
