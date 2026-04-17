'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { useMoonRun } from './useMoonRun';
import { W, H } from './moonrun.types';

export default function MoonRunWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { score, best, handleInput } = useMoonRun(canvasRef);

  // Keyboard input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleInput();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleInput]);

  const padScore = (n: number) => String(n).padStart(4, '0');

  return (
    <Card className='overflow-hidden p-0 gap-0 border-[rgba(168,179,207,0.12)] bg-[#060910] hover:border-[rgba(108,140,255,0.3)] transition-colors'>
      {/* Header */}
      <div className='flex items-center justify-between px-3.5 py-2 border-b border-[rgba(168,179,207,0.07)]'>
        <div className='flex items-center gap-2'>
          <span className='animate-pulse text-sm'>👨‍🚀</span>
          <span
            className='text-[#a78bfa] tracking-wide'
            style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 8 }}
          >
            MOON RUN
          </span>
        </div>
        <div className='flex flex-col items-end gap-0.5'>
          <span className='text-[8px] text-[#6b7280] uppercase tracking-wider'>Score</span>
          <span
            className='text-[#6c8cff] leading-none'
            style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 10 }}
          >
            {padScore(score)}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={handleInput}
        onTouchStart={(e) => { e.preventDefault(); handleInput(); }}
        className='block w-full cursor-pointer touch-none'
        style={{ imageRendering: 'pixelated', aspectRatio: `${W}/${H}` }}
        aria-label='Moon Run game — press Space or tap to jump'
      />

      {/* Footer */}
      <div className='flex items-center justify-between px-3.5 py-2 border-t border-[rgba(168,179,207,0.07)]'>
        <div className='flex items-center gap-2'>
          <span className='text-[8px] text-[#6b7280] uppercase tracking-wider' style={{ fontFamily: 'var(--font-press-start), monospace' }}>
            BEST
          </span>
          <span
            className='text-[#fbbf24] leading-none'
            style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 8 }}
          >
            {padScore(best)}
          </span>
        </div>
        <span
          className='text-[#4b5563]'
          style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 7 }}
        >
          SPACE · TAP
        </span>
      </div>
    </Card>
  );
}
