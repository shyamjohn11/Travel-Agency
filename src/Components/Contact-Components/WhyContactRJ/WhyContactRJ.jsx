
import { motion, useReducedMotion } from "framer-motion";
import {
    HeartHandshake,
    Headset,
    ShieldCheck,
    ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./WhyContactRJ.css";

const benefits = [
    {
        number: "01",
        title: "Personalized Planning",
        description:
            "Trips designed around your preferences, interests and travel goals. Every detail begins with understanding what matters to you.",
        icon: HeartHandshake,
        label: "MADE FOR YOU",
    },
    {
        number: "02",
        title: "Dedicated Assistance",
        description:
            "Get helpful guidance and assistance throughout your journey, from your first enquiry to your return home.",
        icon: Headset,
        label: "HERE TO HELP",
    },
    {
        number: "03",
        title: "Trusted Travel Experts",
        description:
            "Benefit from professional travel guidance and thoughtful planning at every stage of your travel experience.",
        icon: ShieldCheck,
        label: "TRAVEL WITH CONFIDENCE",
    },
];

export default function WhyContactRJ() {
    const reduceMotion = useReducedMotion();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: reduceMotion ? {} : { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section className="why-contact-rj">
            <div className="why-contact-container">

                {/* SECTION HEADER */}
                <motion.div
                    className="why-contact-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="why-contact-eyebrow">
                        <span />
                        THE RJ GROUPS DIFFERENCE
                    </span>

                    <h2>
                        Why Contact <span>RJ Groups?</span>
                    </h2>

                    <p>
                        Your journey deserves more than a booking. It deserves
                        thoughtful planning, personal attention and guidance
                        you can feel confident about.
                    </p>
                </motion.div>

                {/* BENEFIT CARDS */}
                <motion.div
                    className="why-contact-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <motion.article
                                className="why-contact-card"
                                key={benefit.number}
                                variants={cardVariants}
                                whileHover={
                                    reduceMotion
                                        ? {}
                                        : { y: -9, transition: { duration: 0.3 } }
                                }
                            >
                                <div className="why-contact-card-top">
                                    <span className="why-contact-number">
                                        {benefit.number}
                                    </span>

                                    <span className="why-contact-icon">
                                        <Icon size={25} strokeWidth={1.7} />
                                    </span>
                                </div>

                                <span className="why-contact-label">
                                    {benefit.label}
                                </span>

                                <h3>{benefit.title}</h3>

                                <p>{benefit.description}</p>

                                <div className="why-contact-card-bottom">
                                    <span>RJ GROUPS</span>
                                    <span className="why-contact-card-arrow">
                                        <ArrowUpRight size={19} />
                                    </span>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* BOTTOM CTA */}
                <motion.div
                    className="why-contact-bottom"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                >
                    <div>
                        <span>YOUR NEXT CHAPTER STARTS HERE</span>
                        <h3>Let's make it a journey to remember.</h3>
                    </div>

                    <Link to="/trips" className="why-contact-cta">
                        Explore Trips
                        <ArrowUpRight size={19} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
