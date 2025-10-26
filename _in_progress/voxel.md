---
layout: single          # use single so TOC is available
author_profile: false
toc: true
classes: wide
permalink: /in_progress/voxel/
title: "PCG Voxel Editor"
excerpt: "A procedurally generated voxel map editor plug-in for **Unreal Engine 5**."

header:
  teaser: /assets/images/voxel/cover.png 
  overlay_color: "#000"
  overlay_filter: 0.7
  overlay_image: /assets/images/voxel/bg.png
#   actions:
#     - label: "GitHub"
#       url: "https://github.com/KoS-Y1/VRez"
#   caption: "Screenshot of my project VRez"

# Optional info block (not a built-in MM sidebar component—just data you can render manually if you want)
sidebar:
  - title: "Type"
    text: "Plug-in"
  - title: "Game Engine"
    text: "Unreal Engine 5"
  - title: "Programming Language"
    text: "C++; Unreal Blueprints"
  - title: "Highlight"
    text: "Procedural Content Generation; Editor Utility Widgets"
  - title: "Team"
    text: "Solo"

---

{% include feature_row %}
**This project is still in progress**
{: .notice--success}
 
## Motivation & Goals

Inspired by *Minecraft* (of course!), I wanted to design a plug-in that can generate and save small voxel-based block lands based on user-defined parameters.  

These block lands can then be randomly combined to form a large, procedurally generated voxel world.


## Block Land Editor

### Utility
The editor allows users to automatically generate a rectangular-shaped block land by specifying:
+ Width and length  
+ Block type (e.g., grass, dirt, water, none)  
+ Erosion probability and erosion depth  

### Implementation

The editor is implemented entirely in Blueprints as an Editor Utility Widget.

![Generation](/assets/images/voxel/gen.png)

## Procedural Content Generation

There are several Procedural Content Generation (PCG) stages:
+ Random block land shapes  
+ Randomized block textures  
+ Random arrangement of block lands (shape and size) into a full block world  

### Block Land Shapes

Each saved Block Land Data Asset can be modified at runtime to create varied terrain shapes.  

For example, two block lands generated from the same 16×16 grassland data asset can have different eroded edges, producing more natural variation.


![Block Land Compared](/assets/images/voxel/1.png).

The erosion algorithm randomly removes blocks along the edges based on erosion probability and erosion depth.  
```cpp
void ABlockLand::GenerateLandFromData()
{
	if (!LandData || !BlockRegistry)
	{
		return;
	}

	if (!bEroded)
	{
		// Get a clone of the land data
		// So that every instance of it will have different randomized shape
		LandDataClone = DuplicateObject<UBlockLandDataAsset>(LandData, this);
		LandDataClone->RandomlyErodeEdges();
		bEroded = true;
	}

	for (int32 y = 0; y < LandDataClone->SizeY; ++y)
	{
		for (int32 x = 0; x < LandDataClone->SizeX; ++x)
		{
			const FBlock block = LandDataClone->GetBlock(x, y);

			if (block.Type == EBlockType::None)
			{
				continue;
			}

			const UBlockMetaData* BlockData = BlockRegistry->GetData(block.Type);
			if (BlockData == nullptr)
			{
				continue;
			}

			EBlockMeshType MeshType = EBlockMeshType::Center;
			UStaticMesh* Mesh = BlockRegistry->GetMesh(MeshType);
			UMaterialInterface* Material = BlockData->GetMaterial();

			if (Material == nullptr || Mesh == nullptr)
			{
				continue;
			}

			FName Key = MakeMeshKey(Mesh, Material);
			UInstancedStaticMeshComponent* ISM = nullptr;

			if (MeshInstances.Contains(Key))
			{
				ISM = MeshInstances[Key];
			}
			else
			{
				ISM = NewObject<UInstancedStaticMeshComponent>(this);
				ISM->RegisterComponent();
				ISM->AttachToComponent(RootComponent, FAttachmentTransformRules::KeepRelativeTransform);
				ISM->SetStaticMesh(Mesh);
				ISM->SetMaterial(0, Material);
				ISM->SetMobility(EComponentMobility::Static);
				ISM->SetCastShadow(false);
				MeshInstances.Add(Key, ISM);
			}

			FVector Position = FVector(x * 100.0f, y * 100.0f, 100.0f);
			ISM->AddInstance(FTransform(Position));
		}
	}
}
```

### Block Texture

Since the goal is procedural generation, I also applied PCG principles to texture creation.

Rather than providing many static textures, I designed a shader to generate seamless, pixel-styled procedural textures for each voxel block.

#### Noise Sampling
The block’s world position is used as input to a simple "randomizing" function (using sin and cos), and the result is added to the UV coordinates to sample from a noise texture.

![Texture 1](/assets/images/voxel/2.png)

#### Tinting:
The noise texture is then applied as a tint to a specific region (e.g., the grass portion) of the input texture

![Texture 2](/assets/images/voxel/3.png)


This produces a cohesive yet varied pixel-art style texture across the block land, enhancing visual richness without repetitive tiling.

### Block World (In Progress)

The next step is to implement the Block World system, which will combine multiple saved block lands into a large, fully procedural world.
