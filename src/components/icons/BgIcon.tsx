'use client';
import { generateRandomStars } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface BgIconProps {
  bgColor?: string;
  gridColor?: string;
  starColor?: string;
}

const BgIcon: React.FC<BgIconProps> = ({
  bgColor = '#0e1217',
  gridColor = '#a8b3cf',
  starColor = '#a8b3cf',
}) => {
  const [gridClr, setGridColor] = useState(gridColor);
  const [starClr, setStarColor] = useState(starColor);
  const [bgClr, setBgColor] = useState(bgColor);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const stars = generateRandomStars(100, 200, 200, 0.3, 1.2);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (theme === 'dark') {
      setGridColor('#a8b3cf');
      setStarColor('#a8b3cf');
      setBgColor('#0e1217');
    } else {
      setGridColor('#0e1217');
      setStarColor('#0e1217');
      setBgColor('#fff');
    }
  }, [theme]);
  if (!mounted) return null;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      height='100%'
      viewBox='0 0 200 200'
      fill='none'
      preserveAspectRatio='xMidYMid slice'
    >
      {/* Background */}
      <rect
        width='2000'
        height='2000'
        fill={bgClr}
        style={{ transition: 'fill 0.3s ease-in' }}
      />

      {/* Grid pattern */}
      <pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'>
        {/* Horizontal dashed line */}
        <line
          x1='0'
          y1='10'
          x2='20'
          y2='10'
          stroke={gridClr}
          strokeWidth='0.06'
          strokeDasharray='1,1'
          style={{ transition: 'stroke 0.3s ease-in' }}
        />
        {/* Vertical dashed line */}
        <line
          x1='10'
          y1='0'
          x2='10'
          y2='20'
          stroke={gridClr}
          strokeWidth='0.06'
          strokeDasharray='1,2'
        />
        {/* Dots */}
        <circle cx='10' cy='10' r='0.3' fill={gridClr} />
      </pattern>
      <rect width='2000' height='2000' fill='url(#grid)' />

      {/* Stars */}
      <g
        suppressHydrationWarning
        style={{ transition: 'opacity 2s ease-in, fill 1s ease' }}
        fill={theme === 'dark' ? starClr : 'transparent'}
      >
        {stars?.map((star, index) => (
          <polygon key={index} points={star.points} />
        ))}
      </g>
    </svg>
  );
};

export default BgIcon;
