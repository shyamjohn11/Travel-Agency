import { useMemo } from "react";
import { usePackages } from "./useCms";

/** Adapts CMS packages to the card shapes used by the original homepage/packages sections. */
export function useShaped(filter, kind) {
  const list = usePackages(filter);
  return useMemo(
    () =>
      list.map((p, i) => ({
        id: p.id,
        slug: p.slug,
        name: kind === "popular" ? p.title : p.place || p.title,
        title: p.title,
        country: p.country,
        location: p.country,
        description: p.summary,
        image: p.image,
        category: p.badge || p.location.split(",")[0],
        number: String(i + 1).padStart(2, "0"),
        duration: `${p.duration} - from Rs ${p.price.toLocaleString("en-IN")}`,
      })),
    [list, kind]
  );
}
