import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Megaphone, X } from "lucide-react";
import { useSettings } from "../../hooks/useCms";

export default function AnnouncementBar() {
  const { marketing } = useSettings();
  const a = marketing.announcement;
  const { pathname } = useLocation();
  const [closed, setClosed] = useState(() => {
    try {
      const val = sessionStorage.getItem("rj_ann_closed");
      return val === a?.text;
    } catch {
      return false;
    }
  });
  if (!a?.active || !a.text || closed || pathname.startsWith("/admin")) return null;
  const close = () => {
    setClosed(true);
    try {
      sessionStorage.setItem("rj_ann_closed", a.text);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="rj-announce" role="region" aria-label="Announcement">
      <Megaphone size={15} />
      <span>{a.text}</span>
      {a.link && <Link to={a.link}>{a.linkLabel || "Learn more"} &rarr;</Link>}
      <button onClick={close} aria-label="Dismiss announcement"><X size={15} /></button>
    </div>
  );
}
