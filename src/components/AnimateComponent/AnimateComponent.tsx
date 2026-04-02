"use client";
import { HTMLMotionProps, motion, useReducedMotion } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}
const AnimateComponent: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : props.initial}
      whileInView={shouldReduceMotion ? undefined : props.whileInView}
      viewport={props.viewport}
      transition={shouldReduceMotion ? { duration: 0 } : props.transition}
      slot={props.slot}
      animate={props.animate}
      exit={shouldReduceMotion ? undefined : props.exit}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};
export default AnimateComponent;
