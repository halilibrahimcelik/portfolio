'use client';
import { useState, useEffect } from 'react';
import { Card } from '../ui/card';

const StickyHeader: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 140;
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside
      className={`transition-all h-fit  duration-300 w-64  ${
        isSticky ? 'sticky top-20' : '  top-0'
      }`}
    >
      <Card className={` shadow-lg  min-h-60 `}>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-lg font-bold'>Sticky Header</h1>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default StickyHeader;
