
export interface Point {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  clusterId: number; // -1 for noise, 0 for unclassified, 1+ for clusters
}
