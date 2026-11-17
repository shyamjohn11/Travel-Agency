import { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import SEO from "../../Shared-Components/SEO/SEO";
import { getSession, login, usingDefaultPassword } from "../../services/auth";
import "./admin.css";

export default function AdminLogin() {
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  if (getSession()) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await login(email, pw, remember);
    setBusy(false);
    if (r.ok) nav(loc.state?.from || "/admin", { replace: true });
    else setErr(r.error);
  };

  return (
    <div className="ad-root-login">
      <SEO title="Admin Login | RJ Groups" description="Admin sign in" robots="noindex, nofollow" url="https://rjgroups.in/admin/login" />
      <div className="al-wrap" style={{ "--rj-accent": "#FFAA33" }}>
        <div className="al-art" aria-hidden="true">
          <img className="bg" src="/images/hero/maldives.jpg" alt="" />
          <div className="al-cube"><span>TRAVEL</span><span>TOURS</span><span>HOTELS</span><span>FLIGHTS</span><span>VISA</span><span>RJ</span></div>
          <h2>Manage every <em>package, offer</em> and enquiry in one place.</h2>
        </div>
        <div className="al-form-side">
          <div className="al-card">
            <img src="/images/rj-groups-logo.png" alt="RJ Groups" />
            <h1>Admin sign in</h1>
            <p>Sign in to update packages, offers, SEO and marketing settings.</p>
            <form onSubmit={submit} className="ad-root" style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: 0, background: "none" }}>
              {err && <div className="al-err" role="alert">{err}</div>}
              <label className="ad-field"><span>Email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
              <label className="ad-field"><span>Password</span>
                <div className="al-pass"><input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" required /><button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
              </label>
              <label className="ad-check"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Keep me signed in on this device</label>
              <button className="ad-btn" disabled={busy} type="submit"><Lock size={15} /> {busy ? "Signing in..." : "Sign in"}</button>
              {usingDefaultPassword() && <div className="ad-note" style={{ marginBottom: 0 }}>First time? Default login is in the README. Change it right after signing in (Settings &rarr; Security).</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
