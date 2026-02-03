---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /in_progress/ink_mage/
title: "Ink Mage"
excerpt: "An online turned-base game."

header:
  teaser: /assets/images/ink_mage/banner/png 
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
    text: "2D online turn-based game"
  - title: "Game Engine"
    text: "Unity"
  - title: "Genre"
    text: "Online; Turn-based"
  - title: "Team"
    text: "2 Developers"

---

{% include feature_row %}
**This project is still in progress**
{: .notice--success}

## my responsibilities
### lead programmer
- Led technical discussions to define the core gameplay mechanics and the "Drawing-Analysis-Resolution" loop.
- Implemented the base project structure within Unity, ensuring a modular codebase that allows for seamless integration between the Computer Vision and Networking modules.

below is the designed structure (subject to updates).

![uml](/assets/images/ink_mage/uml.png)

### network programmer
- Implemented a high-performance networking layer using the [MagicOnion] (https://github.com/cysharp/magiconion).(gRPC) framework, enabling low-latency, real-time communication between clients and the server. 
- Designed and optimized the server-side communication services to handle concurrent data streams from multiple players, ensuring the symbol recognition engine processes inputs without blocking the main thread.
- Developed the RPC interfaces and service definitions that standardized how the Unity client interacts with the server, facilitating robust data serialization and synchronized state updates.