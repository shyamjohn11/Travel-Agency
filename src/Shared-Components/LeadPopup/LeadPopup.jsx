import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useSettings } from "../../hooks/useCms";
import EnquiryForm from "../EnquiryForm/EnquiryForm";

/** Exit-intent (desktop) / timed (mobile) lead capture. Shows once per session. */
export default function LeadPopup() {
  const { marketing } = useSettings();
  const p = marketing.leadPopup;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!p?.active || pathname.startsWith("/admin") || sessionStorage.getItem("rj_popup_seen")) return undefined;
    const show = () => {
      if (sessionStorage.getItem("rj_popup_seen")) return;
      sessionStorage.setItem("rj_popup_seen", "1");
      setOpen(true);
    };
    const coarse = window.matchMedia("(hover: none)").matches;
    const t = setTimeout(show, coarse ? 35000 : 60000);
    const onLeave = (e) => e.clientY <= 0 && show();
    if (!coarse) document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [p?.active, pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="rj-modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            className="rj-modal"
            role="dialog"
            aria-modal="true"
            aria-label={p.title}
            initial={{ scale: 0.88, rotateX: 18, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 190, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="rj-modal-x" onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button>
            <span className="rj-eyebrow">Free planning</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <EnquiryForm compact source="lead-popup" cta={p.cta} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
