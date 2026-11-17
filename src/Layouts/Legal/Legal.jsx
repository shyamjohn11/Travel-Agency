import { Link } from "react-router-dom";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import SEO from "../../Shared-Components/SEO/SEO";
import JsonLd from "../../Shared-Components/JsonLd/JsonLd";
import Reveal from "../../Shared-Components/Reveal/Reveal";
import { LEGAL, LEGAL_UPDATED } from "../../data/legal";
import { BUSINESS } from "../../config/business.config";
import { breadcrumbSchema, webPageSchema } from "../../utils/schema";

export default function Legal({ doc }) {
  const d = LEGAL[doc];
  return (
    <>
      <SEO title={d.seoTitle} description={d.description} url={`${BUSINESS.domain}${d.path}`} keywords="privacy policy, terms and conditions, cookie policy, RJ Groups" />
      <JsonLd id="page" data={webPageSchema({ title: d.title, description: d.description, url: d.path })} />
      <JsonLd id="crumbs" data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: d.title, url: d.path }])} />
      <Navbar />
      <main className="rj-page">
        <article className="rj-legal">
          <Reveal><span className="rj-eyebrow">Legal</span><h1>{d.title}</h1><p className="upd">Last updated: {LEGAL_UPDATED}</p></Reveal>
          {d.body}
          <nav className="rj-legal-nav" aria-label="Legal pages">
            {Object.entries(LEGAL).filter(([k]) => k !== doc).map(([k, v]) => <Link key={k} className="rj-btn-ghost" to={v.path}>{v.title}</Link>)}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
