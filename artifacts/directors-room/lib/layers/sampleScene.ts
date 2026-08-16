import { SceneManifest } from "@/lib/types";

export const sampleScene: SceneManifest = {
  sourceImage: "/demo/layers-source.jpg",
  layers: [
    {
      id: "bg",
      name: "Background",
      type: "background",
      url: "/demo/layers-bg.png",
      visible: true,
      transform: { x: 0, y: 0, scale: 1, rotation: 0 },
    },
    {
      id: "subject",
      name: "Subject cutout",
      type: "cutout",
      url: "/demo/layers-subject.png",
      visible: true,
      transform: { x: 0, y: 0, scale: 1, rotation: 0 },
    },
    {
      id: "shadow",
      name: "Shadow",
      type: "shadow",
      url: "/demo/layers-shadow.png",
      visible: true,
      transform: { x: 0, y: 0, scale: 1, rotation: 0 },
    },
  ],
};
