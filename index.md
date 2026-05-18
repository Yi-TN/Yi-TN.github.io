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
      url: /resume/
  caption: "Screenshot of my project VRez"

excerpt: "Hi, I'm Yuzhe Yi, a <b>Game Graphics/Rendering Engineer</b>. I'm currently pursuing my Master's degree in Computing Science at University of Alberta."


completed_row:
  - image_path: /assets/images/vrez/2.png
    title: "VRez Renderer (2025)"
    excerpt: "A Vulkan Real-Time Renderer."
    url: "/completed_projects/vrez"
    btn_label: "Read More"
    btn_class: "btn--success"
  
  - image_path: /assets/images/ntc/ntc.png
    title: "Neural Texture Compression (2026)"
    excerpt: "A neural texture compression and rendering experiment."
    url: "/completed_projects/ntc"
    btn_label: "Read More"
    btn_class: "btn--success"

  - image_path: /assets/images/drez/cover.png
    title: "DRez Renderer (2026)"
    excerpt: "A DirectX 12 Real-Time Renderer."
    url: "/completed_projects/drez"
    btn_label: "Read More"
    btn_class: "btn--success"

inprogress_row:
  - image_path: /assets/images/vrez_rt/cover.png
    title: "VRez-RT"
    excerpt: "A **Vulkan** real-time ray tracing and game engine."
    url: "/in_progress/vrez_rt/"
    btn_label: "Read More"
    btn_class: "btn--success"
  - image_path: /assets/images/paint/cover.png
    title: "Doodle War"
    excerpt: "A third-person shooting game with stylized rendering"
    url: "/in_progress/paint/"
    btn_label: "Read More"
    btn_class: "btn--success" 
  - image_path: /assets/images/ink_mage/cover.png
    title: "Ink Mage"
    excerpt: "An online turned-base game."
    url: "/in_progress/ink_mage/"
    btn_label: "Read More"
    btn_class: "btn--success"

posts_row:
  - image_path: /assets/images/blogs/cross_hatching/cover.png
    title: "Cross Hatching Line"
    excerpt: "Post-processing cross hatching line shader implemented in UE5."
    url: "/posts/cross_hatching/"
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

<h1><center>Posts</center></h1>
<hr/>


{% include feature_row id= "posts_row" %}

<p><a class="btn btn--primary" href="{{ "/posts/" | posts-archive }}">Explore all posts &raquo;</a></p>
