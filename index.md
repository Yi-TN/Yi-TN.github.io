---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: splash
author_profile: false
title: '<img src="/assets/images/bio-photo.jpg"
             alt="Yuzhe Yi"
             style="width:96px;height:96px;border-radius:50%;
                    object-fit:cover;vertical-align:middle;margin-right:12px;
                    border:2px solid rgba(255,255,255,.85);
                    box-shadow:0 2px 6px rgba(0,0,0,.25);" />
        Yuzhe Yi'
permalink: / 
classes: wide

header:
  overlay_color: "#000"
  overlay_filter: "0.7"
  overlay_image: /assets/images/vrez/1.png
  actions:
    - label: "About Me"
      url: /about/
    - label: "Resume"
      url:
  caption: "Screenshot of my project VRez"

excerpt: "Hi, I'm Yuzhe Yi, a <b>Game Graphics/Rendering Engineer</b>. I'm currently pursuing my Master's degree in Computing Science at University of Alberta."


completed_row:
  - image_path: /assets/images/vrez/2.png
    title: "VRez Renderer (2025)"
    excerpt: "A **Vulkan** Real-Time Renderer, with **Physical Based Rendering**, **Image Based Lighting**,**Forward + Deferred Pipelines**, **Shadow Map**, and **FXAA**.
    url: ""
    btn_label: "Read More"
    btn_class: "btn--success"
---

{% include feature_row %}