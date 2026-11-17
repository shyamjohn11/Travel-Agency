import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Copy, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { useCms } from "../../hooks/useCms";
import { deletePackage, duplicatePackage, formatINR, setPackageStatus } from "../../services/db";
import { Badge } from "../../Components/Admin-Components/AdminUI";
import { useToast } from "../../hooks/useToast";

export default function PackagesAdmin() {
  const { packages, categories } = useCms();
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [toast, show] = useToast();
  const cat = sp.get("category") || "all";

  const list = packages.filter((p) => (cat === "all" || p.category === cat) && (status === "all" || p.status === status) && `${p.title} ${p.location} ${p.place}`.toLowerCase().includes(q.toLowerCase()));
  const catName = (k) => categories.find((c) => c.key === k)?.short || k;

  const del = (p) => {
    if (window.confirm(`Delete "${p.title}"? This cannot be undone.`)) {
      const r = deletePackage(p.id);
      show(r.ok ? "Package deleted" : r.error, !r.ok);
    }
  };

  return (
    <>
      {toast}
      <div className="ad-top">
        <div><h1>Packages</h1><p>{packages.length} total &middot; international, domestic, honeymoon, friends, couple, family, place-wise and offers.</p></div>
        <Link className="ad-btn" to="/admin/packages/new"><Plus size={16} /> New package</Link>
      </div>
      <div className="ad-card">
        <div className="ad-filters">
          <input placeholder="Search packages" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
          <select value={cat} onChange={(e) => setSp(e.target.value === "all" ? {} : { category: e.target.value })} aria-label="Category">
            <option value="all">All categories</option>
            {categories.map((c) => <option key={c.key} value={c.key}>{c.title}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
            <option value="all">All status</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
        </div>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Package</th><th>Category</th><th>Duration</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td><div className="ad-cell-title"><img className="ad-thumb" src={p.image} alt="" loading="lazy" /><span><b>{p.title}</b><small>{p.location}{p.featured ? " - Featured" : ""}</small></span></div></td>
                  <td><Badge tone="blue">{catName(p.category)}</Badge>{p.place && <small style={{ display: "block", marginTop: 4 }}>{p.place}</small>}</td>
                  <td>{p.duration}</td>
                  <td>{formatINR(p.price)}{p.originalPrice > p.price && <small style={{ display: "block", textDecoration: "line-through" }}>{formatINR(p.originalPrice)}</small>}</td>
                  <td><Badge tone={p.status === "published" ? "green" : "gray"}>{p.status}</Badge></td>
                  <td>
                    <div className="ad-row-btns">
                      <Link className="ad-btn sm ghost" to={`/admin/packages/${p.id}`} title="Edit"><Pencil size={14} /></Link>
                      <a className="ad-btn sm ghost" href={`/package/${p.slug}${p.status === "draft" ? "?preview=1" : ""}`} target="_blank" rel="noopener noreferrer" title="View on site"><Eye size={14} /></a>
                      <button className="ad-btn sm ghost" title="Duplicate" onClick={() => { const r = duplicatePackage(p.id); show(r.ok ? "Duplicated as draft" : r.error, !r.ok); }}><Copy size={14} /></button>
                      <button className="ad-btn sm ghost" title={p.status === "published" ? "Unpublish" : "Publish"} onClick={() => { setPackageStatus(p.id, p.status === "published" ? "draft" : "published"); }}>{p.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                      <button className="ad-btn sm danger" title="Delete" onClick={() => del(p)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!list.length && <tr><td colSpan="6" style={{ textAlign: "center", padding: 40, color: "#777" }}>No packages match.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
