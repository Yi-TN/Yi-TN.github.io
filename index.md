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
    excerpt: "A **Vulkan** Real-Time Renderer, with **Physical Based Rendering**, **Image Based Lighting**,**Forward + Deferred Pipelines**, **Shadow Map**, and **FXAA**."
    url: "/completed_projects/vrez"
    btn_label: "Read More"
    btn_class: "btn--success"
  - image_path: /assets/images/maihime/cover.png
    title: "Fuuka Student Council (2025)"
    excerpt: "An idle fan game inspired by Mai-HiME."
    url: "/completed_projects/maihime"
    btn_label: "Read More"
    btn_class: "btn--success"
  - image_path: /assets/images/toybox/1.webp
    title: "Toy Box (2022)"
    excerpt: "Toy Box is a cute and playful mod with 500+ cheats, tweaks and quality of life improvements for Pathfinder: WoTR."
    url: "/completed_projects/toybox"
    btn_label: "Read More"
    btn_class: "btn--success"

inprogress_row:
  - image_path: /assets/images/vrez_rt/cover.png
    title: "VRez-RT"
    excerpt: "A **Vulkan** real-time Ray Tracer."
    url: "/in_progress/vrez_rt/"
    btn_label: "Read More"
    btn_class: "btn--success"
  - image_path: /assets/images/voxel/cover.png
    title: "PCG Voxel Editor"
    excerpt: "A procedurally generated voxel map editor plug-in for **Unreal Engine 5**."
    url: "/in_progress/voxel/"
    btn_label: "Read More"
    btn_class: "btn--success"
  - image_path: /assets/images/vr/cover.png
    title: "Fire Safe VR"
    excerpt: "A Virtual Reality (VR) simulation game designed to teach essential fire safety and evacuation procedures."
    url: "/in_progress/vr/"
    btn_label: "Read More"
    btn_class: "btn--success"

---

{% include feature_row %}

<h1><center>Completed Projects</center></h1>
<hr/>

{% include feature_row id= "completed_row" %}

<p><a class="btn btn--primary" href="{{ "/completed_projects/" | completed-archive }}">Explore all completed works &raquo;</a></p>


<h1><center>In Progress</center></h1>
<hr/>

{% include feature_row id= "inprogress_row" %}

<p><a class="btn btn--primary" href="{{ "/in_progress/" | inprogress-archive }}">Explore all in progress works &raquo;</a></p>
