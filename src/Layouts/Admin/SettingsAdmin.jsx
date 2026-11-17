import { useRef, useState } from "react";
import { Download, FileCode2, KeyRound, RotateCcw, Save, Upload } from "lucide-react";
import { useCms } from "../../hooks/useCms";
import { exportData, importData, resetToDefaults, saveSettings } from "../../services/db";
import { changeCredentials } from "../../services/auth";
import { Field } from "../../Components/Admin-Components/AdminUI";
import { useToast } from "../../hooks/useToast";
import { buildSitemap } from "../../utils/sitemap";
import { LOCAL_AREAS } from "../../data/localAreas";
import { BUSINESS } from "../../config/business.config";

const download = (name, text, type) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
};

export default function SettingsAdmin() {
  const cms = useCms();
  const [s, setS] = useState(() => structuredClone(cms.settings));
  const [toast, show] = useToast();
  const [pw, setPw] = useState({ current: "", email: "", next: "", again: "" });
  const fileRef = useRef(null);
  const up = (group, key, v) => setS({ ...s, [group]: { ...s[group], [key]: v } });
  const upM = (key, sub, v) => setS({ ...s, marketing: { ...s.marketing, [key]: { ...s.marketing[key], [sub]: v } } });

  const save = () => {
    if (s.marketing.gaId && !/^G-[A-Z0-9]+$/i.test(s.marketing.gaId)) return show("Google Analytics ID should look like G-XXXXXXXXXX", true);
    if (s.marketing.metaPixelId && !/^\d{8,20}$/.test(s.marketing.metaPixelId)) return show("Meta Pixel ID should be 8-20 digits", true);
    const r = saveSettings(s);
    show(r.ok ? "Settings saved" : r.error, !r.ok);
  };
  const changePw = async () => {
    if (pw.next && pw.next !== pw.again) return show("New passwords do not match", true);
    if (!pw.next && !pw.email) return show("Enter a new email or password", true);
    const r = await changeCredentials({ currentPassword: pw.current, newEmail: pw.email, newPassword: pw.next });
    show(r.ok ? "Login details updated" : r.error, !r.ok);
    if (r.ok) setPw({ current: "", email: "", next: "", again: "" });
  };
  const restore = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { const r = importData(String(rd.result)); show(r.ok ? "Backup restored" : r.error, !r.ok); };
    rd.readAsText(f);
    e.target.value = "";
  };

  return (
    <>
      {toast}
      <div className="ad-top"><div><h1>Marketing & Settings</h1><p>Contact details, analytics, banners, pop-ups, security and backups.</p></div><button className="ad-btn" onClick={save}><Save size={15} /> Save settings</button></div>

      <div className="ad-card"><h2>Business contact</h2><p className="sub">Used by the WhatsApp and call buttons and enquiry follow-ups.</p>
        <div className="ad-form">
          <Field label="Phone"><input value={s.business.phone} onChange={(e) => up("business", "phone", e.target.value)} /></Field>
          <Field label="WhatsApp number" hint="Digits with country code, e.g. 919443679373"><input value={s.business.whatsapp} onChange={(e) => up("business", "whatsapp", e.target.value.replace(/\D/g, ""))} /></Field>
          <Field label="Email"><input type="email" value={s.business.email} onChange={(e) => up("business", "email", e.target.value)} /></Field>
          <Field label="Address" wide><input value={s.business.address} onChange={(e) => up("business", "address", e.target.value)} /></Field>
        </div></div>

      <div className="ad-card"><h2>Announcement bar</h2><p className="sub">Thin strip at the very top of every page - ideal for offers.</p>
        <div className="ad-form">
          <label className="ad-check"><input type="checkbox" checked={s.marketing.announcement.active} onChange={(e) => upM("announcement", "active", e.target.checked)} /> Show announcement bar</label>
          <Field label="Message" wide><input value={s.marketing.announcement.text} onChange={(e) => upM("announcement", "text", e.target.value)} /></Field>
          <Field label="Link (page path)"><input value={s.marketing.announcement.link} onChange={(e) => upM("announcement", "link", e.target.value)} placeholder="/packages/offer" /></Field>
          <Field label="Link label"><input value={s.marketing.announcement.linkLabel} onChange={(e) => upM("announcement", "linkLabel", e.target.value)} /></Field>
        </div></div>

      <div className="ad-card"><h2>Lead pop-up</h2><p className="sub">Appears once per visit when a desktop visitor is about to leave (or after a delay on mobile).</p>
        <div className="ad-form">
          <label className="ad-check"><input type="checkbox" checked={s.marketing.leadPopup.active} onChange={(e) => upM("leadPopup", "active", e.target.checked)} /> Enable lead pop-up</label>
          <Field label="Title" wide><input value={s.marketing.leadPopup.title} onChange={(e) => upM("leadPopup", "title", e.target.value)} /></Field>
          <Field label="Text" wide><textarea rows="2" value={s.marketing.leadPopup.text} onChange={(e) => upM("leadPopup", "text", e.target.value)} /></Field>
          <Field label="Button text"><input value={s.marketing.leadPopup.cta} onChange={(e) => upM("leadPopup", "cta", e.target.value)} /></Field>
          <label className="ad-check"><input type="checkbox" checked={s.marketing.whatsappButton} onChange={(e) => setS({ ...s, marketing: { ...s.marketing, whatsappButton: e.target.checked } })} /> Show floating WhatsApp button</label>
        </div></div>

      <div className="ad-card"><h2>Analytics & ads</h2><p className="sub">Scripts load only after a visitor accepts the matching cookie category.</p>
        <div className="ad-form">
          <Field label="Google Analytics 4 ID" hint="G-XXXXXXXXXX"><input value={s.marketing.gaId} onChange={(e) => setS({ ...s, marketing: { ...s.marketing, gaId: e.target.value.trim() } })} /></Field>
          <Field label="Meta (Facebook) Pixel ID" hint="Numbers only"><input value={s.marketing.metaPixelId} onChange={(e) => setS({ ...s, marketing: { ...s.marketing, metaPixelId: e.target.value.trim() } })} /></Field>
        </div>
        <div className="ad-note" style={{ marginTop: 14, marginBottom: 0 }}>Tracked events: package view, quote request (lead), phone/WhatsApp click, newsletter signup. Verify the Google Search Console and Google Business Profile for your Kuzhithurai office to complete local SEO.</div></div>

      <div className="ad-card"><h2>SEO files</h2><p className="sub">Regenerate the sitemap after publishing new packages, then replace <code>public/sitemap.xml</code> before deploying.</p>
        <div className="ad-row-btns"><button className="ad-btn dark" onClick={() => download("sitemap.xml", buildSitemap({ domain: BUSINESS.domain, categories: cms.categories, packages: cms.packages, areas: LOCAL_AREAS }), "application/xml")}><FileCode2 size={15} /> Download sitemap.xml</button></div></div>

      <div className="ad-card"><h2>Security</h2><p className="sub">Change the admin email and password (min 8 characters).</p>
        <div className="ad-form">
          <Field label="Current password"><input type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} /></Field>
          <Field label="New email (optional)"><input type="email" value={pw.email} onChange={(e) => setPw({ ...pw, email: e.target.value })} /></Field>
          <Field label="New password"><input type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></Field>
          <Field label="Repeat new password"><input type="password" autoComplete="new-password" value={pw.again} onChange={(e) => setPw({ ...pw, again: e.target.value })} /></Field>
        </div>
        <div style={{ marginTop: 14 }}><button className="ad-btn dark" onClick={changePw}><KeyRound size={15} /> Update login</button></div>
        <div className="ad-note danger" style={{ marginTop: 14, marginBottom: 0 }}>This login protects the admin screens in the browser only. For a public website, put the admin and data behind a real server (see README, "Going live") before storing anything sensitive.</div></div>

      <div className="ad-card"><h2>Backup & restore</h2><p className="sub">Download all packages, categories, settings and leads as one file, or restore from one.</p>
        <div className="ad-row-btns">
          <button className="ad-btn dark" onClick={() => download(`rj-backup-${new Date().toISOString().slice(0, 10)}.json`, exportData(), "application/json")}><Download size={15} /> Download backup</button>
          <button className="ad-btn ghost" onClick={() => fileRef.current.click()}><Upload size={15} /> Restore backup</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={restore} />
          <button className="ad-btn danger" onClick={() => { if (window.confirm("Reset ALL content to the original sample data? This deletes your changes and leads.")) { const r = resetToDefaults(); setS(structuredClone(cms.settings)); show(r.ok ? "Reset complete" : r.error, !r.ok); } }}><RotateCcw size={15} /> Reset to sample data</button>
        </div></div>
    </>
  );
}
