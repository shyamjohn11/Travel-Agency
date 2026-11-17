import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, Check, Clock, MapPin, Minus, Plus, Sun, Users, X } from "lucide-react";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import SEO from "../../Shared-Components/SEO/SEO";
import JsonLd from "../../Shared-Components/JsonLd/JsonLd";
import Reveal from "../../Shared-Components/Reveal/Reveal";
import Tilt3D from "../../Shared-Components/Tilt3D/Tilt3D";
import PackageCard from "../../Shared-Components/PackageCard/PackageCard";
import EnquiryForm from "../../Shared-Components/EnquiryForm/EnquiryForm";
import { usePackage, usePackages, useCategories } from "../../hooks/useCms";
import { discountPercent, formatINR, isOfferLive } from "../../services/db";
import { BUSINESS } from "../../config/business.config";
import { breadcrumbSchema, faqSchema, tripSchema } from "../../utils/schema";
import { trackEvent } from "../../utils/track";

const defaults = (groups = []) =>
  Object.fromEntries(
    groups.map((g) => {
      const d = g.options.filter((o) => o.default).map((o) => o.id);
      return [g.id, g.type === "multi" ? d : d[0] || g.options[0]?.id || null];
    })
  );

export default function PackageDetail() {
  const { slug } = useParams();
  return <PackageDetailInner key={slug} slug={slug} />;
}

