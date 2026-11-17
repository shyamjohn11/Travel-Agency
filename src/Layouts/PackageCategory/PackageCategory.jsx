import { useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import SEO from "../../Shared-Components/SEO/SEO";
import JsonLd from "../../Shared-Components/JsonLd/JsonLd";
import PackageCard from "../../Shared-Components/PackageCard/PackageCard";
import Reveal, { SplitHeading } from "../../Shared-Components/Reveal/Reveal";
import Marquee from "../../Shared-Components/Marquee/Marquee";
import Newsletter from "../../Shared-Components/Newsletter/Newsletter";
import EnquiryForm from "../../Shared-Components/EnquiryForm/EnquiryForm";
import { useCategories, usePackages } from "../../hooks/useCms";
import { formatINR } from "../../services/db";
import { BUSINESS } from "../../config/business.config";
import { breadcrumbSchema, collectionSchema, faqSchema } from "../../utils/schema";

export default function PackageCategory() {
  const { category } = useParams();
  const cats = useCategories();
  const cat = cats.find((c) => c.key === category);
  const packages = usePackages({ category });
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [place, setPlace] = useState("all");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const places = useMemo(() => [...new Set(packages.map((p) => p.place).filter(Boolean))], [packages]);
  const list = useMemo(() => {
    let l = packages.filter((p) => (place === "all" || p.place === place) && `${p.title} ${p.location} ${p.summary}`.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "days") l = [...l].sort((a, b) => a.days - b.days);
    if (sort === "featured") l = [...l].sort((a, b) => Number(b.featured) - Number(a.featured));
    return l;
  }, [packages, q, sort, place]);

  if (!cat) return <Navigate to="/packages" replace />;

  const min = packages.length ? Math.min(...packages.map((p) => p.price)) : 0;
  const daysMin = packages.length ? Math.min(...packages.map((p) => p.days)) : 0;
  const daysMax = packages.length ? Math.max(...packages.map((p) => p.days)) : 0;
  const answer = packages.length
    ? `${BUSINESS.shortName} offers ${packages.length} ${cat.title.toLowerCase()} from ${BUSINESS.address.city}, Tamil Nadu, starting at ${formatINR(min)} per person for ${daysMin}${daysMax !== daysMin ? `-${daysMax}` : ""} days. Every package can be customised - choose your hotel category, meal plan and add-ons, then request a free quote.`
    : `${cat.description} New packages are being added - contact ${BUSINESS.shortName} for a custom plan.`;
  const faqs = [
    { q: `How much do ${cat.title.toLowerCase()} cost?`, a: packages.length ? `Our ${cat.title.toLowerCase()} start from ${formatINR(min)} per person. The final price depends on travel dates, hotel category, meal plan and group size.` : "Prices depend on dates, hotel category and group size. Contact us for a free quote." },
    { q: "Can I customise a package?", a: "Yes. On each package page you can pick hotel category, meal plan and add-ons, change the number of travellers and see an instant estimate before you enquire." },
    { q: `Where do ${BUSINESS.shortName} trips start from?`, a: `We are based in ${BUSINESS.address.full}. We arrange pick-ups, tickets and transfers from Kanyakumari, Nagercoil, Thiruvananthapuram and other cities on request.` },
  ];
  const url = `/packages/${cat.key}`;
  const title = `${cat.title} from Kanyakumari | RJ Groups`;
  const description = `${cat.description} Customisable ${cat.title.toLowerCase()} by RJ Groups, Kanyakumari, Tamil Nadu.`.slice(0, 300);

  return (
    <>
      <SEO title={title} description={description} keywords={`${cat.title}, ${cat.short} tour packages, travel agency Kanyakumari, ${cat.short} holiday Tamil Nadu`} url={`${BUSINESS.domain}${url}`} image={cat.image} />
      <JsonLd id="collection" data={collectionSchema({ title: cat.title, description, url, packages })} />
      <JsonLd id="faq" data={faqSchema(faqs)} />
      <JsonLd id="crumbs" data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Packages", url: "/packages" }, { name: cat.title, url }])} />
      <Navbar />
      <main className="rj-page">
        <section className="rj-phero" ref={heroRef}>
          <motion.div className="rj-phero-bg" style={{ y }}><img src={cat.image} alt={`${cat.title} - ${cat.tagline}`} fetchPriority="high" /></motion.div>
          <div className="rj-phero-in">
            <ol className="rj-crumbs"><li><Link to="/">Home</Link></li><li><Link to="/packages">Packages</Link></li><li aria-current="page">{cat.short}</li></ol>
            <Reveal variant="blur"><span className="rj-eyebrow" style={{ color: "#FFAA33" }}>{cat.tagline}</span></Reveal>
            <SplitHeading as="h1" text={cat.title} />
            <Reveal delay={0.2}><p>{cat.description}</p></Reveal>
          </div>
        </section>
        <Marquee items={cats.map((c) => c.short)} />
        <nav className="rj-cat-tabs" aria-label="Package categories">
          {cats.map((c) => (
            <Link key={c.key} to={`/packages/${c.key}`} className={c.key === cat.key ? "on" : ""}>{c.short}</Link>
          ))}
        </nav>
        <div className="rj-wrap">
          <Reveal className="rj-answer"><h2>Quick answer</h2><p>{answer}</p></Reveal>
          <div className="rj-toolbar">
            <input type="search" placeholder="Search destination or package" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search packages" />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {places.length > 1 && (
                <select value={place} onChange={(e) => setPlace(e.target.value)} aria-label="Filter by place">
                  <option value="all">All places</option>
                  {places.map((p) => <option key={p}>{p}</option>)}
                </select>
              )}
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort packages">
                <option value="featured">Featured first</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="days">Shortest trips</option>
              </select>
            </div>
          </div>
          {list.length ? (
            <div className="rj-grid">{list.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}</div>
          ) : (
            <div className="rj-empty"><h3>No packages found</h3><p>Try a different search, or tell us what you need and we will design it for you.</p></div>
          )}
          <section className="rj-section" style={{ paddingTop: 10 }}>
            <Reveal><h2>{cat.short} package FAQs</h2></Reveal>
            <div className="rj-faq">
              {faqs.map((f) => <Reveal key={f.q} variant="left"><details><summary>{f.q}</summary><p>{f.a}</p></details></Reveal>)}
            </div>
          </section>
          <section className="rj-section" style={{ paddingTop: 0 }}>
            <Reveal className="rj-card3d" style={{ maxWidth: 560 }}>
              <h2 style={{ fontSize: 24, marginBottom: 6 }}>Need something different?</h2>
              <p className="rj-lead" style={{ marginBottom: 16 }}>Tell us your dates and budget and we will build a custom {cat.short.toLowerCase()} plan.</p>
              <EnquiryForm source={`category-${cat.key}`} packageTitle={cat.title} />
            </Reveal>
          </section>
        </div>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
