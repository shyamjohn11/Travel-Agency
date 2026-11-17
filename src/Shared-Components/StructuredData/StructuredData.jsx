import { useEffect } from 'react';

const ORG_NAME = 'RJ Groups Consultancy and Travel Agency Private Limited';
const ORG_DESC = 'RJ Groups is a travel and consultancy agency based in Kanyakumari, Tamil Nadu. We offer domestic and international tour packages, ticket booking, resort and hotel booking, recruitment services, and financial & tax services.';
const ORG_URL = 'https://rjgroups.in';
const ORG_LOGO = 'https://rjgroups.in/images/rj-groups-logo.png';
const ORG_ADDRESS = {
  streetAddress: 'Kuzhithurai, Kanyakumari District',
  addressLocality: 'Kanyakumari',
  addressRegion: 'Tamil Nadu',
  postalCode: '629163',
  addressCountry: 'IN',
};
const ORG_PHONE = '+91 9443679373';
const ORG_EMAIL = 'rjgroups2025@gmail.com';
const ORG_SAME_AS = [
  'https://www.facebook.com/rjgroups',
  'https://www.instagram.com/rjgroups',
  'https://www.linkedin.com/company/rjgroups',
];

export default function StructuredData({
  pageType = 'WebPage',
  pageTitle,
  pageDescription,
  pageUrl,
  breadcrumbList,
  faqs,
}) {
  useEffect(() => {
    const orgJson = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ORG_NAME,
      url: ORG_URL,
      logo: ORG_LOGO,
      description: ORG_DESC,
      address: ORG_ADDRESS,
      telephone: ORG_PHONE,
      email: ORG_EMAIL,
      sameAs: ORG_SAME_AS,
      foundingDate: '2012',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: ORG_PHONE,
        contactType: 'customer service',
        availableLanguage: ['en', 'ta'],
      },
    };

    const webSiteJson = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: ORG_NAME,
      url: ORG_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${ORG_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    const localBusinessJson = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: ORG_NAME,
      url: ORG_URL,
      logo: ORG_LOGO,
      description: ORG_DESC,
      address: ORG_ADDRESS,
      telephone: ORG_PHONE,
      email: ORG_EMAIL,
      sameAs: ORG_SAME_AS,
      priceRange: '₹₹',
    };

    const webPageJson = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle || ORG_NAME,
      description: pageDescription || ORG_DESC,
      url: pageUrl || ORG_URL,
      isPartOf: {
        '@type': 'WebSite',
        name: ORG_NAME,
        url: ORG_URL,
      },
      inLanguage: 'en-IN',
    };

    const jsonArray = [orgJson, webSiteJson, localBusinessJson, webPageJson];

    if (breadcrumbList && breadcrumbList.length > 0) {
      jsonArray.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbList.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.href || item.url,
        })),
      });
    }

    if (faqs && faqs.length > 0) {
      jsonArray.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonArray, null, 2);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [pageType, pageTitle, pageDescription, pageUrl, breadcrumbList, faqs]);

  return null;
}
