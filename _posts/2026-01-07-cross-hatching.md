---
layout: single          # use single so TOC is available
author_profile: true
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

Now we can generate our cross hatching line patterns. We start by taking the **dot product** of our *Adjusted Screen UVs* and *Screen Relative Light Vector*. This produces a smooth gradient ranging from black to white, depending on how aligned the UV direction is with the light direction. 

Next, we multiply this result by the **line density**, which controls how frequently the lines reapt. Finally, we apply the *Frac* node. Since *Frac* outputs only the fractional portion of the input value(a value between 0 and 1), which is exactly the color range from black to white. Thus, we get a neat, evenly spaced line patterns. 

If you are confused about how the dot product works here, try replacing the light vector with a custom float2 node. By manually changing its direction, you can clearly observe how the orientation of the light vector directly influences the direction and appearance of the cross hatching lines.

![Line Pattern](/assets/images/blogs/cross_hatching/line_pattern.png)

Right now, our lines are pretty jaggy, that's because at boundaries of each small gradient segment, the value abruptly jumps between 0 and 1. This causes the visible aliasing in the pattern. To smooth it out, we can remap the value from (0, 1) to (-1, 1), then take its absolute value. Now we will have a nice and smooth line patterns.

![Smooth Line Pattern](/assets/images/blogs/cross_hatching/smooth_line_pattern.png)

Because our line patterns are composed of many repeating gradient segments from black to white, we can control the line thickness by adjusting how much of each segment remains in the black region. Practically, this means subtracting a **line thickness** value from the pattern, which shifts more of the gradient below zero and results in thicker lines.

We can further refine appearance by dividing the result by a **line contrast** value. This scales the gradient and allows us to control how sharp or soft the transition between dark and light areas appears.

Finally, don't forget to saturate the value after all these operations.

![Controlled Line Pattern](/assets/images/blogs/cross_hatching/line_control.png)

## Ink Masks
In traditional drawing, artists use dense lines to represent darker tones and fewer or no lines for lighter areas. We mimic this behavior by generating multiple ink masks based on image luminance and gradient thresholds.


First, we calculate the luminace of the image using [Relative Luminance](https://en.wikipedia.org/wiki/Relative_luminance) formula:
**L = 0.2126  * R + 0.7152 * G + 0.0722 * B**. 
In the shader, this is implemented by taking the dot product between the RGB value sampled from the post-processing texture and a constant float3(0.2126, 0.7152, 0.0722).

Since artists often layer multiple sets of cross-hatching lines to convey varying degrees of shading, we generate multiple ink masks rather than a single one. Each mask corresponds to a different luminance range and is created using an *Inverse Lerp (InvLerp)* with distinct threshold intervals. Apply *Step* node after it to get a black and white mask.
By stacking several InvLerp operations with progressively darker ranges, we obtain a set of ink masks that represent increasing shading intensity. These masks are later used to selectively apply different layers of cross-hatching lines, producing a more expressive and hand-drawn appearance.

![Ink Masks](/assets/images/blogs/cross_hatching/ink_masks.png)

## Apply Effect & Line Control

At this stage, the **ink mask** defines the regions where cross hatching lines should appear, with shaded areas represented as black(0). Since our line paterns are applied where the value is white(1), by multiply operation, we first need to invert the ink msk using *OneMinus(1-x)* operation. This converts the shaded regions into valid mask areass for applying the effect.

Next, we multiply the inverted ink mask with the generated **line pattern**, producing corss hatching only in the designated shaded regions. However, this operation results in all non-masked areas becoming black. To restore the background, we can apply another *OneMinus(1-x)* node to the result. Unfortunately, directly inverting at this stage also unintentionally reverses visiaul properties of the line patterns, such as line thickness and contrast. To resolve this, we can just simply apply *OneMinus(1-x)* node to the line pattern itself before multiplying it with the ink mask.


Before performing the final inversion, we also introduce a **line opacity** parameter. By multiplying the masked line pattern with this scalar value, we gain fine control over the visibility and strength of the cross hatching effect.

![Line Effect 1](/assets/images/blogs/cross_hatching/effect_1.png)

## Multi Cross Hatching Line Layers

## TBC...