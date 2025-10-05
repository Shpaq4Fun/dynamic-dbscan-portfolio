import React, { useRef, useEffect } from 'react';
import { Point } from '../types';

const NUM_POINTS = 400;
const SPEED = 0.08;
const POINT_RADIUS = 3;
const EPSILON = 60; // DBSCAN epsilon (radius)
const MIN_PTS = 5; // DBSCAN min points
const FADE_SPEED = 0.008; // Speed of line fading

// A simple line object for tracking fades
interface Line {
  p1: Point;
  p2: Point;
  color: string;
  alpha: number;
  targetAlpha: number;
}

const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const linesRef = useRef<Map<string, Line>>(new Map());
  const animationFrameIdRef = useRef<number | null>(null);

  const clusterColors = [
    'rgb(0, 191, 255)',   // Deep Sky Blue
    'rgb(0, 255, 255)',   // Cyan / Aqua
    'rgb(70, 140, 220)',  // Steel Blue
    'rgb(135, 206, 255)', // Light Sky Blue
    'rgb(30, 144, 255)',  // Dodger Blue
    'rgba(88, 255, 199, 1)'  // 
    // 'rgba(94, 255, 0, 1)',  // 
    // 'rgba(179, 255, 0, 1)',  // 
    // 'rgba(255, 208, 0, 1)'  // 
  ];
  const noiseColor = 'rgb(150, 150, 150)';

  const dbscan = (points: Point[]) => {
    const dist = (p1: Point, p2: Point) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

    const getNeighbors = (point: Point, allPoints: Point[]): Point[] => {
        return allPoints.filter(otherPoint => point.id !== otherPoint.id && dist(point, otherPoint) <= EPSILON);
    };

    let clusterId = 1;
    for (const p of points) p.clusterId = 0; // Reset

    for (const p of points) {
        if (p.clusterId !== 0) continue;
        const neighbors = getNeighbors(p, points);

        if (neighbors.length < MIN_PTS) {
            p.clusterId = -1; // Noise
            continue;
        }

        p.clusterId = clusterId;
        const queue = [...neighbors];

        while (queue.length > 0) {
            const currentPoint = queue.shift()!;
            if (currentPoint.clusterId === -1) currentPoint.clusterId = clusterId;
            if (currentPoint.clusterId !== 0) continue;

            currentPoint.clusterId = clusterId;
            const currentNeighbors = getNeighbors(currentPoint, points);
            if (currentNeighbors.length >= MIN_PTS) {
                queue.push(...currentNeighbors);
            }
        }
        clusterId++;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Force canvas to maintain proper aspect ratio
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    if (pointsRef.current.length === 0) {
      for (let i = 0; i < NUM_POINTS; i++) {
        const angle = Math.random() * 2 * Math.PI;
        pointsRef.current.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          dx: Math.cos(angle) * SPEED,
          dy: Math.sin(angle) * SPEED,
          clusterId: 0,
          alpha: 0.3, // Start slightly visible
          targetAlpha: 0.3,
          size: POINT_RADIUS * 0.5, // Start smaller
          targetSize: POINT_RADIUS * 0.5,
        });
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill canvas with very dark blue background
      ctx.fillStyle = 'rgb(7, 10, 25)'; // Very dark blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Update and draw lines with fading ---
      const linesToDelete: string[] = [];
      linesRef.current.forEach((line, key) => {
        // Smoothly transition alpha
        if (Math.abs(line.alpha - line.targetAlpha) > 0.001) {
            line.alpha += (line.targetAlpha - line.alpha) * FADE_SPEED;
        } else {
            line.alpha = line.targetAlpha;
        }

        // If line is faded out, mark for deletion
        if (line.targetAlpha === 0 && line.alpha < 0.01) {
            linesToDelete.push(key);
        }

        // Draw the line if it's visible
        if (line.alpha > 0.01) {
            const lineColor = line.color.replace('rgb', 'rgba').replace(')', `, ${line.alpha})`);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(line.p1.x, line.p1.y);
            ctx.lineTo(line.p2.x, line.p2.y);
            ctx.stroke();
        }
      });
      
      linesToDelete.forEach(key => linesRef.current.delete(key));

      // --- Update point fading (size and opacity) ---
      for (const point of pointsRef.current) {
        // Smoothly transition alpha (opacity)
        if (Math.abs(point.alpha - point.targetAlpha) > 0.001) {
          point.alpha += (point.targetAlpha - point.alpha) * FADE_SPEED;
        } else {
          point.alpha = point.targetAlpha;
        }

        // Smoothly transition size
        if (Math.abs(point.size - point.targetSize) > 0.001) {
          point.size += (point.targetSize - point.size) * FADE_SPEED;
        } else {
          point.size = point.targetSize;
        }
      }

      // --- Update and draw points ---
      for (const point of pointsRef.current) {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x <= 0 || point.x >= canvas.width) point.dx *= -1;
        if (point.y <= 0 || point.y >= canvas.height) point.dy *= -1;

        const clusterIndex = (point.clusterId - 1) % clusterColors.length;
        const color = point.clusterId > 0 ? clusterColors[clusterIndex] : noiseColor;

        // Set enhanced glow for clustered points with dynamic intensity
        if (point.clusterId > 0) {
            ctx.shadowColor = color;
            // Dynamic glow intensity based on point alpha for enhanced visual feedback
            ctx.shadowBlur = 56 + (point.alpha * 15); // 35-50 range based on fade state
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        const radius = point.size;
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = point.alpha;
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha for next elements
      }
      ctx.shadowBlur = 0; // Reset shadow for next frame elements

      // --- Periodically run DBSCAN and update line targets ---
      if (frameCount % 350 === 0) {
        dbscan(pointsRef.current);
        const currentLineKeys = new Set<string>();
        const clusters: { [key: number]: Point[] } = {};

        pointsRef.current.forEach(p => {
          if (p.clusterId > 0) {
            if (!clusters[p.clusterId]) clusters[p.clusterId] = [];
            clusters[p.clusterId].push(p);
            // Set target values for clustered points
            p.targetAlpha = 1.0; // Full opacity for clustered points
            p.targetSize = POINT_RADIUS * 1.2; // Slightly larger for clustered points
          } else if (p.clusterId === -1) {
            // Set target values for noise points
            p.targetAlpha = 0.7; // Dimmer for noise points
            p.targetSize = POINT_RADIUS * 0.3; // Smaller for noise points
          } else {
            // Set target values for unclassified points
            p.targetAlpha = 0.7; // Very dim for unclassified points
            p.targetSize = POINT_RADIUS * 0.3; // Small for unclassified points
          }
        });

        // Identify all lines that should be visible
        for (const clusterId in clusters) {
            const pointsInCluster = clusters[clusterId];
            for (let i = 0; i < pointsInCluster.length; i++) {
                for (let j = i + 1; j < pointsInCluster.length; j++) {
                    const p1 = pointsInCluster[i];
                    const p2 = pointsInCluster[j];
                    const key = p1.id < p2.id ? `${p1.id}-${p2.id}` : `${p2.id}-${p1.id}`;
                    currentLineKeys.add(key);

                    // Get color directly from the first point to ensure consistency
                    const clusterIndex = (p1.clusterId - 1) % clusterColors.length;
                    const color = clusterColors[clusterIndex];
                    if (!linesRef.current.has(key)) {
                        // New line, start it with alpha 0
                        linesRef.current.set(key, { p1, p2, color, alpha: 0, targetAlpha: 0.4 });
                    } else {
                        // Existing line, ensure its target is to be visible and update color
                        const line = linesRef.current.get(key)!;
                        line.p1 = p1; // Update positions
                        line.p2 = p2;
                        line.color = color; // Update color to match current cluster color
                        line.targetAlpha = 0.4;
                    }
                }
            }
        }
        
        // Mark lines that are no longer in a cluster for fade-out
        linesRef.current.forEach((line, key) => {
            if (!currentLineKeys.has(key)) {
                line.targetAlpha = 0;
            }
        });
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
    />
  );
};

export default DynamicBackground;