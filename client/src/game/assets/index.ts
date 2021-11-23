export interface Asset {
  key: string;
  src: string;
  type:
    | "IMAGE"
    | "SVG"
    | "SPRITESHEET"
    | "AUDIO"
    | "TILEMAP_TILES"
    | "TILEMAP_MAP";
  data?: {
    frameWidth?: number;
    frameHeight?: number;
  };
}

