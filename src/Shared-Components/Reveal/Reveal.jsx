import { motion, useReducedMotion } from "framer-motion";

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  flip: { hidden: { opacity: 0, rotateX: -50, y: 30 }, visible: { opacity: 1, rotateX: 0, y: 0 } },
  blur: { hidden: { opacity: 0, filter: "blur(12px)", y: 20 }, visible: { opacity: 1, filter: "blur(0px)", y: 0 } },
};

/** Scroll-triggered reveal. <Reveal variant="flip" delay={0.1}>...</Reveal> */
export default function Reveal({ children, variant = "up", delay = 0, duration = 0.7, as = "div", className, amount = 0.2, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) return <Tag className={className} {...rest}>{children}</Tag>;
  return (
    <Tag
      className={className}
      variants={VARIANTS[variant] || VARIANTS.up}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Animates a heading word-by-word. */
export function SplitHeading({ text, as = "h2", className, delay = 0 }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.h2;
  if (reduce) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }} aria-hidden="true">
          <motion.span
            style={{ display: "inline-block" }}
            variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
            transition={{ duration: 0.65, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
