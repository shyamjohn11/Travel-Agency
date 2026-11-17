import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, FileEdit, Inbox, Package, Plus, TrendingUp } from "lucide-react";
import { useCms } from "../../hooks/useCms";
import { Badge, Stat } from "../../Components/Admin-Components/AdminUI";
import { formatINR } from "../../services/db";

export default function Dashboard() {
  const { packages, categories, enquiries } = useCms();
  const [now] = useState(() => Date.now());
  const pub = packages.filter((p) => p.status === "published").length;
  const draft = packages.length - pub;
  const fresh = enquiries.filter((e) => e.status === "new").length;
  const leads7 = enquiries.filter((e) => {
    const date = new Date(e.createdAt);
    return !isNaN(date.getTime()) && now - date.getTime() < 7 * 864e5;
  }).length;
  const max = Math.max(1, ...categories.map((c) => packages.filter((p) => p.category === c.key).length));
  const sources = Object.entries(enquiries.reduce((a, e) => ({ ...a, [e.source || "website"]: (a[e.source || "website"] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <>
      <div className="ad-top">
        <div><h1>Dashboard</h1><p>Overview of your packages, leads and offers.</p></div>
        <div className="ad-row-btns">
          <Link className="ad-btn" to="/admin/packages/new"><Plus size={16} /> New package</Link>
          <a className="ad-btn ghost" href="/" target="_blank" rel="noopener noreferrer"><Eye size={16} /> View site</a>
        </div>
      </div>
      <div className="ad-grid">
        <Stat icon={Package} label="Published packages" value={pub} tone="dark" />
        <Stat icon={FileEdit} label="Drafts" value={draft} />
        <Stat icon={Inbox} label="New enquiries" value={fresh} />
        <Stat icon={TrendingUp} label="Leads in last 7 days" value={leads7} />
      </div>
      <div className="ad-two">
        <div className="ad-card">
          <h2>Packages by category</h2><p className="sub">Click a bar to manage that category.</p>
          <div className="ad-bars">
            {categories.map((c) => {
              const n = packages.filter((p) => p.category === c.key).length;
              return (
                <Link key={c.key} to={`/admin/packages?category=${c.key}`} className="ad-bar" style={{ color: "inherit", textDecoration: "none" }}>
                  <span>{c.short}</span><i><span style={{ width: `${(n / max) * 100}%` }} /></i><b>{n}</b>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="ad-card">
          <h2>Recent enquiries</h2><p className="sub">Latest leads from forms and pop-ups.</p>
          <div className="ad-list">
            {enquiries.slice(0, 6).map((e) => (
              <Link key={e.id} to="/admin/enquiries"><span><b>{e.name}</b><br /><small>{e.packageTitle || e.source}</small></span><Badge tone={e.status === "new" ? "gold" : "gray"}>{e.status}</Badge></Link>
            ))}
            {!enquiries.length && <div className="it"><small>No enquiries yet. They appear here when visitors submit a form.</small></div>}
          </div>
          {sources.length > 0 && <p className="sub" style={{ marginTop: 14 }}>Top sources: {sources.map(([s, n]) => `${s} (${n})`).join(", ")}</p>}
        </div>
      </div>
      <div className="ad-card">
        <h2>Latest updated packages</h2><p className="sub">Every change here updates the public website immediately.</p>
        <div className="ad-list">
          {[...packages].sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")).slice(0, 5).map((p) => (
            <Link key={p.id} to={`/admin/packages/${p.id}`}><span><b>{p.title}</b><br /><small>{categories.find((c) => c.key === p.category)?.short} &middot; {p.duration}</small></span><span>{formatINR(p.price)}</span></Link>
          ))}
        </div>
      </div>
    </>
  );
}
