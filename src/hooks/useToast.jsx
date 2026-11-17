import { useState } from "react";

export function useToast() {
  const [t, setT] = useState(null);
  const show = (msg, err = false) => {
    setT({ msg, err });
    clearTimeout(show.timer);
    show.timer = setTimeout(() => setT(null), err ? 6000 : 2800);
  };
  const node = t ? <div className={`ad-toast ${t.err ? "err" : ""}`} role="status">{t.msg}</div> : null;
  return [node, show];
}
