/* Consent-aware event tracking (GA4 + Meta Pixel). No-ops until scripts are loaded. */
export function trackEvent(name, params = {}) {
  try {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
    if (typeof window.fbq === "function") {
      const map = { generate_lead: "Lead", view_item: "ViewContent", contact: "Contact", subscribe: "Subscribe" };
      window.fbq("track", map[name] || "CustomizeProduct", params);
    }
  } catch {
    /* tracking must never break the UI */
  }
}

export function captureUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const found = {};
    keys.forEach((k) => p.get(k) && (found[k] = p.get(k)));
    if (Object.keys(found).length) sessionStorage.setItem("rj_utm", JSON.stringify(found));
  } catch {
    /* ignore */
  }
}
export const getUtm = () => {
  try {
    return JSON.parse(sessionStorage.getItem("rj_utm")) || {};
  } catch {
    return {};
  }
};
