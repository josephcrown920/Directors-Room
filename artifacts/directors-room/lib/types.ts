export type CameraRig =
  | "roboarm" | "handheld" | "dolly" | "orbit" | "crane" | "fpv" | "static";

export interface Shot {
  id: string;
  order: number;
  title: string;
  prompt: string;
  referenceImages: string[];
  cameraRig: CameraRig;
  duration: number;
  resolution: "480p" | "720p" | "1080p";
  aspectRatio: "16:9" | "9:16" | "1:1";
  provider: "kling" | "fal" | "replicate";
  status: "draft" | "queued" | "processing" | "ready" | "failed";
  outputUrl?: string;
  continuityNotes?: string;
}

export interface Project {
  id: string;
  title: string;
  createdAt: string;
  shots: Shot[];
}

export type LayerType = "background" | "cutout" | "depth" | "mask" | "shadow";

export interface SceneLayer {
  id: string;
  name: string;
  type: LayerType;
  url: string;
  maskUrl?: string;
  visible: boolean;
  transform: { x: number; y: number; scale: number; rotation: number };
}

export interface SceneManifest {
  sourceImage: string;
  layers: SceneLayer[];
}
