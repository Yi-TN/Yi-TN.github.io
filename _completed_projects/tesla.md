---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /completed_projects/tesla/
title: "Tesla Game"
excerpt: "A 3D driving and combat game built from scratch in C++ using OpenGL and NVIDIA PhysX."

header:
  teaser: /assets/images/tesla/cover.png
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/tesla/bg.png
  actions:
    - label: "GitHub"
      url: "https://github.com/JuandeReiset/Tesla-Games"
  caption: "Screenshot of our game Tesla Game"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "3D Driving Game"
  - title: "Programming Language"
    text: "C++"
  - title: "Libaries for Building Engine"
    text: "OpenGL; PhysX"
  - title: "Genre"
    text: "Car Driving; Shooting"
  - title: "Team"
    text: "UCalgary, 5 developers"
  - title: "Work Period"
    text: "Jan 2020 - Apr 2020"

screenshots:
  - url: /assets/images/tesla/1.png
    image_path: /assets/images/tesla/1.png
  - url: /assets/images/tesla/2.png
    image_path: /assets/images/tesla/2.png
  - url: /assets/images/tesla/multi.png
    image_path: /assets/images/tesla/multi.png

---

{% include feature_row %}

**This is one of my early projects.**
{: .notice--danger}

Tesla Game was developed as a **university team project**, created entirely from scratch in **C++** using **OpenGL** and **NVIDIA PhysX**.  

Our goal was to design a **fun, fast-paced vehicle combat game** with realistic driving physics, weapon systems, and local multiplayer support.

We made this game before things went wild...

## Game Trailer

{% include video id="ftquclzoR98" provider="youtube" %}

## Gameplay
Tesla Game combines driving, shooting, and item mechanics.  

Players can race to the finish line or eliminate other cars using various weapons and items that alter the course of the match.  

Victory can be achieved either by finishing first or by defeating all opponents.

## My Responsibilities

### Prototype (Game Designer & Programmer)
+ Designed the core driving and shooting gameplay, including the item and weapon systems.  
+ Created the initial C++ architecture that served as the foundation of the game’s engine.

### Early Development (Graphics Programmer)
+ Integrated key dependencies such as OpenGL, Assimp, and stb_image for rendering, model importing, and texture loading.  
+ Implemented the core rendering pipeline for the custom game engine. 

### Late Development (UI & Graphics Programmer)
+ Designed and implemented the user interface, including the HUD, main menu, and pause menu.  
+ Added advanced graphical features such as blob shadows and skyboxes.  
+ Implemented local multiplayer via split-screen rendering.  

## Gallery
{% include gallery id="screenshots" caption="Screenshots of the game." %}
