---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /blogs/cross_hatching/
title: "Cross Hatching Line"
excerpt: "Post-processing cross hatching line shader implemented in UE5."

header:
  teaser: /assets/images/blogs/cross_hatching/cover.png 
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/blogs/cross_hatching/partial_shader.png
#   actions:
#     - label: "GitHub"
#       url: "https://github.com/KoS-Y1/VRez"
#   caption: "Screenshot of my project VRez"

ScreenUVs:
  - url: /assets/images/blogs/cross_hatching/uv_ratio.png
    image_path: /assets/images/blogs/cross_hatching/uv_ratio.png 
  - url: /assets/images/blogs/cross_hatching/uv_unratio.png
    image_path: /assets/images/blogs/cross_hatching/uv_unratio.png

UvExamples:
  - url: /assets/images/blogs/cross_hatching/uv_1.png
    image_path: /assets/images/blogs/cross_hatching/uv_1.png
  - url: /assets/images/blogs/cross_hatching/uv_2.png
    image_path: /assets/images/blogs/cross_hatching/uv_2.png
  - url: /assets/images/blogs/cross_hatching/uv_3.png
    image_path: /assets/images/blogs/cross_hatching/uv_3.png

---

This shader is implemented in **Unreal Engine 5**, following the workflow in [Cross-Hatching material Post Process [UE5, valid for UE4]](https://www.youtube.com/watch?v=3Q6Ik1V75I8).

## Adjusted Screen UVs
Because the line patterns are generated from UVs, we must compensate for the viewport’s aspect ratio to prevent distortion when the view size changes. I applied a *Frac* node so we can have better visialization of it. Notice that no matter how we change the width of the view, it has no effect on the value along y axis.

{% include gallery id="ScreenUVs" caption="UVs with and without apply view aspect ratio" %}

![UV Ratio Math](/assets/images/blogs/cross_hatching/uv_math.png)

Next step, we need to move the UV origin to the center of the screen, and flip the G channel (Y axis, the height). I'll explain later why we need to do this. 

The final results of our adjusted screen UVs are shown below, as long as the shader nodes.

{% include gallery id="UvExamples" caption="Chaging height of the viewport only stretch the value along Y axis (1, 2); changing the width of the viewport introduces more value (2, 3)" %}

![UV nodes](/assets/images/blogs/cross_hatching/uv_node.png)

## Screen Relative Light Vector
The hatching lines are generated using both the adjusted UVs and the main directional light. Since the UVs are in view space, the light direction must also be transformed into view space for consistent calculations.

This can be done by using *TransformVector* node. After the transformation, we only use the R and G channels(x and y), since the view space is in 2D dimension. Finally, we normalized the vector for the later computations.

![Light Node](/assets/images/blogs/cross_hatching/light_vector.png)

## TBC...