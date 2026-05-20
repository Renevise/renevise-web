"use client";

import {
  animate,
  motion,
  useMotionValue,
  type MotionProps,
  type Transition,
} from "motion/react";
import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

type DraggableCardProps = {
  children: ReactNode;
  className?: string;
  constraintsRef: RefObject<HTMLElement | null>;
  initial?: { rotate?: number };
  float?: { x?: number; y?: number; duration?: number; delay?: number };
  delay?: number;
  draggable?: boolean;
  z?: number;
  ariaLabel?: string;
  /** When this number changes (non-zero), the card springs back to its origin. */
  resetSignal?: number;
};

/**
 * Floating draggable card.
 *
 * Layered motion concerns (outer → inner):
 *  1. Entrance fade/slide (no drag, no motion values).
 *  2. Drag with momentum + parent constraints; offset stored on x/y motion values
 *     so `resetSignal` can imperatively spring them back to 0.
 *  3. Idle float (paused while dragging).
 */
export function DraggableCard({
  children,
  className,
  constraintsRef,
  initial,
  float,
  delay = 0,
  draggable = true,
  z = 10,
  ariaLabel,
  resetSignal = 0,
}: DraggableCardProps) {
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (resetSignal === 0) return;
    const ax = animate(x, 0, { type: "spring", stiffness: 260, damping: 26 });
    const ay = animate(y, 0, { type: "spring", stiffness: 260, damping: 26 });
    return () => {
      ax.stop();
      ay.stop();
    };
  }, [resetSignal, x, y]);

  const floatTransition: Transition = {
    duration: float?.duration ?? 6,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
    delay: float?.delay ?? 0,
  };

  const dragProps: MotionProps = draggable
    ? {
        drag: true,
        dragConstraints: constraintsRef,
        dragElastic: 0.18,
        dragMomentum: true,
        dragTransition: {
          power: 0.18,
          timeConstant: 220,
          bounceStiffness: 220,
          bounceDamping: 22,
        },
        onDragStart: () => setDragging(true),
        onDragEnd: () => setDragging(false),
        whileDrag: { scale: 1.04, cursor: "grabbing" },
      }
    : {};

  return (
    <motion.div
      className={cn("absolute will-change-transform", className)}
      style={{ zIndex: dragging ? 50 : z }}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.div
        role={draggable ? "button" : undefined}
        aria-label={ariaLabel}
        tabIndex={draggable ? 0 : undefined}
        className={cn(
          "touch-none select-none",
          draggable && "cursor-grab active:cursor-grabbing"
        )}
        style={{ x, y }}
        whileHover={{ scale: 1.025 }}
        {...dragProps}
      >
        <motion.div
          animate={
            dragging
              ? { x: 0, y: 0, rotate: initial?.rotate ?? 0 }
              : {
                  x: [0, float?.x ?? 6, 0],
                  y: [0, float?.y ?? -8, 0],
                  rotate: initial?.rotate ?? 0,
                }
          }
          transition={dragging ? { duration: 0.2 } : floatTransition}
          className={cn(
            "rounded-2xl transition-shadow duration-300",
            dragging &&
              "shadow-[0_0_0_1px_rgba(59,130,246,0.45),0_30px_70px_-15px_rgba(59,130,246,0.55)]"
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
