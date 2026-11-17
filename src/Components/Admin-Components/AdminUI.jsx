import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { IMAGE_LIBRARY } from "../../data/imageLibrary";

export const Field = ({ label, hint, children, wide }) => (
  <label className={`ad-field ${wide ? "wide" : ""}`}>
    <span>{label}</span>
    {children}
    {hint && <small>{hint}</small>}
  </label>
);

/** One item per line <-> array */
export function LinesEditor({ value = [], onChange, rows = 5, placeholder }) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value.join("\n")}
      onChange={(e) => onChange(e.target.value.split("\n"))}
      onBlur={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
    />
  );
}

const compress = (file, max = 1400, quality = 0.78) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * r);
      c.height = Math.round(img.height * r);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = url;
  });

export function ImageInput({ value, onChange, label = "Image" }) {
  const fileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const upload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      onChange(await compress(f));
    } catch (err) {
      alert(err.message);
    }
    setBusy(false);
    e.target.value = "";
  };
  return (
    <div className="ad-img">
      <div className="ad-img-prev">{value ? <img src={value} alt="" /> : <span>No image</span>}</div>
      <div className="ad-img-ctl">
        <input value={value?.startsWith("data:") ? "(uploaded image)" : value || ""} onChange={(e) => onChange(e.target.value)} placeholder="/images/... or https://..." aria-label={`${label} URL`} readOnly={value?.startsWith("data:")} />
        <div className="ad-row-btns">
          <button type="button" className="ad-btn sm" onClick={() => fileRef.current.click()} disabled={busy}><ImagePlus size={14} /> {busy ? "Compressing..." : "Upload"}</button>
          <button type="button" className="ad-btn sm ghost" onClick={() => setOpen(!open)}>Library</button>
          {value && <button type="button" className="ad-btn sm ghost" onClick={() => onChange("")}><Trash2 size={14} /></button>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={upload} />
        {open && (
          <div className="ad-lib">
            {IMAGE_LIBRARY.map((src) => (
              <button type="button" key={src} onClick={() => { onChange(src); setOpen(false); }} title={src}><img src={src} alt="" loading="lazy" /></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const Stat = ({ icon: Icon, label, value, tone }) => (
  <div className={`ad-stat ${tone || ""}`}>
    <div className="ad-stat-ic"><Icon size={20} /></div>
    <div><strong>{value}</strong><small>{label}</small></div>
  </div>
);

export const Badge = ({ children, tone = "gray" }) => <span className={`ad-badge ${tone}`}>{children}</span>;
