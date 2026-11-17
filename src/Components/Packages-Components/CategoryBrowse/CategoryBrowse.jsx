import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../../../Shared-Components/Reveal/Reveal";
import Tilt3D from "../../../Shared-Components/Tilt3D/Tilt3D";
import { useCategories, useCms } from "../../../hooks/useCms";

/** Admin-controlled category tiles linking to /packages/:category */
export default function CategoryBrowse({ title = "Choose your kind of trip", eyebrow = "Browse packages" }) {
  const cats = useCategories();
  const { packages } = useCms();
  const count = (k) => packages.filter((p) => p.category === k && p.status === "published").length;
  return (
    <section className="rj-cats" aria-labelledby="rj-cats-title">
      <div className="rj-wrap">
        <Reveal><span className="rj-eyebrow">{eyebrow}</span></Reveal>
        <h2 id="rj-cats-title" style={{ fontSize: "clamp(28px,4vw,46px)", margin: "8px 0 0" }}>{title}</h2>
        <div className="rj-cats-grid">
          {cats.map((c, i) => (
            <Reveal key={c.key} variant="flip" delay={(i % 4) * 0.07}>
              <Tilt3D max={9}>
                <Link to={`/packages/${c.key}`} className="rj-cat-card" aria-label={`${c.title} - ${count(c.key)} packages`}>
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <div>
                    <small>{count(c.key)} packages</small>
                    <h3>{c.title}</h3>
                    <span>{c.tagline} <ArrowUpRight size={15} /></span>
                  </div>
                </Link>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
