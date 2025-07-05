"use client";

import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";
import type AnimatedCounterProps from "@/types/animatedCounterProps";

export default function AnimatedCounter({
  from,
  to,
  animationOptions,
  format,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  const formatter =
    format === "currency"
      ? (v: number) =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(v)
      : (v: number) => v.toFixed(0);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || !inView) return;

    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = formatter(to);
      return;
    }

    const controls = animate(from, to, {
      duration: 1,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(value) {
        element.textContent = formatter(value);
      },
    });

    return () => controls.stop();
  }, [ref, inView, from, to]);

  return (
    <span className="inline-block relative">
      <span className="invisible block absolute">{formatter(to)}</span>
      <span ref={ref} />
    </span>
  );
}
