/* JSON-LD builders for SEO / GEO / AEO */
import { BUSINESS } from "../config/business.config";

const abs = (u = "") => (u.startsWith("http") ? u : `${BUSINESS.domain}${u}`);
export const absUrl = abs;

export const orgRef = { "@id": `${BUSINESS.domain}/#business` };

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.url),
  })),
});

export const faqSchema = (faqs = []) =>
  faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

export const tripSchema = (pkg) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "@id": `${abs(`/package/${pkg.slug}`)}#trip`,
  name: pkg.title,
  description: pkg.description || pkg.summary,
  image: [pkg.image, ...(pkg.gallery || [])].filter(Boolean).map(abs),
  url: abs(`/package/${pkg.slug}`),
  touristType: pkg.groupSize,
  provider: orgRef,
  itinerary: {
    "@type": "ItemList",
    itemListElement: (pkg.itinerary || []).map((d) => ({
      "@type": "ListItem",
      position: d.day,
      name: `Day ${d.day}: ${d.title}`,
      description: d.details || d.title,
    })),
  },
  offers: {
    "@type": "Offer",
    price: pkg.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: abs(`/package/${pkg.slug}`),
    seller: orgRef,
    ...(pkg.offerEndsAt ? { priceValidUntil: pkg.offerEndsAt } : {}),
  },
});

export const collectionSchema = ({ title, description, url, packages }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: abs(url),
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".rj-answer", "h1"] },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: packages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/package/${p.slug}`),
      name: p.title,
    })),
  },
});

export const webPageSchema = ({ title, description, url }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: abs(url),
  isPartOf: { "@id": `${BUSINESS.domain}/#website` },
  about: orgRef,
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".rj-answer"] },
});
