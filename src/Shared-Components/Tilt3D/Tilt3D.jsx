import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** 3D mouse-tilt wrapper with moving glare. Disabled on touch + reduced motion. */
export default function Tilt3D({ children, max = 10, className = "", glare = true }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 160, damping: 18 });
  const sy = useSpring(y, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareBg = useTransform([sx, sy], ([a, b]) => `radial-gradient(circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,.35), transparent 55%)`);

  const enabled = !reduce && typeof window !== "undefined" && (window.matchMedia("(hover: hover)").matches || window.matchMedia("(pointer: fine)").matches);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  if (!enabled) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      className={`rj-tilt ${className}`}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && <motion.span className="rj-tilt-glare" style={{ background: glareBg }} aria-hidden="true" />}
    </motion.div>
  );
}
