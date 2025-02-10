import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function generateStar(x: number, y: number, size: number) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5; // Divide the circle into 10 parts (5 outer, 5 inner points)
    const radius = i % 2 === 0 ? size : size / 2; // Alternate between outer and inner radius
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    points.push(`${px},${py}`);
  }
  return points.join(' ');
}
export function generateRandomStars(
  count: number,
  width: number,
  height: number,
  minSize: number,
  maxSize: number
) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width; // Random x position within the SVG width
    const y = Math.random() * height; // Random y position within the SVG height
    const size = minSize + Math.random() * (maxSize - minSize); // Random size between minSize and maxSize
    stars.push({ points: generateStar(x, y, size) });
  }
  return stars;
}
