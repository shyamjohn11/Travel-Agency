import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ExternalLink, Inbox, LayoutDashboard, LogOut, Menu, Package, Settings, Tags } from "lucide-react";
import SEO from "../../Shared-Components/SEO/SEO";
import { getSession, logout } from "../../services/auth";
import { useCms } from "../../hooks/useCms";
import "./admin.css";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/enquiries", label: "Enquiries & Leads", icon: Inbox, badge: true },
  { to: "/admin/settings", label: "Marketing & Settings", icon: Settings },
];

export default function AdminLayout() {
  const loc = useLocation();
  const nav = useNavigate();
  const { enquiries } = useCms();
  const [open, setOpen] = useState(false);
  const session = getSession();

  useEffect(() => {
    // Lenis smooth-scroll is for the public site only
    document.documentElement.classList.add("rj-admin-mode");
    return () => document.documentElement.classList.remove("rj-admin-mode");
  }, []);

  if (!session) return <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />;
  const fresh = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="ad-root">
      <SEO title="Admin | RJ Groups" description="RJ Groups admin dashboard" robots="noindex, nofollow" url="https://rjgroups.in/admin" />
      <aside className={`ad-side ${open ? "open" : ""}`}>
        <Link to="/admin" className="ad-brand"><img src="/images/rj-groups-logo.png" alt="" /><span><b>RJ GROUPS</b><small>ADMIN PANEL</small></span></Link>
        <nav className="ad-nav" aria-label="Admin">
          {NAV.map(({ to, label, icon: Icon, end, badge }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}><Icon size={18} />{label}{badge && fresh > 0 && <span className="ad-count">{fresh}</span>}</NavLink>
          ))}
          <a href="/" target="_blank" rel="noopener noreferrer"><ExternalLink size={18} />View website</a>
        </nav>
        <div className="ad-side-foot">
          <span>Signed in as<br /><b style={{ color: "#fff" }}>{session.email}</b></span>
          <button className="ad-btn ghost sm" style={{ color: "#fff", borderColor: "#444" }} onClick={() => { logout(); nav("/admin/login"); }}><LogOut size={14} /> Sign out</button>
        </div>
      </aside>
      <main className="ad-main">
        <button className="ad-btn dark ad-burger" style={{ marginBottom: 14 }} onClick={() => setOpen(!open)} aria-label="Toggle menu"><Menu size={16} /> Menu</button>
        <Outlet />
      </main>
    </div>
  );
}
