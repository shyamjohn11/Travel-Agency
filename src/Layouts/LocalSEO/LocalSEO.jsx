import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import SEO from "../../Shared-Components/SEO/SEO";
import JsonLd from "../../Shared-Components/JsonLd/JsonLd";
import Reveal, { SplitHeading } from "../../Shared-Components/Reveal/Reveal";
import PackageCard from "../../Shared-Components/PackageCard/PackageCard";
import EnquiryForm from "../../Shared-Components/EnquiryForm/EnquiryForm";
import { LOCAL_AREAS } from "../../data/localAreas";
import { usePackages } from "../../hooks/useCms";
import { BUSINESS } from "../../config/business.config";
import { breadcrumbSchema, faqSchema, orgRef } from "../../utils/schema";

export default function LocalSEO() {
  const { city } = useParams();
  const area = LOCAL_AREAS.find((a) => a.key === city);
  const packages = usePackages({ featured: true, limit: 6 });
  if (!area) return <Navigate to="/packages" replace />;

  const url = `/travel-agency-in/${area.key}`;
  const title = `Travel Agency in ${area.name} | Tour Packages & Ticket Booking | RJ Groups`;
  const description = `Looking for a travel agency in ${area.name}? RJ Groups, based in Kanyakumari District, plans domestic and international tours, honeymoon, family and friends packages, tickets and hotel bookings for travellers from ${area.name}.`;
  const faqs = [
    { q: `Which is the best travel agency in ${area.name}?`, a: `${BUSINESS.shortName} is a travel agency based in ${BUSINESS.address.full}, serving travellers from ${area.name} and ${area.nearby} with customisable tour packages, ticket booking and hotel reservations. Compare packages and request a free quote on this website.` },
    { q: `Can ${BUSINESS.shortName} arrange tickets and pick-ups from ${area.name}?`, a: "Yes. We assist with flight, train and bus tickets and can arrange private vehicle pick-up and drop on request. Share your location when you enquire." },
    { q: "Do you offer international packages with visa help?", a: "Yes. We offer international packages to Dubai, Singapore, Maldives, Bali, Thailand and Malaysia with visa assistance, hotels, sightseeing and transfers." },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${BUSINESS.domain}${url}#agency`,
    name: `${BUSINESS.shortName} - Travel Agency serving ${area.name}`,
    parentOrganization: orgRef,
    url: `${BUSINESS.domain}${url}`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: { "@type": "PostalAddress", streetAddress: "Kuzhithurai", addressLocality: "Kanyakumari District", addressRegion: "Tamil Nadu", postalCode: BUSINESS.address.postalCode, addressCountry: "IN" },
    areaServed: { "@type": "City", name: area.name },
  };

  return (
    <>
      <SEO title={title} description={description} keywords={`travel agency in ${area.name}, tour packages ${area.name}, ${area.name} travel agents, honeymoon packages from ${area.name}, ticket booking ${area.name}`} url={`${BUSINESS.domain}${url}`} />
      <JsonLd id="local" data={schema} />
      <JsonLd id="faq" data={faqSchema(faqs)} />
      <JsonLd id="crumbs" data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: `Travel Agency in ${area.name}`, url }])} />
      <Navbar />
      <main className="rj-page">
        <section className="rj-phero" style={{ minHeight: 420 }}>
          <div className="rj-phero-bg"><img src="/images/packages-hero.jpg" alt={`Travel packages for travellers from ${area.name}`} /></div>
          <div className="rj-phero-in">
            <ol className="rj-crumbs"><li><Link to="/">Home</Link></li><li aria-current="page">{area.name}</li></ol>
            <SplitHeading as="h1" text={`Travel Agency in ${area.name}`} />
            <Reveal delay={0.2}><p>Domestic and international tours, honeymoon, family and friends packages, tickets and hotels - planned by a local team.</p></Reveal>
          </div>
        </section>
        <div className="rj-wrap">
          <Reveal className="rj-answer"><h2>Quick answer</h2>
            <p>{BUSINESS.shortName} is a travel agency based in {BUSINESS.address.full}. We serve travellers from {area.name} ({area.intro}) and nearby areas including {area.nearby}. Call {BUSINESS.phone} or send an enquiry for a free, customised quote.</p>
          </Reveal>
          <section className="rj-section">
            <Reveal><h2>Popular packages for {area.name} travellers</h2></Reveal>
            <div className="rj-grid" style={{ marginTop: 24 }}>{packages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}</div>
            <Link className="rj-btn-solid" to="/packages">View all packages</Link>
          </section>
          <section className="rj-section" style={{ paddingTop: 0 }}>
            <Reveal><h2>Services we offer</h2></Reveal>
            <ul className="rj-checks yes" style={{ marginTop: 16 }}>
              {["Domestic & international tour packages", "Honeymoon, couple, family & friends trips", "Flight, train & bus ticket booking", "Resort & hotel booking", "Visa & documentation assistance", "Vehicle rental & transfers"].map((s) => <li key={s}>&#10003; {s}</li>)}
            </ul>
          </section>
          <section className="rj-section" style={{ paddingTop: 0 }}>
            <h2>Frequently asked questions</h2>
            <div className="rj-faq" style={{ marginTop: 16 }}>{faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
          </section>
          <section className="rj-section" style={{ paddingTop: 0 }}>
            <Reveal className="rj-card3d" style={{ maxWidth: 560 }}><h2 style={{ fontSize: 24, marginBottom: 14 }}>Plan your trip from {area.name}</h2><EnquiryForm source={`local-${area.key}`} /></Reveal>
          </section>
          <nav aria-label="Other service areas" style={{ paddingBottom: 60, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {LOCAL_AREAS.filter((a) => a.key !== area.key).map((a) => <Link key={a.key} className="rj-btn-ghost" to={`/travel-agency-in/${a.key}`}>Travel agency in {a.name}</Link>)}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
