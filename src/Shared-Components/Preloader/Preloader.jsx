import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plane } from "lucide-react";
import "./Preloader.css";

const SEEN = "rj_preloader_seen";
const LOGO = "/images/rj-groups-logo.png";

export default function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(SEEN) && !window.location.pathname.startsWith("/admin");
    } catch {
      return true;
    }
  });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!show) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 500 : 2100;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / total, 1);
      setPct(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(SEEN, "1");
        } catch {
          /* ignore */
        }
        setTimeout(() => setShow(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="rj-preloader"
          role="status"
          aria-label="Loading RJ Groups"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="rj-pl-stage">
            <div className="rj-pl-globe" aria-hidden="true">
              <span className="rj-pl-ring r1" />
              <span className="rj-pl-ring r2" />
              <span className="rj-pl-ring r3" />
              <span className="rj-pl-core" />
              <span className="rj-pl-orbit">
                <Plane size={26} />
              </span>
            </div>
            <img className="rj-pl-logo" src={LOGO} alt="RJ Groups" />
          </div>
          <div className="rj-pl-text" aria-hidden="true">
            {"RJ GROUPS".split("").map((c, i) => (
              <motion.span key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }}>
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </div>
          <p className="rj-pl-sub">Travel &middot; Tours &middot; Experiences</p>
          <div className="rj-pl-bar"><span style={{ width: `${pct}%` }} /></div>
          <span className="rj-pl-pct">{pct}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
