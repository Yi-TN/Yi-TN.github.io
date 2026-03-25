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

gltf:
  - url: /assets/images/vrez_rt/rendre_graph.png
    image_path: /assets/images/vrez_rt/rendre_graph.png

render_graph:
  - url: /assets/images/vrez_rt/gltf_scene.png
    image_path: /assets/images/vrez_rt/gltf_scene.png

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

### Render Graph
A render graph is a commonly used design pattern in modern game engines for organizing render passes, optimizing execution order, and automatically handling resource synchronization (e.g., barriers between passes).

For VRez-RT, I opted for a streamlined implementation. Our Render Graph is a **Directed Acyclic Graph (DAG)** where nodes represent **Render Passes** and edges represent **Resource Dependencies** (specifically, write-to-read operations).

To keep the system lightweighted, I made a few deliberate design:

- **Simplified Dependency Tracking:** I omit globally static resources (such as vertex buffers or bindless texture descriptors) from the graph tracking, as these are rarely written to during the frame.
- **Callback Driven Execution:** Actual Vulkan commands are recorded via lambdas, keeping the graph logic agnostic of specific rendering techniques.
- **String Key Lookup**: Both resources and passes are identified by readable names for easier debugging and configuration.

Below is the workflow of the render graph, following a strict lifecycle from a setup to execution phases:

- **Add Resources:** Declare images and buffers used within the graph. 
- **Set Final Resource:** Define the "Leaf Node" (e.g., the final rendered image) to allow the graph to prune unused passes.
- **Add Render Passes:** Specify the pipeline stage and the specific access masks for each resource.
- **Bind Callbacks:** Assign the C++ lambdas containing the actual draw/dispatch commands.
- **Output Callback:** Set a specialized lambda to handle the final resource (e.g. transitioning the layout of the result image so that it can be blitted to the Swapchain).
- **Build Graph:** Perform a DFS traversal to resolve execution order and inject automated barriers.
- **Execute:** Record the pre-calculated barriers and pass callbacks into the command buffer every frame.

{% include gallery id="render_graph" caption="Render Graph Workflow" %}

``` cpp
void RenderGraph::TraversePassDfs(uint32_t passIndex, std::unordered_set<uint32_t> &visited, std::unordered_set<uint32_t> &visiting) {
    if (visited.contains(passIndex)) {
        return;
    }

    DebugCheckCritical(!visiting.contains(passIndex), "Render graph circle detected at pass {}", m_passes[passIndex].GetName());
    visiting.emplace(passIndex);

    for (const auto &access: m_passResourceAccesses[passIndex]) {
        RenderResource::ResourceOperation operation = GetRenderOperation(access.access);
        if (operation == RenderResource::ResourceOperation::eReadOnly || operation == RenderResource::ResourceOperation::eReadWrite) {
            const RenderResource                  &resource = m_resources[access.resourceIndex];
            const RenderResource::ResourceVersion &version  = resource.GetResourceVersion(access.versionIndex);

            uint32_t writer = version.writerPass;
            if (writer != render_utils::kUnused) {
                TraversePassDfs(writer, visited, visiting);
            }
        }
    }

    visiting.erase(passIndex);
    visited.emplace(passIndex);

    m_executionOrder.push_back(passIndex);
}
```

### GLTF and Scene Resource
Instead of using `obj` format for meshes, I switch to use `gltf`, which provides a more compact file format and built-in support for PBR materials. 

Below is the resource management between `gltf` files and sence resource. The system is designed to support the **DOD** architecture (subject to updates).

{% include gallery id="gltf" caption="GLTF and Scene Resources Management" %}

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

### Better Logging

I integrated [spdlog](https://github.com/gabime/spdlog) for structured logs with timestamps and levels, replacing SDL_Log.

![Log](/assets//images/vrez_rt/log.png)

### Better Shader Lanaguage
I migrated the project to use [Slang](https://github.com/shader-slang/slang), a modern shader language with a more expressive and ergonomic design. Compared to GLSL, Slang offers improved usability, better abstraction support, and a cleaner workflow for cross-platform shader development.