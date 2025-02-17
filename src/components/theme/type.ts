import { ReactNode } from 'react';

export interface HeadingProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
}
export interface SmallTextProps {
  variant?: 'default' | 'small' | 'xs' | 'badge';
  children: ReactNode;
  className?: string;
  icon?: ReactNode; // Optional icon
}
