import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, MapPin, Users } from "lucide-react";
import Tilt3D from "../Tilt3D/Tilt3D";
import Reveal from "../Reveal/Reveal";
import { discountPercent, formatINR } from "../../services/db";

export default function PackageCard({ pkg, index = 0 }) {
  const off = pkg.price && pkg.originalPrice ? discountPercent(pkg) : 0;
  return (
    <Reveal variant="flip" delay={(index % 3) * 0.08} className="rj-pcard-wrap">
      <Tilt3D className="rj-pcard-tilt">
        <article className="rj-pcard">
          <Link to={`/package/${pkg.slug}`} className="rj-pcard-img" aria-label={`View ${pkg.title}`}>
            <img src={pkg.image} alt={`${pkg.title} - ${pkg.location}`} loading="lazy" width="640" height="440" />
            {pkg.badge && <span className="rj-pcard-badge">{pkg.badge}</span>}
            <span className="rj-pcard-dur"><Clock size={13} /> {pkg.duration}</span>
          </Link>
          <div className="rj-pcard-body">
            <span className="rj-pcard-loc"><MapPin size={14} /> {pkg.location}</span>
            <h3><Link to={`/package/${pkg.slug}`}>{pkg.title}</Link></h3>
            <p>{pkg.summary}</p>
            <div className="rj-pcard-meta"><Users size={14} /> {pkg.groupSize}</div>
            <div className="rj-pcard-foot">
              <div className="rj-pcard-price">
                {off > 0 && <s>{formatINR(pkg.originalPrice)}</s>}
                <strong>{formatINR(pkg.price)}</strong>
                <small>per person{off > 0 ? ` - save ${off}%` : ""}</small>
              </div>
              <Link to={`/package/${pkg.slug}`} className="rj-pcard-cta" aria-label={`Customise ${pkg.title}`}>
                Customise <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      </Tilt3D>
    </Reveal>
  );
}
