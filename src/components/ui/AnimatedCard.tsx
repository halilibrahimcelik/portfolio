'use client';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useMouse } from '../../hooks/usemouse';

const AnimatedCard = ({
  className,
  circleSize = 400,
  children,
}: {
  circleSize: number;
  children?: ReactNode;
  className?: string;
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <div
      className={
        'group relative border dark:border-none  transform-gpu overflow-hidden rounded-[20px] bg-white/10 p-2 transition-transform hover:scale-[1.01] active:scale-90' +
        ' ' +
        className
      }
      ref={parentRef}
    >
      <div
        className={cn(
          'absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[3]',
          mouse.elementX === null || mouse.elementY === null
            ? 'opacity-0'
            : 'opacity-100'
        )}
        style={{
          maskImage: `radial-gradient(${
            circleSize / 2
          }px circle at center, white, transparent)`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${mouse.elementX}px`,
          top: `${mouse.elementY}px`,
          background:
            'linear-gradient(135deg, #3BC4F2, #7A69F9,#F26378,#F5833F)',
        }}
      />
      <div className='absolute inset-px rounded-[19px] bg-neutral-100/80 dark:bg-neutral-900/80' />

      {children}
    </div>
  );
};

export default AnimatedCard;
