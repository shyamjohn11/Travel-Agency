import { useState } from "react";
import { Mail } from "lucide-react";
import { addEnquiry } from "../../services/db";
import { trackEvent } from "../../utils/track";
import Reveal from "../Reveal/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState("error");
    const r = addEnquiry({ type: "subscriber", name: "Newsletter subscriber", email, source: "newsletter" });
    if (r.ok) {
      trackEvent("subscribe");
      setState("ok");
      setEmail("");
    } else setState("error");
  };
  return (
    <section className="rj-newsletter" aria-labelledby="nl-title">
      <Reveal variant="zoom" className="rj-newsletter-inner">
        <Mail size={30} />
        <h2 id="nl-title">Get travel deals & destination ideas</h2>
        <p>Join our list for seasonal offers, new packages and travel tips. No spam - unsubscribe anytime.</p>
        <form onSubmit={submit} noValidate>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="Your email address" aria-label="Email address" />
          <button type="submit" className="rj-btn-solid">Subscribe</button>
        </form>
        {state === "ok" && <small role="status">Subscribed - thank you!</small>}
        {state === "error" && <small role="alert" className="err">Please enter a valid email.</small>}
      </Reveal>
    </section>
  );
}
