import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import "./CookieConsent.css";

import { getConsent, KEY } from "../../utils/consent";
const save = (c) => {
  const value = { necessary: true, analytics: !!c.analytics, marketing: !!c.marketing, ts: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch (e) { console.error("Failed to save cookie consent to localStorage", e) }
  window.dispatchEvent(new CustomEvent("rj:consent", { detail: value }));
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState(() => {
    const c = getConsent();
    return { analytics: !!c?.analytics, marketing: !!c?.marketing };
  });

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return undefined;
    const existing = getConsent();
    let t;
    if (!existing) t = setTimeout(() => setOpen(true), 2600);
    const openHandler = () => {
      const c = getConsent();
      if (c) setPrefs({ analytics: c.analytics, marketing: c.marketing });
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener("rj:open-cookie-settings", openHandler);
    return () => {
      clearTimeout(t);
      window.removeEventListener("rj:open-cookie-settings", openHandler);
    };
  }, []);

  const done = (c) => {
    save(c);
    setOpen(false);
    setCustom(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="rj-cookie"
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          <button className="rj-cookie-x" onClick={() => setOpen(false)} aria-label="Close"><X size={16} /></button>
          <div className="rj-cookie-head"><Cookie size={20} /><strong>We value your privacy</strong></div>
          <p>
            We use cookies to run the site, understand how it is used and show relevant offers. You can accept all,
            reject non-essential cookies or choose. See our <Link to="/cookie-policy">Cookie Policy</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>
          {custom && (
            <div className="rj-cookie-opts">
              <label><input type="checkbox" checked disabled /> Necessary <small>always on</small></label>
              <label><input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} /> Analytics <small>Google Analytics</small></label>
              <label><input type="checkbox" checked={prefs.marketing} onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })} /> Marketing <small>Meta Pixel</small></label>
            </div>
          )}
          <div className="rj-cookie-actions">
            {custom ? (
              <button className="rj-btn-solid" onClick={() => done(prefs)}>Save choices</button>
            ) : (
              <>
                <button className="rj-btn-ghost" onClick={() => setCustom(true)}>Customise</button>
                <button className="rj-btn-ghost" onClick={() => done({})}>Reject non-essential</button>
                <button className="rj-btn-solid" onClick={() => done({ analytics: true, marketing: true })}>Accept all</button>
              </>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
