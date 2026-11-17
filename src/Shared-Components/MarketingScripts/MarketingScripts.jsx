import { useEffect } from "react";
import { useSettings } from "../../hooks/useCms";
import { getConsent } from "../../utils/consent";
import { captureUtm } from "../../utils/track";

const inject = (id, src, inline) => {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  if (src) {
    s.async = true;
    s.src = src;
  }
  if (inline) s.text = inline;
  document.head.appendChild(s);
};

/** Loads GA4 / Meta Pixel only after the visitor consents. IDs come from Admin > Settings. */
export default function MarketingScripts() {
  const { marketing } = useSettings();
  const { gaId, metaPixelId } = marketing;

  useEffect(() => {
    captureUtm();
    const run = () => {
      const c = getConsent();
      if (!c) return;
      if (c.analytics && /^G-[A-Z0-9]+$/i.test(gaId || "")) {
        inject("rj-ga-src", `https://www.googletagmanager.com/gtag/js?id=${gaId}`);
        inject(
          "rj-ga-init",
          null,
          `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`
        );
      }
      if (c.marketing && /^\d{8,20}$/.test(metaPixelId || "")) {
        inject(
          "rj-fb-init",
          null,
          `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`
        );
      }
    };
    run();
    window.addEventListener("rj:consent", run);
    return () => window.removeEventListener("rj:consent", run);
  }, [gaId, metaPixelId]);

  return null;
}
