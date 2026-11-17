import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { useCms } from "../../hooks/useCms";
import { savePackage, slugify } from "../../services/db";
import { Field, ImageInput, LinesEditor } from "../../Components/Admin-Components/AdminUI";
import { useToast } from "../../hooks/useToast";

const blank = (category = "domestic") => ({
  title: "", slug: "", category, place: "", location: "", country: "India", status: "draft", featured: false, badge: "",
  price: 0, originalPrice: 0, offerEndsAt: "", days: 4, groupSize: "2+ travellers", bestTime: "Year-round",
  image: "", gallery: [], summary: "", description: "", highlights: [], itinerary: [{ day: 1, title: "", details: "" }],
  inclusions: [], exclusions: [], customOptions: [], faqs: [], tags: [], seo: { title: "", description: "", keywords: "" },
});
const TABS = ["Basics", "Pricing & Offer", "Media", "Content", "Itinerary", "Customisation", "FAQs", "SEO"];
const rid = () => Math.random().toString(36).slice(2, 7);

export default function PackageEditor() {
  const { id } = useParams();
  const nav = useNavigate();
  const { packages, categories } = useCms();
  const existing = packages.find((p) => p.id === id);
  const [f, setF] = useState(() => (existing ? structuredClone(existing) : blank()));
  const [tab, setTab] = useState("Basics");
  const [dirty, setDirty] = useState(false);
  const [toast, show] = useToast();
  const isNew = !existing;

  const set = (patch) => { setF((p) => ({ ...p, ...patch })); setDirty(true); };
  const setSeo = (patch) => set({ seo: { ...f.seo, ...patch } });

  const problems = useMemo(() => {
    const e = [];
    if (!f.title.trim()) e.push("Title is required");
    if (!f.image.trim()) e.push("Main image is required");
    if (!(Number(f.price) > 0)) e.push("Price must be greater than 0");
    if (f.originalPrice && Number(f.originalPrice) <= Number(f.price)) e.push("Original price should be higher than the offer price (or leave it 0)");
    if (f.category === "place" && !f.place.trim()) e.push("Place-wise packages need a Place name");
    return e;
  }, [f]);

  if (id && id !== "new" && !existing) {
    return <div className="ad-card"><h2>Package not found</h2><Link className="ad-btn" to="/admin/packages">Back to packages</Link></div>;
  }

  const save = (status) => {
    if (problems.length) { show(problems[0], true); return; }
    const clean = {
      ...f,
      status: status || f.status,
      itinerary: f.itinerary.filter((d) => d.title.trim()).map((d, i) => ({ ...d, day: i + 1 })),
      highlights: f.highlights.map((s) => s.trim()).filter(Boolean),
      inclusions: f.inclusions.map((s) => s.trim()).filter(Boolean),
      exclusions: f.exclusions.map((s) => s.trim()).filter(Boolean),
      gallery: f.gallery.map((s) => s.trim()).filter(Boolean),
      faqs: f.faqs.filter((q) => q.q.trim() && q.a.trim()),
      customOptions: f.customOptions
        .map((g) => ({ ...g, options: g.options.filter((o) => o.label.trim()).map((o) => ({ ...o, price: Number(o.price) || 0 })) }))
        .filter((g) => g.label.trim() && g.options.length),
      seo: {
        title: f.seo.title || `${f.title} - ${Math.max(f.days - 1, 0)}N/${f.days}D Tour Package | RJ Groups`,
        description: f.seo.description || f.summary,
        keywords: f.seo.keywords,
      },
    };
    const r = savePackage(clean);
    if (!r.ok) { show(r.error, true); return; }
    setDirty(false);
    show(clean.status === "published" ? "Saved and live on the website" : "Saved as draft");
    if (isNew) nav(`/admin/packages/${r.pkg.id}`, { replace: true });
    else setF(structuredClone(r.pkg));
  };

  /* repeaters */
  const updItin = (i, patch) => set({ itinerary: f.itinerary.map((d, k) => (k === i ? { ...d, ...patch } : d)) });
  const updGroup = (gi, patch) => set({ customOptions: f.customOptions.map((g, k) => (k === gi ? { ...g, ...patch } : g)) });
  const updOpt = (gi, oi, patch) => updGroup(gi, { options: f.customOptions[gi].options.map((o, k) => (k === oi ? { ...o, ...patch } : o)) });
  const setDefaultOpt = (gi, oi) => {
    const g = f.customOptions[gi];
    updGroup(gi, { options: g.options.map((o, k) => ({ ...o, default: g.type === "single" ? k === oi : k === oi ? !o.default : o.default })) });
  };

  return (
    <>
      {toast}
      <div className="ad-top">
        <div>
          <Link to="/admin/packages" className="ad-btn ghost sm" style={{ marginBottom: 10 }}><ArrowLeft size={14} /> All packages</Link>
          <h1>{isNew ? "New package" : `Edit: ${existing.title}`}</h1>
          <p>Changes go live on the website as soon as you save a published package.</p>
        </div>
      </div>
      <div className="ad-tabs" role="tablist">{TABS.map((t) => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</div>

      {tab === "Basics" && (
        <div className="ad-card"><div className="ad-form">
          <Field label="Package title *" wide><input value={f.title} onChange={(e) => set({ title: e.target.value, ...(isNew && !f.slug ? {} : {}) })} placeholder="e.g. Dubai Desert & Skyline" /></Field>
          <Field label="Category *" hint="Decides which page the package appears on.">
            <select value={f.category} onChange={(e) => set({ category: e.target.value })}>{categories.map((c) => <option key={c.key} value={c.key}>{c.title}</option>)}</select>
          </Field>
          <Field label={`Place / destination${f.category === "place" ? " *" : ""}`} hint="Used to group place-wise packages (e.g. Munnar)."><input value={f.place} onChange={(e) => set({ place: e.target.value })} /></Field>
          <Field label="Location text" hint="Shown on cards, e.g. Munnar, Alleppey"><input value={f.location} onChange={(e) => set({ location: e.target.value })} /></Field>
          <Field label="Country"><input value={f.country} onChange={(e) => set({ country: e.target.value })} /></Field>
          <Field label="Days"><input type="number" min="1" max="60" value={f.days} onChange={(e) => set({ days: Number(e.target.value) })} /></Field>
          <Field label="Ideal for / group size"><input value={f.groupSize} onChange={(e) => set({ groupSize: e.target.value })} /></Field>
          <Field label="Best time to visit"><input value={f.bestTime} onChange={(e) => set({ bestTime: e.target.value })} /></Field>
          <Field label="Badge (optional)" hint='e.g. "Best Seller", "Honeymoon Special"'><input value={f.badge} onChange={(e) => set({ badge: e.target.value })} /></Field>
          <Field label="URL slug" hint={`/package/${f.slug || slugify(f.title) || "..."}`}><input value={f.slug} onChange={(e) => set({ slug: e.target.value })} placeholder="auto from title" /></Field>
          <Field label="Status"><select value={f.status} onChange={(e) => set({ status: e.target.value })}><option value="published">Published (visible)</option><option value="draft">Draft (hidden)</option></select></Field>
          <label className="ad-check"><input type="checkbox" checked={f.featured} onChange={(e) => set({ featured: e.target.checked })} /> Featured (shown first and on home page)</label>
          <Field label="Short summary (1-2 lines) *" wide><textarea rows="2" value={f.summary} onChange={(e) => set({ summary: e.target.value })} /></Field>
        </div></div>
      )}

      {tab === "Pricing & Offer" && (
        <div className="ad-card"><div className="ad-form">
          <Field label="Price per person (INR) *"><input type="number" min="0" value={f.price} onChange={(e) => set({ price: e.target.value })} /></Field>
          <Field label="Original price (INR)" hint="Fill to show a strike-through price and discount %. Leave 0 for no discount."><input type="number" min="0" value={f.originalPrice} onChange={(e) => set({ originalPrice: e.target.value })} /></Field>
          <Field label="Offer valid until" hint="Offer-category packages hide automatically after this date."><input type="date" value={f.offerEndsAt} onChange={(e) => set({ offerEndsAt: e.target.value })} /></Field>
          <div className="ad-note wide" style={{ gridColumn: "1/-1", marginBottom: 0 }}>For a deal that appears on the <b>Offer Packages</b> page, set category to "Offer Packages". To discount a package inside another category, just fill Original price.</div>
        </div></div>
      )}

      {tab === "Media" && (
        <div className="ad-card">
          <h2>Main image *</h2><p className="sub">Wide photos (3:2) look best. Uploads are compressed and kept in this browser; prefer /images paths or URLs for many images.</p>
          <ImageInput value={f.image} onChange={(v) => set({ image: v })} />
          <h2 style={{ marginTop: 26 }}>Gallery</h2><p className="sub">Up to 4 extra images.</p>
          <div className="ad-rep">
            {f.gallery.map((g, i) => (
              <div key={i} className="ad-rep-item"><div className="ad-rep-head">Photo {i + 1}<button type="button" className="ad-btn sm danger" onClick={() => set({ gallery: f.gallery.filter((_, k) => k !== i) })}><Trash2 size={13} /></button></div>
                <ImageInput value={g} onChange={(v) => set({ gallery: f.gallery.map((x, k) => (k === i ? v : x)) })} /></div>
            ))}
            {f.gallery.length < 4 && <button type="button" className="ad-btn ghost" onClick={() => set({ gallery: [...f.gallery, ""] })}><Plus size={14} /> Add photo</button>}
          </div>
        </div>
      )}

      {tab === "Content" && (
        <div className="ad-card"><div className="ad-form">
          <Field label="Full description" wide><textarea rows="6" value={f.description} onChange={(e) => set({ description: e.target.value })} /></Field>
          <Field label="Highlights" hint="One per line"><LinesEditor value={f.highlights} onChange={(v) => set({ highlights: v })} /></Field>
          <Field label="Inclusions" hint="One per line"><LinesEditor value={f.inclusions} onChange={(v) => set({ inclusions: v })} /></Field>
          <Field label="Exclusions" hint="One per line"><LinesEditor value={f.exclusions} onChange={(v) => set({ exclusions: v })} /></Field>
        </div></div>
      )}

      {tab === "Itinerary" && (
        <div className="ad-card"><h2>Day-wise itinerary</h2><p className="sub">Days are numbered automatically. Empty days are ignored on save.</p>
          <div className="ad-rep">
            {f.itinerary.map((d, i) => (
              <div className="ad-rep-item" key={i}>
                <div className="ad-rep-head">Day {i + 1}<button type="button" className="ad-btn sm danger" onClick={() => set({ itinerary: f.itinerary.filter((_, k) => k !== i) })}><Trash2 size={13} /></button></div>
                <input placeholder="Day title" value={d.title} onChange={(e) => updItin(i, { title: e.target.value })} aria-label={`Day ${i + 1} title`} />
                <textarea rows="2" placeholder="What happens on this day" value={d.details} onChange={(e) => updItin(i, { details: e.target.value })} aria-label={`Day ${i + 1} details`} />
              </div>
            ))}
            <button type="button" className="ad-btn ghost" onClick={() => set({ itinerary: [...f.itinerary, { day: f.itinerary.length + 1, title: "", details: "" }] })}><Plus size={14} /> Add day</button>
          </div>
        </div>
      )}

      {tab === "Customisation" && (
        <div className="ad-card"><h2>Customisation options</h2>
          <p className="sub">Visitors pick from these on the package page. Prices are <b>per person</b> and add to the base price. Use "single" for one choice (hotel, meal plan) or "multi" for add-ons.</p>
          <div className="ad-rep">
            {f.customOptions.map((g, gi) => (
              <div className="ad-rep-item" key={g.id}>
                <div className="ad-rep-head">Option group {gi + 1}<button type="button" className="ad-btn sm danger" onClick={() => set({ customOptions: f.customOptions.filter((_, k) => k !== gi) })}><Trash2 size={13} /></button></div>
                <div className="ad-form"><Field label="Group name"><input value={g.label} onChange={(e) => updGroup(gi, { label: e.target.value })} placeholder="e.g. Hotel category" /></Field>
                  <Field label="Selection type"><select value={g.type} onChange={(e) => updGroup(gi, { type: e.target.value, options: g.options.map((o) => ({ ...o, default: false })) })}><option value="single">Single choice</option><option value="multi">Multiple (add-ons)</option></select></Field></div>
                <div className="ad-opts">
                  {g.options.map((o, oi) => (
                    <div className="ad-opt-row" key={o.id}>
                      <input placeholder="Option label" value={o.label} onChange={(e) => updOpt(gi, oi, { label: e.target.value })} aria-label="Option label" />
                      <input type="number" min="0" placeholder="+ INR" value={o.price} onChange={(e) => updOpt(gi, oi, { price: e.target.value })} aria-label="Extra price per person" />
                      <label className="ad-check" title="Pre-selected"><input type={g.type === "single" ? "radio" : "checkbox"} name={`def-${g.id}`} checked={!!o.default} onChange={() => setDefaultOpt(gi, oi)} />Default</label>
                      <button type="button" className="ad-btn sm danger" onClick={() => updGroup(gi, { options: g.options.filter((_, k) => k !== oi) })}><Trash2 size={13} /></button>
                    </div>
                  ))}
                  <button type="button" className="ad-btn sm ghost" onClick={() => updGroup(gi, { options: [...g.options, { id: `o${rid()}`, label: "", price: 0 }] })}><Plus size={13} /> Add option</button>
                </div>
              </div>
            ))}
            <button type="button" className="ad-btn ghost" onClick={() => set({ customOptions: [...f.customOptions, { id: `g${rid()}`, label: "", type: "single", options: [{ id: `o${rid()}`, label: "", price: 0, default: true }] }] })}><Plus size={14} /> Add option group</button>
          </div>
        </div>
      )}

      {tab === "FAQs" && (
        <div className="ad-card"><h2>Package FAQs</h2><p className="sub">Shown on the page and sent to search engines and AI assistants as FAQ schema.</p>
          <div className="ad-rep">
            {f.faqs.map((q, i) => (
              <div className="ad-rep-item" key={i}>
                <div className="ad-rep-head">FAQ {i + 1}<button type="button" className="ad-btn sm danger" onClick={() => set({ faqs: f.faqs.filter((_, k) => k !== i) })}><Trash2 size={13} /></button></div>
                <input placeholder="Question" value={q.q} onChange={(e) => set({ faqs: f.faqs.map((x, k) => (k === i ? { ...x, q: e.target.value } : x)) })} />
                <textarea rows="2" placeholder="Answer (be direct and specific)" value={q.a} onChange={(e) => set({ faqs: f.faqs.map((x, k) => (k === i ? { ...x, a: e.target.value } : x)) })} />
              </div>
            ))}
            <button type="button" className="ad-btn ghost" onClick={() => set({ faqs: [...f.faqs, { q: "", a: "" }] })}><Plus size={14} /> Add FAQ</button>
          </div>
        </div>
      )}

      {tab === "SEO" && (
        <div className="ad-card"><div className="ad-form">
          <Field label="SEO title" hint={`${(f.seo.title || "").length}/60 characters - leave blank to auto-generate`} wide><input value={f.seo.title} onChange={(e) => setSeo({ title: e.target.value })} /></Field>
          <Field label="Meta description" hint={`${(f.seo.description || "").length}/160 characters - leave blank to use the summary`} wide><textarea rows="3" value={f.seo.description} onChange={(e) => setSeo({ description: e.target.value })} /></Field>
          <Field label="Keywords" hint="Comma separated" wide><input value={f.seo.keywords} onChange={(e) => setSeo({ keywords: e.target.value })} /></Field>
          <div className="ad-note" style={{ gridColumn: "1/-1", marginBottom: 0 }}>
            <b>Search preview</b><br />
            <span style={{ color: "#1a0dab", fontSize: 17 }}>{f.seo.title || `${f.title || "Package title"} | RJ Groups`}</span><br />
            <span style={{ color: "#006621", fontSize: 13 }}>rjgroups.in/package/{f.slug || slugify(f.title)}</span><br />
            <span style={{ fontSize: 13.5 }}>{(f.seo.description || f.summary || "").slice(0, 160)}</span>
          </div>
        </div></div>
      )}

      <div className="ad-savebar">
        <span style={{ fontSize: 13 }}>{problems.length ? `Fix: ${problems[0]}` : dirty ? "Unsaved changes" : "All changes saved"}</span>
        <div className="ad-row-btns">
          <button className="ad-btn ghost sm" style={{ color: "#fff", borderColor: "#555" }} onClick={() => save("draft")}><Save size={14} /> Save as draft</button>
          <button className="ad-btn sm" onClick={() => save("published")}><Save size={14} /> Save &amp; publish</button>
        </div>
      </div>
    </>
  );
}
