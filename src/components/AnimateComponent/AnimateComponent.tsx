'use client';
import { HTMLMotionProps, motion } from 'framer-motion';

interface Props extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}
const AnimateComponent: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={props.initial}
      whileInView={props.whileInView}
      viewport={props.viewport}
      transition={props.transition}
      slot={props.slot}
      animate={props.animate}
      exit={props.exit}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};
export default AnimateComponent;
