
import { motion, useReducedMotion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ArrowUpRight,
} from "lucide-react";

import "./ContactInformation.css";

// Replace these values with RJ Groups' verified business details.
const contactDetails = {
    address: "Kuzhithurai, Kanyakumari District, Tamil Nadu – 629163",
    phone: "+91 9443679373",
    email: "rjgroups2025@gmail.com",
    workingDays: "Mon - Sat",
    workingHours: "9:00 AM – 7:00 PM",
};

const contactItems = [
    {
        number: "01",
        label: "OUR LOCATION",
        title: "Visit Our Office",
        description:
            contactDetails.address || "Add your registered office address here.",
        icon: MapPin,
        action: contactDetails.address
            ? {
                label: "Get Directions",
                href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    contactDetails.address
                )}`,
                external: true,
            }
            : null,
    },
    {
        number: "02",
        label: "CALL US",
        title: "Let's Talk",
        description:
            contactDetails.phone || "Add your official contact number here.",
        icon: Phone,
        action: contactDetails.phone
            ? {
                label: "Call Us",
                href: `tel:${contactDetails.phone.replace(/[^\d+]/g, "")}`,
            }
            : null,
    },
    {
        number: "03",
        label: "EMAIL US",
        title: "Write to Us",
        description:
            contactDetails.email || "Add your official email address here.",
        icon: Mail,
        action: contactDetails.email
            ? {
                label: "Send an Email",
                href: `mailto:${contactDetails.email}`,
            }
            : null,
    },
    {
        number: "04",
        label: "WORKING HOURS",
        title: "We're Available",
        description:
            contactDetails.workingDays && contactDetails.workingHours
                ? `${contactDetails.workingDays} · ${contactDetails.workingHours}`
                : "Add your business working days and hours here.",
        icon: Clock,
        action: null,
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function ContactInformation() {
    const reducedMotion = useReducedMotion();

    return (
        <section className="contact-info-section">
            <div className="contact-info-container">

                {/* Section heading */}
                <motion.div
                    className="contact-info-header"
                    initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="contact-info-eyebrow">
                        <span />
                        QUICK ACCESS
                    </div>

                    <div className="contact-info-heading-row">
                        <h2>
                            We're just
                            <br />
                            <span>a conversation away.</span>
                        </h2>

                        <p>
                            Whether you have a travel enquiry, need guidance
                            or simply want to know more about our services,
                            we're ready to hear from you.
                        </p>
                    </div>
                </motion.div>

                {/* Contact cards */}
                <motion.div
                    className="contact-info-grid"
                    variants={reducedMotion ? undefined : containerVariants}
                    initial={reducedMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {contactItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <motion.article
                                key={item.number}
                                className="contact-info-card"
                                variants={reducedMotion ? undefined : cardVariants}
                            >
                                <div className="contact-info-card-top">
                                    <span className="contact-info-icon">
                                        <Icon size={23} strokeWidth={1.6} />
                                    </span>

                                    <span className="contact-info-number">
                                        {item.number}
                                    </span>
                                </div>

                                <div className="contact-info-card-content">
                                    <span className="contact-info-label">
                                        {item.label}
                                    </span>

                                    <h3>{item.title}</h3>

                                    <p>{item.description}</p>
                                </div>

                                <div className="contact-info-card-bottom">
                                    {item.action ? (
                                        <a
                                            href={item.action.href}
                                            className="contact-info-action"
                                            target={item.action.external ? "_blank" : undefined}
                                            rel={
                                                item.action.external
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                        >
                                            {item.action.label}
                                            <ArrowUpRight size={17} />
                                        </a>
                                    ) : (
                                        <span className="contact-info-static">
                                            RJ GROUPS
                                        </span>
                                    )}
                                </div>

                                <span className="contact-info-card-decoration" />
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* Bottom note */}
                <motion.div
                    className="contact-info-footer"
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="contact-info-footer-dot" />

                    <p>
                        Have something in mind? We'd love to hear from you.
                    </p>

                    <a href="#contact-form">
                        Send an Enquiry
                        <ArrowUpRight size={17} />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
