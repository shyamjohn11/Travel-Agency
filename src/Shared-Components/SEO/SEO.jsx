import { useEffect } from 'react';

export default function SEO({
  title,
  description,
  keywords,
  image = '/images/packages-hero.jpg',
  url = 'https://rjgroups.in/',
  geoRegion = 'IN-TN',
  geoPlacename = 'Kanyakumari',
  geoPosition = '8.0188,77.4258',
  geoCountry = 'IN',
  geoCity = 'Kanyakumari',
  geoSubdivision = 'Tamil Nadu',
  geoPostalCode = '629163',
  type = 'website',
  locale = 'en_IN',
  alternates = [],
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
}) {
  useEffect(() => {
    if (title) document.title = title;
    document.documentElement.setAttribute('lang', locale.replace('_', '-'));

    // Normalize alternates: accept string "en-US,en-GB" or array
    const altList = Array.isArray(alternates)
      ? alternates
      : typeof alternates === 'string'
        ? alternates.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

    const setMeta = (name, value) => {
      if (!value) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const setProp = (property, value) => {
      if (!value) return;
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const upsertLink = (attrs) => {
      // Build a safe selector: each attr must be quoted to handle spaces
      const selector = Object.entries(attrs)
        .filter(([k]) => k !== 'href')
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      let el = null;
      try {
        el = document.querySelector(`link[${selector}]`);
      } catch {
        el = null;
      }
      if (!el) {
        el = document.createElement('link');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      } else {
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      }
    };

    try {
      setMeta('robots', robots);
      setMeta('description', description);
      setMeta('keywords', keywords);
    } catch (e) {
      console.error("SEO meta tag error", e);
    }

    setProp('og:type', type);
    setProp('og:title', title);
    setProp('og:description', description);
    setProp('og:image', image);
    setProp('og:url', url);
    setProp('og:locale', locale);
    altList.forEach((alt) => setProp('og:locale:alternate', alt));

    setProp('twitter:title', title);
    setProp('twitter:description', description);
    setProp('twitter:image', image);
    setProp('twitter:card', 'summary_large_image');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    if (url) canonical.setAttribute('href', url);

    altList.forEach(() => {
      upsertLink({ rel: 'alternate', hreflang: 'x-default', href: url });
    });
    upsertLink({ rel: 'alternate', hreflang: 'x-default', href: url });

    setMeta('geo.region', geoRegion);
    setMeta('geo.placename', geoPlacename);
    setMeta('geo.position', geoPosition);
    setMeta('ICBM', geoPosition);
    setMeta('geo.country', geoCountry);
    setMeta('geo.city', geoCity);
    setMeta('geo.subdivision', geoSubdivision);
    setMeta('geo.postalcode', geoPostalCode);
  }, [title, description, keywords, image, url, geoRegion, geoPlacename, geoPosition, geoCountry, geoCity, geoSubdivision, geoPostalCode, type, locale, alternates, robots]);

  return null;
}