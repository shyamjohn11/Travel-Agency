import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useSettings } from "../../hooks/useCms";
import { trackEvent } from "../../utils/track";

export default function FloatingActions() {
  const { business, marketing } = useSettings();
  const { pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  if (pathname.startsWith("/admin")) return null;
  const wa = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hi RJ Groups, I would like to plan a trip.")}`;
  return (
    <div className="rj-float">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            className="rj-float-btn rj-float-top"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <a className="rj-float-btn rj-float-call" href={`tel:${business.phone.replace(/\s/g, "")}`} onClick={() => trackEvent("contact", { method: "phone" })} aria-label="Call RJ Groups">
        <Phone size={20} />
      </a>
      {marketing.whatsappButton && (
        <a className="rj-float-btn rj-float-wa" href={wa} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("contact", { method: "whatsapp" })} aria-label="Chat on WhatsApp">
          <MessageCircle size={22} />
        </a>
      )}
    </div>
  );
}
