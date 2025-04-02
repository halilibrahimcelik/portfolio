'use client';

import Link from 'next/link';
import { Button } from './button';

type Props = {
  className?: string;
  url: string;
};

const GoBackButton: React.FC<Props> = ({ className, url }) => {
  return (
    <Button asChild variant='default' className={`  ${className}`}>
      <Link href={url}>Go Back</Link>
    </Button>
  );
};
export default GoBackButton;
