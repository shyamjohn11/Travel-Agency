import { useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { addEnquiry } from "../../services/db";
import { useSettings } from "../../hooks/useCms";
import { getUtm, trackEvent } from "../../utils/track";

/** Reusable lead form. Saves to Admin > Enquiries. */
export default function EnquiryForm({ packageTitle = "", packageId = "", selection = null, source = "website", cta = "Send enquiry", compact = false, onDone }) {
  const { business } = useSettings();
  const [f, setF] = useState({ name: "", phone: "", email: "", date: "", travellers: 2, message: "", company: "" });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (f.company) return; // honeypot
    const errors = {};
    if (f.name.trim().length < 2) errors.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{8,14}$/.test(f.phone.trim())) errors.phone = "Enter a valid phone number";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) errors.email = "Enter a valid email";
    setErr(errors);
    if (Object.keys(errors).length) return;
    const res = addEnquiry({
      name: f.name.trim(),
      phone: f.phone.trim(),
      email: f.email.trim(),
      travelDate: f.date,
      travellers: Number(f.travellers) || 1,
      message: f.message.trim(),
      packageTitle,
      packageId,
      selection,
      source,
      utm: getUtm(),
    });
    if (!res.ok) {
      setErr({ form: "Could not save your enquiry. Please call or WhatsApp us." });
      return;
    }
    trackEvent("generate_lead", { source, package: packageTitle });
    setDone(true);
    onDone?.();
  };

  const waText = `Hi RJ Groups, I'm ${f.name || "interested"}${packageTitle ? ` in "${packageTitle}"` : ""}${f.date ? ` for ${f.date}` : ""}, ${f.travellers} traveller(s).`;

  if (done) {
    return (
      <div className="rj-form-done" role="status">
        <CheckCircle2 size={38} />
        <h4>Thank you, {f.name.split(" ")[0]}!</h4>
        <p>Our travel expert will contact you shortly. Prefer an instant reply?</p>
        <a className="rj-btn-solid" href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className={`rj-form ${compact ? "compact" : ""}`} onSubmit={submit} noValidate>
      <div className="rj-field"><label>Full name *<input value={f.name} onChange={set("name")} autoComplete="name" />{err.name && <em>{err.name}</em>}</label></div>
      <div className="rj-field"><label>Phone / WhatsApp *<input value={f.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" />{err.phone && <em>{err.phone}</em>}</label></div>
      {!compact && <div className="rj-field"><label>Email<input value={f.email} onChange={set("email")} type="email" autoComplete="email" />{err.email && <em>{err.email}</em>}</label></div>}
      <div className="rj-row">
        <div className="rj-field"><label>Travel date<input type="date" value={f.date} onChange={set("date")} min={new Date().toISOString().slice(0, 10)} /></label></div>
        <div className="rj-field"><label>Travellers<input type="number" min="1" max="60" value={f.travellers} onChange={set("travellers")} /></label></div>
      </div>
      {!compact && <div className="rj-field"><label>Message<textarea rows="3" value={f.message} onChange={set("message")} /></label></div>}
      <input className="rj-hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f.company} onChange={set("company")} />
      {err.form && <em className="rj-err">{err.form}</em>}
      <button className="rj-btn-solid" type="submit"><Send size={16} /> {cta}</button>
      <small className="rj-consent-note">By submitting you agree to our privacy policy.</small>
    </form>
  );
}
