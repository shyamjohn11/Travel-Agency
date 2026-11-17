import { useMemo, useSyncExternalStore } from "react";
import { getState, subscribe, isOfferLive } from "../services/db";

export const useCms = () => useSyncExternalStore(subscribe, getState, (state) => state);

export function useSettings() {
  return useCms().settings;
}

export function useCategories() {
  return useCms().categories;
}

export function useCategory(key) {
  const cats = useCategories();
  return cats.find((c) => c.key === key);
}

/** Published packages only (what visitors see). */
export function usePackages(filter = {}) {
  const { packages } = useCms();
  const { category, featured, limit, place, exclude } = filter;
  return useMemo(() => {
    let list = packages.filter((p) => p.status === "published");
    if (category) list = list.filter((p) => p.category === category);
    if (place) list = list.filter((p) => p.place?.toLowerCase() === place.toLowerCase());
    if (featured) list = list.filter((p) => p.featured);
    if (exclude) list = list.filter((p) => p.id !== exclude);
    list = list.filter((p) => p.category !== "offer" || isOfferLive(p));
    return limit ? list.slice(0, limit) : list;
  }, [packages, category, featured, limit, place, exclude]);
}

export function usePackage(slug) {
  const { packages } = useCms();
  return packages.find((p) => p.slug === slug);
}
