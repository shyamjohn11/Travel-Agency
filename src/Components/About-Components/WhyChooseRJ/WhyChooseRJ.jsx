
import { motion, useReducedMotion } from "framer-motion";
import {
    ShieldCheck,
    HeartHandshake,
    Compass,
    Headset,
    Wallet,
    Sparkles,
    ArrowUpRight,
    Check,
} from "lucide-react";

import "./WhyChooseRJ.css";

const benefits = [
    {
        number: "01",
        title: "Personalised Experiences",
        description:
            "Every traveller is different. We focus on understanding your preferences and helping you find experiences that match your expectations.",
        icon: HeartHandshake,
    },
    {
        number: "02",
        title: "Thoughtful Planning",
        description:
            "From choosing destinations to organising travel details, we approach every journey with attention and care.",
        icon: Compass,
    },
    {
        number: "03",
        title: "Trust & Transparency",
        description:
            "We value honest communication, clear information and building relationships that last beyond a single journey.",
        icon: ShieldCheck,
    },
    {
        number: "04",
        title: "Value-Focused Solutions",
        description:
            "We help you explore suitable options that balance your expectations, preferences and budget.",
        icon: Wallet,
    },
    {
        number: "05",
        title: "Dedicated Assistance",
        description:
            "We aim to make planning easier by providing guidance and assistance throughout the enquiry and booking process.",
        icon: Headset,
    },
    {
        number: "06",
        title: "Memorable Journeys",
        description:
            "We believe the best journeys create meaningful memories, new connections and stories worth sharing.",
        icon: Sparkles,
    },
];

const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function WhyChooseRJ() {
    const reducedMotion = useReducedMotion();

    return (
        <section className="why-rj-section">
            <div className="why-rj-container">

                {/* Heading */}
                <motion.div
                    className="why-rj-header"
                    initial={reducedMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="why-rj-eyebrow">
                        <span />
                        THE RJ GROUPS DIFFERENCE
                    </div>

                    <div className="why-rj-heading-row">
                        <h2>
                            More than a service.
                            <br />
                            <span>A trusted connection.</span>
                        </h2>

                        <p>
                            We bring together thoughtful planning, personal
                            attention and a genuine passion for creating
                            meaningful experiences.
                        </p>
                    </div>
                </motion.div>

                {/* Main content */}
                <div className="why-rj-main">

                    {/* Image panel */}
                    <motion.div
                        className="why-rj-image-panel"
                        initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                        <img
                            src="/images/why-rj-groups.jpg"
                            alt="Beautiful destination landscape representing travel with RJ Groups"
                            loading="lazy"
                        />

                        <div className="why-rj-image-overlay" />

                        <div className="why-rj-image-content">
                            <span className="why-rj-image-label">
                                YOUR JOURNEY, OUR PRIORITY
                            </span>

                            <h3>
                                Every journey
                                <br />
                                deserves a
                                <br />
                                <span>better beginning.</span>
                            </h3>

                            <div className="why-rj-image-bottom">
                                <span>RJ GROUPS</span>
                                <span>EST. FOR EVERY JOURNEY</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        className="why-rj-benefits"
                        variants={reducedMotion ? undefined : listVariants}
                        initial={reducedMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <motion.article
                                    className="why-rj-benefit"
                                    key={benefit.number}
                                    variants={reducedMotion ? undefined : itemVariants}
                                >
                                    <div className="why-rj-benefit-icon">
                                        <Icon size={22} strokeWidth={1.6} />
                                    </div>

                                    <div className="why-rj-benefit-content">
                                        <div className="why-rj-benefit-top">
                                            <span>{benefit.number}</span>
                                            <Check size={15} />
                                        </div>

                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.description}</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="why-rj-footer"
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div>
                        <span className="why-rj-footer-label">
                            LET'S MAKE IT MEANINGFUL
                        </span>

                        <h3>
                            Your next chapter starts with a conversation.
                        </h3>
                    </div>

                    <a href="/contact" className="why-rj-cta">
                        Talk to our team
                        <ArrowUpRight size={18} />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
