/* ==========================================
   RJ GROUPS - CMS DATA STORE
   Single source of truth for packages, categories,
   settings and enquiries. Persists to localStorage and
   syncs across tabs. Swap the persist()/load() pair for
   API calls when you add a backend.
========================================== */
import { CATEGORIES, PACKAGES, SETTINGS_DEFAULT, SEED_VERSION } from "../data/seed";

const KEY = "rj_cms_v1";
const listeners = new Set();

const seedState = () => ({
  version: SEED_VERSION,
  categories: structuredClone(CATEGORIES),
  packages: structuredClone(PACKAGES),
  settings: structuredClone(SETTINGS_DEFAULT),
  enquiries: [],
});

const merge = (base, over) => {
  if (Array.isArray(base) || typeof base !== "object" || base === null) return over ?? base;
  const out = { ...base };
  Object.keys(over || {}).forEach((k) => {
    out[k] = merge(base[k], over[k]);
  });
  return out;
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw);
    const seeded = seedState();
    return {
      ...seeded,
      ...parsed,
      settings: merge(seeded.settings, parsed.settings),
    };
  } catch {
    return seedState();
  }
}

let state = typeof window === "undefined" ? seedState() : load();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error:
        "Use valid image paths or URLs (max 4 gallery images) instead of uploads, then try again.",
      raw: e,
    };
  }
}

function commit(next) {
  const prev = state;
  state = next;
  const res = persist();
  if (!res.ok) {
    state = prev; // roll back so UI never shows data that was not saved
    return res;
  }
  listeners.forEach((l) => l());
  return res;
}

export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const getState = () => state;

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}

/* ---------- helpers ---------- */
export const slugify = (s = "") =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const uid = (p = "id") => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/* ---------- packages ---------- */
export function savePackage(pkg) {
  const now = new Date().toISOString();
  const list = state.packages;
  const exists = list.some((p) => p.id === pkg.id);
  let slug = slugify(pkg.slug || pkg.title);
  const clash = (s) => list.some((p) => p.slug === s && p.id !== pkg.id);
  let n = 2;
  const base = slug;
  while (clash(slug)) slug = `${base}-${n++}`;
  const days = Number(pkg.days) || 1;
  const record = {
    ...pkg,
    id: pkg.id || uid("pkg"),
    slug,
    days,
    duration: `${Math.max(days - 1, 0)}N / ${days}D`,
    price: Number(pkg.price) || 0,
    originalPrice: Number(pkg.originalPrice) || 0,
    updatedAt: now,
    createdAt: pkg.createdAt || now,
  };
  const packages = exists
    ? list.map((p) => (p.id === record.id ? record : p))
    : [record, ...list];
  const res = commit({ ...state, packages });
  return { ...res, pkg: record };
}

export const deletePackage = (id) =>
  commit({ ...state, packages: state.packages.filter((p) => p.id !== id) });

export const duplicatePackage = (id) => {
  const src = state.packages.find((p) => p.id === id);
  if (!src) return { ok: false };
  return savePackage({
    ...structuredClone(src),
    id: undefined,
    title: `${src.title} (Copy)`,
    slug: `${src.slug}-copy`,
    status: "draft",
  });
};

export const setPackageStatus = (id, status) =>
  commit({
    ...state,
    packages: state.packages.map((p) =>
      p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
    ),
  });

/* ---------- categories ---------- */
export const saveCategory = (cat) =>
  commit({
    ...state,
    categories: state.categories.map((c) => (c.key === cat.key ? { ...c, ...cat } : c)),
  });

/* ---------- settings ---------- */
export const saveSettings = (settings) => commit({ ...state, settings });

/* ---------- enquiries / leads ---------- */
export function addEnquiry(data) {
  const entry = {
    id: uid("enq"),
    status: "new",
    createdAt: new Date().toISOString(),
    source: "website",
    ...data,
  };
  const res = commit({ ...state, enquiries: [entry, ...state.enquiries].slice(0, 1000) });
  return { ...res, enquiry: entry };
}
export const updateEnquiry = (id, patch) =>
  commit({
    ...state,
    enquiries: state.enquiries.map((e) => (e.id === id ? { ...e, ...patch } : e)),
  });
export const deleteEnquiry = (id) =>
  commit({ ...state, enquiries: state.enquiries.filter((e) => e.id !== id) });

/* ---------- backup ---------- */
export const exportData = () => JSON.stringify(state, null, 2);
export function importData(json) {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed.packages) || !Array.isArray(parsed.categories)) {
      return { ok: false, error: "That file is not a valid RJ Groups backup." };
    }
    return commit({ ...seedState(), ...parsed });
  } catch {
    return { ok: false, error: "Could not read that file." };
  }
}
export const resetToDefaults = () => commit(seedState());

/* ---------- selectors (pure) ---------- */
export const isOfferLive = (p) =>
  !p.offerEndsAt || new Date(`${p.offerEndsAt}T23:59:59`).getTime() >= Date.now();

export const discountPercent = (p) =>
  p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

export const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
