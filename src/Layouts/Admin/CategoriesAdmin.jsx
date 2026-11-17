import { useState } from "react";
import { Link } from "react-router-dom";
import { Save } from "lucide-react";
import { useCms } from "../../hooks/useCms";
import { saveCategory } from "../../services/db";
import { Field, ImageInput } from "../../Components/Admin-Components/AdminUI";
import { useToast } from "../../hooks/useToast";

export default function CategoriesAdmin() {
  const { categories, packages } = useCms();
  const [draft, setDraft] = useState({});
  const [toast, show] = useToast();
  const val = (c, k) => draft[c.key]?.[k] ?? c[k];
  const upd = (c, patch) => setDraft({ ...draft, [c.key]: { ...draft[c.key], ...patch } });
  const save = (c) => {
    const r = saveCategory({ key: c.key, ...draft[c.key] });
    show(r.ok ? `${c.short} saved` : r.error, !r.ok);
    if (r.ok) setDraft((d) => Object.fromEntries(Object.entries(d).filter(([k]) => k !== c.key)));
  };
  return (
    <>
      {toast}
      <div className="ad-top"><div><h1>Categories</h1><p>Edit the title, tagline, banner image and intro of each package page (/packages/&lt;category&gt;).</p></div></div>
      {categories.map((c) => (
        <div className="ad-card" key={c.key}>
          <div className="ad-rep-head" style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 17 }}>{c.title} <small style={{ color: "#777", fontWeight: 400 }}>/packages/{c.key} - {packages.filter((p) => p.category === c.key).length} packages</small></span>
            <Link className="ad-btn sm ghost" to={`/admin/packages?category=${c.key}`}>Manage packages</Link>
          </div>
          <div className="ad-form">
            <Field label="Page title"><input value={val(c, "title")} onChange={(e) => upd(c, { title: e.target.value })} /></Field>
            <Field label="Short name (menu/tabs)"><input value={val(c, "short")} onChange={(e) => upd(c, { short: e.target.value })} /></Field>
            <Field label="Tagline" wide><input value={val(c, "tagline")} onChange={(e) => upd(c, { tagline: e.target.value })} /></Field>
            <Field label="Description (also used for SEO)" wide><textarea rows="3" value={val(c, "description")} onChange={(e) => upd(c, { description: e.target.value })} /></Field>
            <Field label="Banner image" wide><ImageInput value={val(c, "image")} onChange={(v) => upd(c, { image: v })} /></Field>
          </div>
          <div style={{ marginTop: 14 }}><button className="ad-btn" disabled={!draft[c.key]} onClick={() => save(c)}><Save size={15} /> Save category</button></div>
        </div>
      ))}
    </>
  );
}
