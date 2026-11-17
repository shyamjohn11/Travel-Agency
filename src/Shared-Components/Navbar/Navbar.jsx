
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Headset,
    Menu,
    X,
    ArrowUpRight,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { BUSINESS } from "../../config/business.config";

const LOGO = "/images/rj-groups-logo.png";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Trips", path: "/trips" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="rj-header">
            {/* Yellow Top Information Bar */}
            <div className="rj-topbar">
                <div className="rj-topbar-inner">
                    <div className="rj-topbar-left">
                        <span className="rj-topbar-item">
                            <MapPin size={14} />
                            {BUSINESS.address.city}
                        </span>

                        <span className="rj-topbar-divider" />

                        <a href={`tel:${BUSINESS.phone}`} className="rj-topbar-item">
                            <Phone size={14} />
                            {BUSINESS.phone}
                        </a>

                        <span className="rj-topbar-divider" />

                        <a
                            href={`mailto:${BUSINESS.email}`}
                            className="rj-topbar-item rj-topbar-email"
                        >
                            <Mail size={14} />
                            {BUSINESS.email}
                        </a>
                    </div>

                    <div className="rj-topbar-right">
                        <Headset size={15} />
                        <span>Travel Assistance Available 24/7</span>
                    </div>
                </div>
            </div>

            {/* Main Glass Navbar */}
            <nav className="rj-navbar">
                <div className="rj-navbar-inner">
                    {/* Brand */}
                    <Link to="/" className="rj-brand" onClick={closeMenu}>
                        <img src={LOGO} alt="RJ Groups Logo" className="rj-logo" />

                        <div className="rj-brand-content">
                            <span className="rj-brand-name">RJ GROUPS</span>
                            <span className="rj-brand-subtitle">
                                CONSULTANCY & TRAVEL AGENCY
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="rj-desktop-nav">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `rj-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <Link to="/contact" className="rj-nav-cta">
                        <span>Plan a Trip</span>
                        <ArrowUpRight size={17} />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="rj-menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        aria-expanded={menuOpen}
                        aria-controls="rj-mobile-navigation"
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            id="rj-mobile-navigation"
                            className="rj-mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="rj-mobile-menu-inner">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <NavLink
                                            to={item.path}
                                            end={item.path === "/"}
                                            onClick={closeMenu}
                                            className={({ isActive }) =>
                                                `rj-mobile-link ${isActive ? "active" : ""}`
                                            }
                                        >
                                            {item.name}
                                            <ArrowUpRight size={17} />
                                        </NavLink>
                                    </motion.div>
                                ))}

                                <Link
                                    to="/contact"
                                    className="rj-mobile-cta"
                                    onClick={closeMenu}
                                >
                                    Plan a Trip
                                    <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
