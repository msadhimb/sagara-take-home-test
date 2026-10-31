import type { Variants } from "motion/react"

export const authTransition = {
  enter: 0.24,
  exit: 0.18,
  reduced: 0.12,
  distance: 24,
  stagger: 0.03,
  maxStagger: 5,
} as const

export const formVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? authTransition.distance : -authTransition.distance,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: authTransition.enter, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -authTransition.distance : authTransition.distance,
    opacity: 0,
    transition: { duration: authTransition.exit, ease: "easeIn" },
  }),
}

export const textVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: authTransition.enter, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: authTransition.exit, ease: "easeIn" },
  },
}

export const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      delay:
        Math.min(index, authTransition.maxStagger) * authTransition.stagger,
      ease: "easeOut",
    },
  }),
}
