import { useEffect } from "react";

/** Injects (and cleans up) a JSON-LD script. Use a unique id per schema. */
export default function JsonLd({ id, data }) {
  useEffect(() => {
    if (!data) return undefined;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = `jsonld-${id}`;
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => el.remove();
  }, [id, data]);
  return null;
}
