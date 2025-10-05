
export interface Point {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  clusterId: number; // -1 for noise, 0 for unclassified, 1+ for clusters
  alpha: number; // Current opacity (0-1)
  targetAlpha: number; // Target opacity to fade towards
  size: number; // Current size
  targetSize: number; // Target size to scale towards
}
