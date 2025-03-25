'use client';
import { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedCard from '../ui/AnimatedCard';

interface TickerCarouselProps {
  items: React.ReactNode[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

const TickerCarousel = ({
  items,
  direction = 'left',
  speed = 190,
  className,
}: TickerCarouselProps) => {
  const baseX = direction === 'right' ? '-100%' : '0%';

  // Use ref to track and control animation
  const containerRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    // Calculate new position based on speed
    const speedFactor = speed * (delta / 1000);
    xPos.current += direction === 'right' ? speedFactor : -speedFactor;

    // Reset position when a full cycle completes
    const containerWidth = containerRef.current.offsetWidth;
    if (Math.abs(xPos.current) >= containerWidth) {
      xPos.current = 0;
    }

    // Apply the transformation
    containerRef.current.style.transform = `translateX(${xPos.current}px)`;
  });

  // Double the items to create a seamless loop
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className={cn('overflow-hidden relative', className)}>
      <div
        ref={containerRef}
        className='inline-flex flex-nowrap space-x-4'
        style={{ transform: `translateX(${baseX})` }}
      >
        {tickerItems.map((item, idx) => (
          <AnimatedCard
            circleSize={400}
            key={`${item}-${idx}`}
            className='inline-block px-4 py-2 text-nowrap w-32 text-neutral-800 dark:text-neutral-300'
          >
            {item}
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};
export default TickerCarousel;
