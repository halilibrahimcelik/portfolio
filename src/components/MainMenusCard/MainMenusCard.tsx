'use client';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text } from '../theme/typography';
import AnimatedCard from '../ui/AnimatedCard';

const MainMenusCard = ({
  title,
  description,
  circleSize = 400,
  Icon,
  className,
  children,
}: {
  title: string;
  description: string;
  circleSize?: number;
  Icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <AnimatedCard
      circleSize={circleSize}
      className={className + ' animated-border-wrapper'}
    >
      <div className='relative px-4 pb-2 pt-4'>
        <div className='flex  gap-2 items-center'>
          <Heading
            variant='h3'
            className='text-lg max-lg:whitespace-nowrap font-semibold text-neutral-800 dark:text-neutral-300'
          >
            {title}
          </Heading>
          {Icon && (
            <div className=' mt-* text-neutral-700 transition-all group-hover:opacity-100 dark:text-neutral-300'>
              {Icon}
            </div>
          )}
        </div>
        <Text className='relative'>{description}</Text>
      </div>
      {children && (
        <div
          className={cn(
            ' relative h-40 place-content-center overflow-hidden rounded-[15px] border-white bg-white/70 dark:border-neutral-950 dark:bg-black/50',
            className
          )}
        >
          {children}
        </div>
      )}
    </AnimatedCard>
  );
};

export default MainMenusCard;
