---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /posts/cross_hatching/
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

## Cross Hatching Lines

### Line Pattern Generation

Now we can generate our cross hatching line patterns. We start by taking the **dot product** of our *Adjusted Screen UVs* and *Screen Relative Light Vector*. This produces a smooth gradient ranging from black to white, depending on how aligned the UV direction is with the light direction. 

Next, we multiply this result by the **line density**, which controls how frequently the lines reapt. Finally, we apply the *Frac* node. Since *Frac* outputs only the fractional portion of the input value(a value between 0 and 1), which is exactly the color range from black to white. Thus, we get a neat, evenly spaced line patterns. 

If you are confused about how the dot product works here, try replacing the light vector with a custom float2 node. By manually changing its direction, you can clearly observe how the orientation of the light vector directly influences the direction and appearance of the cross hatching lines.

![Line Pattern](/assets/images/blogs/cross_hatching/line_pattern.png)

Right now, our lines are pretty jaggy, that's because at boundaries of each small gradient segment, the value abruptly jumps between 0 and 1. This causes the visible aliasing in the pattern. To smooth it out, we can remap the value from (0, 1) to (-1, 1), then take its absolute value. Now we will have a nice and smooth line patterns.

![Line Pattern](/assets/images/blogs/cross_hatching/smooth_line_pattern.png)