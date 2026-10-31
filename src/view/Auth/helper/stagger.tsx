import { fieldVariants } from "../animation"

export const stagger = (index: number) => ({
  variants: fieldVariants,
  initial: "hidden" as const,
  animate: "visible" as const,
  custom: index,
})
