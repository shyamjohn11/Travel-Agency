/* ==========================================
   RJ GROUPS - ADMIN AUTH (client-side)
   IMPORTANT: this protects the admin UI in the browser only.
   Anyone who can open DevTools can read localStorage. For a real
   production CMS, move auth + data to a server (see README).
========================================== */
const CRED_KEY = "rj_admin_cred_v1";
const SESSION_KEY = "rj_admin_session_v1";
const LOCK_KEY = "rj_admin_lock_v1";
const SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_TRIES = 5;
const LOCK_MS = 5 * 60 * 1000;

const DEFAULT_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@rjgroups.in";
const DEFAULT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "RJ@Admin2026";

const sha = async (text) => {
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return btoa(unescape(encodeURIComponent(text)));
};

const read = (store, key) => {
  try {
    return JSON.parse(store.getItem(key));
  } catch {
    return null;
  }
};

async function getCred() {
  const saved = read(localStorage, CRED_KEY);
  if (saved) return saved;
  return { email: DEFAULT_EMAIL.toLowerCase(), hash: await sha(`rj::${DEFAULT_PASSWORD}`), isDefault: true };
}

export const usingDefaultPassword = () => {
  try { return !read(localStorage, CRED_KEY); }
  catch { return true; }
};

export async function login(email, password, remember = false) {
  const lock = read(localStorage, LOCK_KEY) || { tries: 0, until: 0 };
  if (lock.until > Date.now()) {
    const mins = Math.ceil((lock.until - Date.now()) / 60000);
    return { ok: false, error: `Too many attempts. Try again in ${mins} minute${mins > 1 ? "s" : ""}.` };
  }
  const cred = await getCred();
  const ok = email.trim().toLowerCase() === cred.email && (await sha(`rj::${password}`)) === cred.hash;
  if (!ok) {
    const tries = lock.tries + 1;
    const next = tries >= MAX_TRIES ? { tries: 0, until: Date.now() + LOCK_MS } : { tries, until: 0 };
    localStorage.setItem(LOCK_KEY, JSON.stringify(next));
    return {
      ok: false,
      error:
        tries >= MAX_TRIES
          ? "Too many attempts. Locked for 5 minutes."
          : `Incorrect email or password. ${MAX_TRIES - tries} attempt${MAX_TRIES - tries > 1 ? "s" : ""} left.`,
    };
  }
  localStorage.removeItem(LOCK_KEY);
  const session = { email: cred.email, exp: Date.now() + SESSION_MS };
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true };
}

export function getSession() {
  const s = read(sessionStorage, SESSION_KEY) || read(localStorage, SESSION_KEY);
  if (!s || s.exp < Date.now()) {
    logout();
    return null;
  }
  return s;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export async function changeCredentials({ currentPassword, newEmail, newPassword }) {
  const cred = await getCred();
  if ((await sha(`rj::${currentPassword}`)) !== cred.hash) return { ok: false, error: "Current password is incorrect." };
  if (newPassword && newPassword.length < 8) return { ok: false, error: "New password must be at least 8 characters." };
  const next = {
    email: (newEmail || cred.email).trim().toLowerCase(),
    hash: newPassword ? await sha(`rj::${newPassword}`) : cred.hash,
  };
  localStorage.setItem(CRED_KEY, JSON.stringify(next));
  return { ok: true };
}