function PackageDetailInner({ slug }) {
  const pkg = usePackage(slug);
  const cats = useCategories();
  const related = usePackages({ category: pkg?.category, exclude: pkg?.id, limit: 3 });
  const [sel, setSel] = useState(() => defaults(pkg?.customOptions));
  const [trav, setTrav] = useState(2);
  const [light, setLight] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    if (pkg) trackEvent("view_item", { item_name: pkg.title, value: pkg.price, currency: "INR" });
  }, [pkg?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const picked = useMemo(() => {
    if (!pkg) return { labels: [], extra: 0 };
    const labels = [];
    let extra = 0;
    (pkg.customOptions || []).forEach((g) => {
      const ids = [].concat(sel[g.id] ?? []);
      g.options.filter((o) => ids.includes(o.id)).forEach((o) => {
        extra += Number(o.price) || 0;
        labels.push({ group: g.label, label: o.label, price: Number(o.price) || 0 });
      });
    });
    return { labels, extra };
  }, [pkg, sel]);

  if (!pkg || (pkg.status !== "published" && !new URLSearchParams(window.location.search).has("preview"))) {
    return (
      <>
        <SEO title="Package not found | RJ Groups" description="This package is not available." robots="noindex, follow" url={`${BUSINESS.domain}/packages`} />
        <Navbar />
        <main className="rj-page rj-empty" style={{ padding: "120px 20px" }}>
          <h1>Package not found</h1>
          <p style={{ margin: "10px 0 24px" }}>It may have been removed or is no longer available.</p>
          <Link className="rj-btn-solid" to="/packages">Browse all packages</Link>
        </main>
        <Footer />
      </>
    );
  }

  const cat = cats.find((c) => c.key === pkg.category);
  const perPerson = pkg.price + picked.extra;
  const total = perPerson * trav;
  const off = discountPercent(pkg);
  const url = `/package/${pkg.slug}`;
  const faqs = [
    ...(pkg.faqs || []),
    { q: `How much is the ${pkg.title} package?`, a: `The ${pkg.title} package starts at ${formatINR(pkg.price)} per person for ${pkg.duration}. Hotel category, meals and add-ons change the final price.` },
    { q: `What is included in the ${pkg.title} package?`, a: (pkg.inclusions || []).slice(0, 6).join(", ") + "." },
  ];
  const quick = `${pkg.title} is a ${pkg.duration} ${cat?.short?.toLowerCase() || ""} package to ${pkg.location}, starting at ${formatINR(pkg.price)} per person. Best time to visit: ${pkg.bestTime}. ${pkg.highlights?.slice(0, 3).join(", ")}.`;
  const setOne = (g, id) => setSel({ ...sel, [g.id]: id });
  const toggle = (g, id) => {
    const cur = sel[g.id] || [];
    setSel({ ...sel, [g.id]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] });
  };
  const offerLive = isOfferLive(pkg);

  return (
    <>
      <SEO
        title={pkg.seo?.title || `${pkg.title} | RJ Groups`}
        description={pkg.seo?.description || pkg.summary}
        keywords={pkg.seo?.keywords}
        url={`${BUSINESS.domain}${url}`}
        image={pkg.image}
        type="website"
        robots={pkg.status === "published" ? undefined : "noindex, nofollow"}
      />
      <JsonLd id="trip" data={tripSchema(pkg)} />
      <JsonLd id="faq" data={faqSchema(faqs)} />
      <JsonLd id="crumbs" data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Packages", url: "/packages" }, { name: cat?.title || "Packages", url: `/packages/${pkg.category}` }, { name: pkg.title, url }])} />
      <Navbar />
      <main className="rj-page">
        <section className="rj-phero" ref={heroRef} style={{ minHeight: "clamp(360px,58vh,520px)" }}>
          <motion.div className="rj-phero-bg" style={{ y }}><img src={pkg.image} alt={`${pkg.title} - ${pkg.location}`} fetchPriority="high" /></motion.div>
          <div className="rj-phero-in">
            <ol className="rj-crumbs">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to={`/packages/${pkg.category}`}>{cat?.short}</Link></li>
              <li aria-current="page">{pkg.title}</li>
            </ol>
            {pkg.badge && <span className="rj-pcard-badge" style={{ position: "static", display: "inline-block", marginTop: 14 }}>{pkg.badge}</span>}
            <h1>{pkg.title}</h1>
            <p><MapPin size={16} style={{ verticalAlign: "-3px" }} /> {pkg.location} &middot; {pkg.duration}</p>
          </div>
        </section>

        <div className="rj-wrap rj-detail">
          <div>
            <Reveal className="rj-answer" style={{ marginTop: 0 }}><h2>At a glance</h2><p>{quick}</p></Reveal>
            <div className="rj-facts">
              <Reveal variant="zoom" className="rj-fact"><small><Clock size={12} /> Duration</small><strong>{pkg.duration}</strong></Reveal>
              <Reveal variant="zoom" delay={0.05} className="rj-fact"><small><Users size={12} /> Ideal for</small><strong>{pkg.groupSize}</strong></Reveal>
              <Reveal variant="zoom" delay={0.1} className="rj-fact"><small><Sun size={12} /> Best time</small><strong>{pkg.bestTime}</strong></Reveal>
              <Reveal variant="zoom" delay={0.15} className="rj-fact"><small><CalendarDays size={12} /> Offer</small><strong>{pkg.offerEndsAt ? `Till ${pkg.offerEndsAt}` : "All year"}</strong></Reveal>
            </div>

            {[pkg.image, ...(pkg.gallery || [])].length > 1 && (
              <div className="rj-gallery">
                {[pkg.image, ...(pkg.gallery || [])].slice(0, 5).map((src, i) => (
                  <img key={src + i} src={src} alt={`${pkg.title} photo ${i + 1}`} loading="lazy" onClick={() => setLight(src)} />
                ))}
              </div>
            )}

            <Reveal className="rj-block"><h2>Overview</h2><p className="rj-lead">{pkg.description}</p></Reveal>
            {pkg.highlights?.length > 0 && (
              <Reveal className="rj-block"><h2>Highlights</h2>
                <ul className="rj-checks yes">{pkg.highlights.map((h) => <li key={h}><Check size={16} />{h}</li>)}</ul>
              </Reveal>
            )}
            {pkg.itinerary?.length > 0 && (
              <div className="rj-block"><h2>Day-wise itinerary</h2>
                <div className="rj-timeline">
                  {pkg.itinerary.map((d, i) => (
                    <Reveal key={d.day} variant="left" delay={Math.min(i * 0.04, 0.2)}>
                      <details className="rj-day" open={i === 0}>
                        <summary><span>Day {d.day}</span>{d.title}</summary>
                        {d.details && <p>{d.details}</p>}
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
            <div className="rj-block" style={{ display: "grid", gap: 30 }}>
              {pkg.inclusions?.length > 0 && <Reveal><h2>Inclusions</h2><ul className="rj-checks yes">{pkg.inclusions.map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul></Reveal>}
              {pkg.exclusions?.length > 0 && <Reveal><h2>Exclusions</h2><ul className="rj-checks no">{pkg.exclusions.map((x) => <li key={x}><X size={16} />{x}</li>)}</ul></Reveal>}
            </div>
            <div className="rj-block"><h2>Frequently asked questions</h2>
              <div className="rj-faq">{faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
            </div>
          </div>

          <aside className="rj-side" aria-label="Customise and enquire">
            <Tilt3D max={4} glare={false}>
              <div className="rj-card3d">
                <div className="rj-side-price">
                  {off > 0 && offerLive && <s>{formatINR(pkg.originalPrice)}</s>}
                  <strong>{formatINR(pkg.price)}</strong>
                  {off > 0 && offerLive && <span className="rj-off">{off}% OFF</span>}
                </div>
                <small style={{ color: "var(--rj-ink-faint)" }}>per person, base price</small>

                {(pkg.customOptions || []).map((g) => (
                  <div key={g.id} className="rj-opt" role="group" aria-label={g.label}>
                    <h4>{g.label}</h4>
                    <div className="rj-opt-list">
                      {g.options.map((o) => {
                        const on = g.type === "multi" ? (sel[g.id] || []).includes(o.id) : sel[g.id] === o.id;
                        return (
                          <label key={o.id} className={on ? "on" : ""}>
                            <span>
                              <input type={g.type === "multi" ? "checkbox" : "radio"} name={g.id} checked={on} onChange={() => (g.type === "multi" ? toggle(g, o.id) : setOne(g, o.id))} />
                              {o.label}
                            </span>
                            <em>{Number(o.price) ? `+${formatINR(o.price)}` : "Included"}</em>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="rj-trav">
                  <strong style={{ fontSize: 14 }}>Travellers</strong>
                  <div className="rj-stepper">
                    <button type="button" onClick={() => setTrav(Math.max(1, trav - 1))} aria-label="Fewer travellers"><Minus size={14} /></button>
                    <b aria-live="polite">{trav}</b>
                    <button type="button" onClick={() => setTrav(Math.min(60, trav + 1))} aria-label="More travellers"><Plus size={14} /></button>
                  </div>
                </div>

                <div className="rj-total" aria-live="polite">
                  <div><small>Estimated total</small><AnimatePresence mode="popLayout"><motion.strong key={total} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{formatINR(total)}</motion.strong></AnimatePresence></div>
                  <small style={{ textAlign: "right" }}>{formatINR(perPerson)}<br />per person</small>
                </div>
                <EnquiryForm
                  compact
                  packageTitle={pkg.title}
                  packageId={pkg.id}
                  selection={{ travellers: trav, perPerson, total, options: picked.labels }}
                  source={`package-${pkg.category}`}
                  cta="Request this quote"
                />
                <small className="rj-consent-note" style={{ display: "block", marginTop: 10 }}>Estimate only. Final price is confirmed by our team based on dates and availability.</small>
              </div>
            </Tilt3D>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="rj-wrap" style={{ paddingBottom: 80 }}>
            <Reveal><h2 style={{ fontSize: 30, marginBottom: 22 }}>You may also like</h2></Reveal>
            <div className="rj-grid" style={{ paddingBottom: 0 }}>{related.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}</div>
          </div>
        )}
      </main>
      <AnimatePresence>
        {light && (
          <motion.div className="rj-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLight(null)} role="dialog" aria-label="Photo viewer">
            <img src={light} alt={pkg.title} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}
