/* ==========================================
   RJ GROUPS - BUSINESS CONFIGURATION
   Central source of truth for business information
   Update these values with verified information
========================================== */

export const BUSINESS = {
  /** Legal business name */
  name: "RJ Groups Consultancy and Travel Agency Private Limited",
  /** Short display name */
  shortName: "RJ Groups",
  /** Production website domain */
  domain: "https://rjgroups.in",
  /** Official email address */
  email: "rjgroups2025@gmail.com",
  /** Official phone number */
  phone: "+91 9443679373",
  /** Physical office address */
  address: {
    street: "Kuzhithurai, Kanyakumari District",
    city: "Kanyakumari",
    state: "Tamil Nadu",
    postalCode: "629163",
    country: "IN",
    full: "Kuzhithurai, Kanyakumari District, Tamil Nadu – 629163",
  },
  /** Working days */
  workingDays: "Mon - Sat",
  /** Working hours */
  workingHours: "9:00 AM – 7:00 PM",
  /** Social media URLs - UPDATE WITH REAL URLS WHEN AVAILABLE */
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
  /** Google Maps embed query */
  mapQuery: "RJ Groups Consultancy and Travel Agency, Kuzhithurai, Kanyakumari, Tamil Nadu",
};

/**
 * Returns the full URL for a given path
 * @param {string} path - URL path (e.g., "/about")
 * @returns {string} Full URL
 */
export const getUrl = (path = "") => {
  return `${BUSINESS.domain}${path}`;
};

export default BUSINESS;
