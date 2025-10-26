---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /completed_projects/toybox/
title: "Toy Box"
excerpt: "Toy Box is a cute and playful mod with 500+ cheats, tweaks and quality of life improvements for Pathfinder: WoTR."

header:
  teaser: /assets/images/toybox/1.webp 
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/toybox/2.webp 
  actions:
    - label: "GitHub"
      url: "https://github.com/cabarius/ToyBox"
    - label: "Nexus Mods"
      url: "https://www.nexusmods.com/pathfinderwrathoftherighteous/mods/8"
  caption: "Screenshot of Toy Box in the game"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "Game mod"
  - title: "Programming Language"
    text: "C#"
  - title: "Highlight"
    text: "Gameplay; Cheating; Utilities for Players"
  - title: "Team"
    text: "Community Contributors (Open Source)"
  - title: "Work Period"
    text: "2022"

screenshots:
  - url: /assets/images/toybox/3.webp
    image_path: /assets/images/toybox/3.webp
  - url: /assets/images/toybox/4.webp
    image_path: /assets/images/toybox/4.webp
  - url: /assets/images/toybox/5.webp
    image_path: /assets/images/toybox/5.webp

---
{% include feature_row %}
**I no longer contribute to the project.**
{: .notice--info}

Toy Box is a cute and playful mod with 500+ cheats, tweaks and quality of life improvements for Pathfinder: WoTR. It was created in the spirit of Bag of Tricks & Cheat Menu but with a little different focus . It offers a powerful and convenient way to edit the party composition, stats, search and add Feats, Features, Items, etc. to party member.

## Screenshots
Here are a few examples of the in-game interface and features.

{% include gallery id="screenshots" caption="Screenshots of the mod interface in game." %}

## My Responsibilities
+ Collaborated with other modders and developers to integrate and refine features within a large existing codebase  
+ Added cheat and debug tools, enabling new gameplay toggles such as stat, inventory, and feature modifications  
+ Communicated with the player community to plan and prioritize future features  
+ Assisted other contributors in resolving technical issues during development  

## Workflow
+ Analyzed the game’s codebase using the [dnSpy](https://github.com/dnSpyEx/dnSpy/) decompiler.
+ Developed a C# library to inject and modify game code .
    + Utilized [Unity Mod Manager (UMM)](https://www.nexusmods.com/site/mods/21) to load the library.
    + Applied runtime patches using[Harmony](https://harmony.pardeike.net/) to modify game behavior directly.
+ Inspected internal game mechanics represented as [Blueprints](https://github.com/WittleWolfie/OwlcatModdingWiki/wiki/%5BWrath%5D-Blueprints), using tools such as (BubblePrints)[https://github.com/factubsio/BubblePrints] and [Data Viewer](https://www.nexusmods.com/pathfinderwrathoftherighteous/mods/9), to understand and modify gameplay data.