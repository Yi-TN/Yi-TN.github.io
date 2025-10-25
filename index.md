---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: splash
author_profile: false
title: "Yuzhe Yi"
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

{% if site.author.avatar %}
  <img src="{{ site.author.avatar | relative_url }}" alt="{{ site.author.name }}" class="hero-avatar">
{% endif %}
excerpt: "Hi, I'm Yuzhe Yi, a **Game Graphics/Rendering Engineer**. I'm currently pursuing my Master's degree in Computing Science at University of Alberta."

---

{% include feature_row %}