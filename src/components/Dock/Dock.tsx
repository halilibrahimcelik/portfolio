/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion';
import Link from 'next/link';
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import { Card } from '../ui/card';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  href: string;
  ariaLabel?: string;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  mouseX: MotionValue;
  spring: SpringOptions;
  ariaLabel?: string;
  distance: number;
  baseItemSize: number;
  magnification: number;
};
const MotionLink = motion.create(Link);
const MotionCard = motion.create(Card);
function DockItem({
  children,
  className = '',
  onClick,
  href,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  ariaLabel,
}: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const ishovered = useMotionValue(0);
  const pathname = usePathname();
  const allPaths = pathname.split('/');

  const isActive = allPaths.some(() => {
    if (allPaths.length > 2) {
      return href.includes(allPaths[1]);
    } else {
      return pathname === href;
    }
  });

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <MotionLink
      href={href}
      ref={ref}
      aria-label={ariaLabel}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => ishovered.set(1)}
      onHoverEnd={() => ishovered.set(0)}
      onFocus={() => ishovered.set(1)}
      onBlur={() => ishovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full dark:bg-secondary bg-primary shadow-md ${
        isActive
          ? 'gradient-border-pseudo ring-2 ring-blue-300 dark:ring-blue-600'
          : 'border-2'
      } ${className}`}
      tabIndex={0}
    >
      {Children.map(children, (child) =>
        cloneElement(
          child as React.ReactElement<{ ishovered?: MotionValue<number> }>,
          { ishovered }
        )
      )}
    </MotionLink>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};

function DockLabel({ children, className = '', ...rest }: DockLabelProps) {
  const { ishovered } = rest as { ishovered: MotionValue<number> };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = ishovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [ishovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060606] px-2 py-0.5 text-xs text-white`}
          role='tooltip'
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.3, stiffness: 150, damping: 12, bounce: 0.5, velocity: 1 },
  magnification = 70,
  distance = 200,
  panelHeight = 70,
  dockHeight = 506,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const ishovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification]
  );
  const heightRow = useTransform(ishovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ height, scrollbarWidth: 'none' }}
      className='mx-2 flex max-w-full items-center fixed bottom-3 left-1/2 bg-blend-multiply transform -translate-x-1/2'
    >
      <MotionCard
        onMouseMove={({ pageX }) => {
          ishovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          ishovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl  border-2 pb-2 px-4`}
        style={{ height: panelHeight }}
        role='toolbar'
        aria-label='Application dock'
      >
        {items.map((item, index) => (
          <DockItem
            ariaLabel={item.ariaLabel}
            href={item.href}
            key={index}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>

            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </MotionCard>
    </motion.div>
  );
}
