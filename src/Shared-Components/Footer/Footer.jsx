

import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    MapPin,
    Phone,
    Mail,
    Plane,
    Globe2,
    MoveUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Footer.css";

const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Our Services", path: "/services" },
    { label: "Travel Packages", path: "/packages" },
    { label: "Our Trips", path: "/trips" },
    { label: "Contact Us", path: "/contact" },
];

const services = [
    "Job Offering",
    "Recruitment Solutions",
    "Travel & Tourism",
    "Ticket Booking",
    "Resort & Room Booking",
    "Used Bikes & Cars",
    "Financial & Tax Services",
    "Business & Documentation",
];

const phones = [
    "9443679373",
    "9443074373",
    "9443382573",
    "9994465373",
];

const legalLinks = [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Cookie Policy", path: "/cookie-policy" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

function Footer() {
    const reduceMotion = useReducedMotion();

    const reveal = reduceMotion
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.15 },
            variants: containerVariants,
        };

    const itemMotion = reduceMotion
        ? {}
        : { variants: itemVariants };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "instant" : "smooth",
        });
    };

    return (
        <footer className="rj-footer">

            {/* MAIN FOOTER */}
            <section className="footer-main">
                <motion.div
                    className="footer-grid"
                    {...reveal}
                >

                    {/* BRAND */}
                    <motion.div
                        className="footer-brand"
                        {...itemMotion}
                    >
                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-icon">
                                <Globe2 size={25} />
                            </span>

                            <span className="footer-logo-text">
                                RJ <strong>GROUPS</strong>
                                <small>CONSULTANCY & TRAVEL</small>
                            </span>
                        </Link>

                        <p>
                            Connecting people with opportunities and helping
                            make journeys easier through travel, consultancy
                            and business services.
                        </p>

                        <Link to="/about" className="footer-about-link">
                            Discover our story
                            <ArrowRight size={15} />
                        </Link>
                    </motion.div>

                    {/* QUICK LINKS */}
                    <motion.div
                        className="footer-column"
                        {...itemMotion}
                    >
                        <h3>Explore</h3>

                        <ul>
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path}>
                                        {link.label}
                                        <ArrowUpRight size={13} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* SERVICES */}
                    <motion.div
                        className="footer-column"
                        {...itemMotion}
                    >
                        <h3>Our Services</h3>

                        <ul>
                            {services.map((service) => (
                                <li key={service}>
                                    <Link to="/services">
                                        {service}
                                        <ArrowUpRight size={13} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* CONTACT */}
                    <motion.div
                        className="footer-column footer-contact"
                        {...itemMotion}
                    >
                        <h3>Get in Touch</h3>

                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">
                                <MapPin size={17} />
                            </span>

                            <p>
                                Kuzhithurai,
                                <br />
                                Kanyakumari District,
                                <br />
                                Tamil Nadu – 629163
                            </p>
                        </div>

                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">
                                <Mail size={17} />
                            </span>

                            <a href="mailto:rjgroups2025@gmail.com">
                                rjgroups2025@gmail.com
                            </a>
                        </div>

                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">
                                <Phone size={17} />
                            </span>

                            <div className="footer-phone-list">
                                {phones.map((phone) => (
                                    <a key={phone} href={`tel:${phone}`}>
                                        {phone}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* MARQUEE */}
                <div className="footer-marquee">
                    <div className="footer-marquee-track">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div className="footer-marquee-group" key={index}>
                                <span>EXPLORE MORE</span>
                                <Plane size={19} />
                                <span>DISCOVER MORE</span>
                                <Globe2 size={19} />
                                <span>MOVE FORWARD</span>
                                <MoveUpRight size={19} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM FOOTER */}
                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} RJ Groups Consultancy
                        and Travel Agency Private Limited.
                    </p>

                    <div className="footer-legal-links">
                        {legalLinks.map((link) => (
                            <Link key={link.path} to={link.path}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <button
                        className="footer-top-button"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                    >
                        <ArrowUpRight size={19} />
                    </button>
                </div>

            </section>
        </footer>
    );
}

export default Footer;
