export const KEY = "rj_consent_v1";
export const getConsent = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
};
