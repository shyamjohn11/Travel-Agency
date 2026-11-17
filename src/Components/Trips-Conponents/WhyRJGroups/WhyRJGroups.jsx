
import { motion, useReducedMotion } from "framer-motion";
import {
    ShieldCheck,
    Headset,
    Wallet,
    MapPinned,
    Users,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./WhyRJGroups.css";

const benefits = [
    {
        id: "01",
        icon: ShieldCheck,
        title: "Trusted Travel Partner",
        description:
            "Travel with confidence through transparent planning and dependable support.",
    },
    {
        id: "02",
        icon: Wallet,
        title: "Value for Money",
        description:
            "Enjoy thoughtfully planned trips with options that suit your travel budget.",
    },
    {
        id: "03",
        icon: MapPinned,
        title: "Curated Destinations",
        description:
            "Explore handpicked destinations and experiences for every kind of traveller.",
    },
    {
        id: "04",
        icon: Headset,
        title: "Dedicated Assistance",
        description:
            "Get travel guidance and support throughout your holiday planning journey.",
    },
    {
        id: "05",
        icon: Users,
        title: "Personalised Trips",
        description:
            "Choose experiences tailored to your preferences, interests and travel style.",
    },
    {
        id: "06",
        icon: Sparkles,
        title: "Memorable Experiences",
        description:
            "Discover meaningful moments, beautiful places and journeys worth remembering.",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function WhyRJGroups() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="why-rj">
            <div className="why-rj-container">

                {/* Header */}
                <motion.div
                    className="why-rj-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="why-rj-heading">
                        <span className="why-rj-eyebrow">
                            <span />
                            THE RJ GROUPS DIFFERENCE
                        </span>

                        <h2>
                            Why Travel
                            <span> With Us?</span>
                        </h2>

                        <p>
                            Great journeys begin with the right travel partner.
                            We bring thoughtful planning, personalised experiences
                            and dependable assistance together.
                        </p>
                    </div>

                    <div className="why-rj-side-note">
                        <span className="why-rj-side-number">06</span>
                        <span>REASONS TO TRAVEL WITH CONFIDENCE</span>
                    </div>
                </motion.div>

                {/* Benefits */}
                <motion.div
                    className="why-rj-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                >
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <motion.article
                                className="why-rj-card"
                                key={benefit.id}
                                variants={reduceMotion ? {} : cardVariants}
                            >
                                <div className="why-rj-card-top">
                                    <span className="why-rj-card-number">
                                        {benefit.id}
                                    </span>

                                    <span className="why-rj-icon">
                                        <Icon size={22} strokeWidth={1.7} />
                                    </span>
                                </div>

                                <h3>{benefit.title}</h3>

                                <p>{benefit.description}</p>

                                <div className="why-rj-card-line" />
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="why-rj-footer"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <span className="why-rj-footer-label">
                            YOUR JOURNEY, OUR PRIORITY
                        </span>
                        <h3>Let's make your next trip unforgettable.</h3>
                    </div>

                    <Link to="/contact" className="why-rj-cta">
                        Plan Your Trip
                        <ArrowUpRight size={18} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
