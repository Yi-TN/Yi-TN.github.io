---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /in_progress/paint/
title: "Doodle War"
excerpt: "A third-person shooting game with stylized rendering"

header:
  teaser: /assets/images/paint/cover.png 
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/paint/pp_shader.png
#   actions:
#     - label: "GitHub"
#       url: "https://github.com/KoS-Y1/VRez"
#   caption: "Screenshot of my project VRez"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "3D Third-person Shooting Game"
  - title: "Game Engine"
    text: "Unreal Engine 5"
  - title: "Genre"
    text: "Third-person; Shooting"
  - title: "Team"
    text: "Solo"

---

{% include feature_row %}
**This project is still in progress**
{: .notice--success}

At the current stage, this project focuses on exploring and prototyping stylized rendering techniques for a third-person shooting game.

## Stylized Shader

### Cross Hatching Lines
I implemented a post-processing cross-hatching shader to create a hand-drawn, sketch-like effect. The shader overlays dynamically generated hatching lines based on scene lighting and tonal values, mimicking traditional pencil or ink shading.

To maintain visual clarity and artistic control, I use the custom stencil buffer to selectively apply the effect only to specific actors, allowing the rest of the scene to remain clean or use different rendering styles.

I provide a detailed breakdown of the shader’s implementation, including the math, texture usage, and Unreal Engine material in the post [Post-processing Cross Hatching Line Shader](/_posts/cross_hatching.md).

![Cross Hatching](/assets/images/paint/cross_hatching.png)