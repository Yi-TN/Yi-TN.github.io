---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /in_progress/ink_mage/
title: "Ink Mage"
excerpt: "An online turn-based game."

header:
  teaser: /assets/images/ink_mage/cover.png 
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/ink_mage/banner.png
  actions:
    - label: "Itch.io"
      url: "https://github.com/KoS-Y1/VRez"
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

screenshots:
  - url: /assets/images/ink_mage/drawing.png
    image_path: /assets/images/ink_mage/drawing.png
  - url: /assets/images/ink_mage/cover.png
    image_path: /assets/images/ink_mage/cover.png
  - url: /assets/images/ink_mage/empty.png
    image_path: /assets/images/ink_mage/empty.png
  - url: /assets/images/ink_mage/GameOver.png
    image_path: /assets/images/ink_mage/GameOver.png

---

{% include feature_row %}
**This project is still in progress, with a playable demo available.**
{: .notice--success}

## My Responsibilities

### Lead Programmer
- Led technical discussions to define the core gameplay mechanics and the *Drawing–Analysis–Resolution* loop.
- Set up the base project structure in Unity with a modular codebase, enabling seamless integration between the Computer Vision and Networking modules.

Below is the initial architecture (subject to updates).

![uml](/assets/images/ink_mage/uml.png)

### Network Programmer
- Implemented a high-performance networking layer using the [MagicOnion](https://github.com/cysharp/magiconion) (gRPC) framework, enabling low-latency, real-time communication between clients and the server.
- Designed and optimized the server-side communication services to handle concurrent data streams from multiple players, ensuring the symbol recognition engine processes inputs without blocking the main thread.
- Developed the RPC interfaces and service definitions that standardized how the Unity client interacts with the server, enabling robust data serialization and synchronized state updates.
- Leveraged MagicOnion's **StreamingHub** to maintain persistent connections between clients and the server, allowing the server to push updates to multiple clients at any time.
- Deployed the server on Rapid Access Cloud, enabling players to connect 24/7.

## Network Design

### Overview
- Each client creates its own **GameHub** instance on the server upon connection.
- GameHub acts as a central coordinator, processing communication between clients and the server.
- **GameRoom** manages each ongoing game independently.
- GameHub maintains a static shared list of GameRooms across all connected clients.

![Network Overview](/assets/images/ink_mage/overview.png)

### GameHub
- Accepts connections from the client side and records the Connection ID alongside a unique GUID for later message verification.
- Processes requests from clients and sends messages back to them.
- Maintains a static list of GameRooms using thread-safe collections and guard locks.
- Responsible for assigning players to the appropriate GameRoom.

![GameHub](/assets/images/ink_mage/GameHub.png)

### GameRoom
- Operates as a finite state machine with four states: *Empty*, *Waiting*, *Active*, and *Ending*.
- Manages an individual game session, fully isolated from other sessions.
- Stores all relevant gameplay data using thread-safe collections and guard locks, including player count, player health, submitted drawings, and round timers.

![GameRoom](/assets/images/ink_mage/GameRoom.png)

### Game Logic
- **Round-Start Phase:** broadcasts a round-start message and initializes a server-side timer.
- **Drawing Phase:** gives players 10 seconds to draw; the phase ends when both players submit their drawings or the timer expires.
- **Resolve Phase:** recognizes the submitted drawings by comparing them against existing templates, then resolves the combat outcome based on drawing accuracy and spell data.
- **Round-End Phase:** sends the resolved results to both players and repeats the loop until one player is defeated.

![Game Logic](/assets/images/ink_mage/Gameplay.png)

## Gameplay
Ink Mage is a competitive multiplayer dueling game where your drawing skills determine your strength in battle. Face off against opponents in real time by sketching spell symbols to cast elemental attacks.

Each round, players have just 10 seconds to draw one of four elemental spells: *Fireball*, *Water Stream*, *Earth Block*, or *Air Cutter*. The closer your drawing matches the spell's template, the more powerful your attack becomes.

When spells collide, only the stronger one survives to continue forward and damage the opponent.

Elemental interactions add another layer of strategy, following a cyclical advantage system: *Fire > Earth > Air > Water > Fire*.

{% include gallery id="screenshots" caption="Screenshots of the game." %}