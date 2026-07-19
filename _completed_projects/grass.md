---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /completed_projects/grass/
title: "Procedural Grass"
excerpt: "A GPU-driven procedural grass renderer plug-in for **Unreal Engine 5**."

header:
  teaser: /assets/images/grass/cover.jpg
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/grass/Stats.png
  actions:
    - label: "GitHub"
      url: "https://github.com/KoS-Y1/ProceduralGrass"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "Plug-in"
  - title: "Game Engine"
    text: "Unreal Engine 5"
  - title: "Programming Language"
    text: "C++; HLSL"
  - title: "Highlight"
    text: "GPU-driven scatter; indirect draw into the GBuffer; LOD & culling; procedural wind"
  - title: "Team"
    text: "Solo"
  - title: "Work Period"
    text: "May 2026"
---

GPU-driven procedural grass renderer for Unreal Engine 5.7, inspired by [Procedural Grass in *Ghost of Tsushima*](https://www.youtube.com/watch?v=Ibe1JBF5i5Y&t). A compute pass scatters blades across a landscape footprint; an indirect draw builds low-poly Bézier blades directly into the GBuffer, with wind and a lighting approximation.

## Features
- **GPU placement:** a compute pass scatters blades per tile, with roots sampled from a landscape heightmap and culled by a grass mask.
- **Procedural blades:** low-poly Bézier blades built in the vertex shader; per-blade variation in height, width, bend, taper, and flutter.
- **Deferred rendering:** blades are indirect-drawn into the GBuffer and write real scene depth, so they receive engine lighting and shadows with no extra passes.
- **LOD & culling:** three distance-based LOD bands with per-LOD density and width compensation, frustum + per-tile culling, and a visible-tile budget.
- **Wind:** global direction and pulse plus scrolling gust and turbulence noise, with blade facing biased perpendicular to the wind.
- **Lighting & color:** root-to-tip AO gradient fakes canopy self-shadowing; base/tip color with hue and value jitter and a subsurface tint.
- **Live tuning:** blades are rebuilt on the GPU every frame, so every parameter on the component updates in real time.

## Pipeline Overview

The renderer hooks into Unreal's deferred path through a `FSceneViewExtension`. Each frame runs two GPU passes, with no CPU-side blade data and no per-frame uploads beyond the small tile list:

1. **Scatter (compute):** `GrassScatter.usf` reads the visible tile list, places blades into a `StructuredBuffer<FBladeInstance>`, and accumulates the instance count straight into an indirect-args buffer.
2. **Blade draw (raster):** `GrassBlade.usf` issues a single `DrawPrimitiveIndirect` per LOD, pulling each blade from the structured buffer and writing it into the GBuffer.

Tile visibility and LOD selection happen on the CPU in `PreRenderView_RenderThread`; the scatter and draw passes are added in `PostRenderBasePassDeferred_RenderThread`, after the base pass has populated scene depth.

## GPU Scatter

The landscape footprint is divided into square tiles, and each tile is an 8 × 8 grid of cells. The compute shader is dispatched with one thread group per visible tile and `numthreads(8, 8, 1)`, so each thread owns one cell:

```cpp
struct FGrassTile
{
    FVector2f OriginWS;
    float SizeWS;
    uint32 LodIndex;
};
```

The CPU passes the visible tiles for each LOD as a flattened array (`GroupCount = FIntVector(Tiles.Num(), 1, 1)`), and the thread group / thread IDs reconstruct the per-cell world position on the GPU. Within each cell, blades are sub-jittered on a configurable grid and go through several rejection stages before they are written:

- **Density rejection:** a per-blade hash is compared against the LOD-scaled density, discarding blades stochastically.
- **Footprint clip:** blades whose UV falls outside `[0, 1]` of the landscape are dropped.
- **Grass mask:** the single-channel mask is sampled; texels ≤ 0.5 are culled.
- **Root placement:** the heightmap is sampled to place the blade root at the correct world Z.

Every random value comes from a PCG hash seeded per tile and per cell, so placement is fully deterministic and stable frame-to-frame without storing any state. Surviving blades reserve a slot with an atomic add into the indirect-args buffer, which also becomes the instance count for the draw:

```hlsl
uint Index;
InterlockedAdd(OutIndirectArgs[1], 1u, Index);
OutBlades[Index] = BladeInstance;
```

## Blade Geometry

Each blade is drawn as a single triangle strip with no vertex buffer — the vertex shader builds geometry purely from `SV_VertexID` and the per-blade instance data. For LOD 0 there are 15 vertices (`SV_VertexID` 0–14): pairs of left/right vertices march up the blade, ending in a single tip vertex.

![Grass Vertices](/assets/images/grass/vertices.jpg)

The blade's spine is a cubic Bézier curve. `P0` is the root, `P1` lifts straight up, and `P2`/`P3` are offset by the bend midpoint and tip offset that the scatter pass computed from the blade's rest pose and the wind sample:

![Curve](/assets/images/grass/curve.jpg)

The vertex position is evaluated on the curve at parameter `t`, then pushed sideways along the width direction (perpendicular to the blade's facing) by a half-width that tapers toward the tip. The surface normal is the cross product of the width direction and the curve tangent (from the Bézier derivative), flipped to face outward and then bent slightly toward world-up to soften the lighting:

```hlsl
void MainVS(uint VertexID : SV_VertexID, uint InstanceID : SV_InstanceID, out FVSOut Out)
{
    const FBladeInstance BladeInstance = Blades[InstanceID];

    const uint Pair = VertexID >> 1;
    const uint Side = VertexID & 1;
    const bool bIsTip = (Pair == NumSegments);
    const float t = bIsTip ? 1.0f : float(Pair) / float(NumSegments);

    // Bézier curve
    const float3 P0 = BladeInstance.Position;
    const float3 P1 = P0 + float3(0.0f, 0.0f, BladeInstance.Height * 0.33f);
    const float3 P2 = P0 + BladeInstance.BendMidpoint;
    const float3 P3 = P0 + BladeInstance.TipOffset;
    float3 PosWS = BezierCubic(P0, P1, P2, P3, t);

    const float3 WidthDir = float3(-BladeInstance.Facing.y, BladeInstance.Facing.x, 0);
    const float SideSign = bIsTip ? 0.0f : (Side == 0 ? -1.0f : 1.0f);
    const float HalfW = BladeInstance.Width * 0.5f * (1.0f - t * GrassTaper);
    PosWS += WidthDir * SideSign * HalfW;

    const float3 Tan = normalize(BezierCubicTangent(P0, P1, P2, P3, t));
    const float3 Facing3D = float3(BladeInstance.Facing, 0.0f);
    float3 SurfaceNormalWS = normalize(cross(WidthDir, Tan));
    if (dot(SurfaceNormalWS, Facing3D) < 0.0f)
    {
        SurfaceNormalWS = -SurfaceNormalWS;
    }
    const float3 BentNormalWS = normalize(lerp(SurfaceNormalWS, WorldUp, GrassNormalBendUp));

    Out.SvPositon = mul(float4(PosWS, 1.0f), ViewProj);
    Out.SurfaceNormalWS = BentNormalWS;
    Out.BladeUV = float2(SideSign, t);
    Out.Seed = BladeInstance.Seed;
    Out.HueJitter = BladeInstance.HueJitter;
}
```

## LOD & Culling

Tile visibility is resolved on the CPU each frame. A tile is first tested against the camera frustum (using an AABB that spans the landscape height range plus the tallest blade), and surviving tiles pick a LOD band by distance to the eye:

| LOD | Segments | Vertices / blade |
|-----|----------|------------------|
| 0 (near)   | 7 | 15 |
| 1 (medium) | 3 | 7  |
| 2 (far)    | 2 | 5  |

Lower LODs also scale down placement density and compensate blade width, so distant grass keeps roughly the same visual coverage with far fewer blades. Each LOD owns its own tile list, blade buffer, and indirect draw, so the geometry cost falls off naturally with distance. The `NumSegments` value that drives the triangle-strip count is passed per-LOD instead of being hard-coded.

## Wind

Wind is sampled per blade in the scatter pass from `WindField.ush`, combining three layers:

- **Global flow:** a fixed direction whose magnitude pulses sinusoidally over time.
- **Gust:** a noise field scrolling along the wind direction that adds local strength.
- **Turbulence:** a second noise field that rotates the wind direction by a small angle, breaking up uniform sway.

The blade's facing is biased toward perpendicular-to-wind (so blades present their broad side as the wind picks up), and the wind contribution is folded into the tip offset and bend midpoint that shape the Bézier curve. A per-blade flutter term adds high-frequency jitter so neighbouring blades don't move in lockstep.

## Lighting & Color

Because blades write real depth and a full GBuffer, they receive the engine's lighting and shadows with no extra passes. The pixel shader fills the GBuffer with a default-lit material and bakes in a few cheap stylistic touches:

- A **root-to-tip color gradient** between a base and tip color, with per-blade hue and value jitter for variation.
- A **root-to-tip AO gradient** that darkens the base, faking canopy self-shadowing.
- A **subsurface tint** written to custom data for a soft translucent feel.

## Performance

![Stats](/assets/images/grass/Stats.png)

Frame rate stays stable at 60 FPS, and the grass passes cost only a fraction of a millisecond — thousands of blades drawn in well under 0.1 ms. Per-pass timings (`Grass.Scatter`, `Grass.BladeDraw`) are read with `ProfileGPU`.

## Screenshots

![Grass](/assets/images/grass/Grass.gif)



## Reference

- [Procedural Grass in *Ghost of Tsushima*](https://www.youtube.com/watch?v=Ibe1JBF5i5Y&t)
- [Prospecting for Hash Functions](https://nullprogram.com/blog/2018/07/31/)
