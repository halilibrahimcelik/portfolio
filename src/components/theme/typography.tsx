// components/Heading.tsx
import { cn } from '@/lib/utils';
import { HeadingProps, SmallTextProps } from './type';

const headingStyles = {
  h1: 'text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl',
  h2: 'text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl',
  h3: 'text-xl font-semibold md:text-2xl lg:text-3xl',
  h4: 'text-lg font-medium md:text-xl lg:text-2xl',
  h5: 'text-base font-medium md:text-lg lg:text-xl',
  h6: 'text-sm font-medium md:text-base lg:text-lg',
};

export function Heading({ variant, children, className }: HeadingProps) {
  const Tag = variant;
  return (
    <Tag className={cn(headingStyles[variant], className)}>{children}</Tag>
  );
}

const smallTextStyles = {
  default: 'text-sm md:text-base lg:text-lg',
  small: 'text-xs md:text-sm lg:text-base',
  xs: 'text-[0.7rem] md:text-xs ', // Extra small
  badge: 'text-[10px]',
};

export function Text({
  variant = 'default',
  children,
  className,
  icon,
}: SmallTextProps) {
  return (
    <p className={cn(smallTextStyles[variant], className)}>
      {icon && <span className='mr-2'>{icon}</span>}
      {children}
    </p>
  );
}
