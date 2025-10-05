import React, { useRef, useEffect } from 'react';
import { Point } from '../types';

const NUM_POINTS = 400;
const SPEED = 0.1;
const POINT_RADIUS = 3;
const EPSILON = 60; // DBSCAN epsilon (radius)
const MIN_PTS = 5; // DBSCAN min points
const FADE_SPEED = 0.01; // Speed of line fading

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
    'rgb(70, 130, 180)',  // Steel Blue
    'rgb(135, 206, 250)', // Light Sky Blue
    'rgb(30, 144, 255)',  // Dodger Blue
  ];
  const noiseColor = 'rgb(100, 100, 100)';

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
        });
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      // --- Update and draw points ---
      for (const point of pointsRef.current) {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x <= 0 || point.x >= canvas.width) point.dx *= -1;
        if (point.y <= 0 || point.y >= canvas.height) point.dy *= -1;

        const clusterIndex = (point.clusterId - 1) % clusterColors.length;
        const color = point.clusterId > 0 ? clusterColors[clusterIndex] : noiseColor;

        // Set glow for clustered points
        if (point.clusterId > 0) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 20;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        const radius = point.clusterId === -1 ? 0.5 * POINT_RADIUS : POINT_RADIUS;
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.shadowBlur = 0; // Reset shadow for next frame elements

      // --- Periodically run DBSCAN and update line targets ---
      if (frameCount % 250 === 0) {
        dbscan(pointsRef.current);
        const currentLineKeys = new Set<string>();
        const clusters: { [key: number]: Point[] } = {};

        pointsRef.current.forEach(p => {
          if (p.clusterId > 0) {
            if (!clusters[p.clusterId]) clusters[p.clusterId] = [];
            clusters[p.clusterId].push(p);
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

                    const color = clusterColors[(parseInt(clusterId) - 1) % clusterColors.length];
                    if (!linesRef.current.has(key)) {
                        // New line, start it with alpha 0
                        linesRef.current.set(key, { p1, p2, color, alpha: 0, targetAlpha: 0.4 });
                    } else {
                        // Existing line, ensure its target is to be visible
                        const line = linesRef.current.get(key)!;
                        line.p1 = p1; // Update positions
                        line.p2 = p2;
                        line.targetAlpha = 0.3;
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