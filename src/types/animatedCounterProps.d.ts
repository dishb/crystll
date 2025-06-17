import { KeyframeOptions } from "framer-motion";

export default interface AnimatedCounterProps {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
  format?: "currency" | "number";
}
