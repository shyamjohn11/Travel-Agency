
import { motion, useReducedMotion } from "framer-motion";
import {
    ShieldCheck,
    HeartHandshake,
    Compass,
    Lightbulb,
    Users,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

import "./OurCoreValues.css";

const values = [
    {
        number: "01",
        title: "Trust & Integrity",
        description:
            "We believe every meaningful relationship begins with honesty, transparency and keeping our commitments.",
        icon: ShieldCheck,
        keyword: "TRUST",
    },
    {
        number: "02",
        title: "Customer First",
        description:
            "Your goals, comfort and expectations guide every decision we make and every experience we create.",
        icon: HeartHandshake,
        keyword: "PEOPLE",
    },
    {
        number: "03",
        title: "Passion for Discovery",
        description:
            "We bring curiosity and enthusiasm to every destination, opportunity and new possibility.",
        icon: Compass,
        keyword: "EXPLORE",
    },
    {
        number: "04",
        title: "Excellence in Service",
        description:
            "We focus on thoughtful planning, attention to detail and delivering experiences with care.",
        icon: Sparkles,
        keyword: "QUALITY",
    },
    {
        number: "05",
        title: "Meaningful Connections",
        description:
            "We value lasting relationships and connections that help people move towards their ambitions.",
        icon: Users,
        keyword: "CONNECT",
    },
    {
        number: "06",
        title: "Continuous Growth",
        description:
            "We stay open to new ideas, embrace change and keep improving the way we serve people.",
        icon: Lightbulb,
        keyword: "GROW",
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

export default function OurCoreValues() {
    const reducedMotion = useReducedMotion();

    return (
        <section className="core-values-section">
            <div className="core-values-container">

                {/* Section heading */}
                <motion.div
                    className="core-values-header"
                    initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="core-values-eyebrow">
                        <span className="core-values-eyebrow-line" />
                        WHAT GUIDES US
                    </div>

                    <div className="core-values-heading-row">
                        <h2>
                            Values that shape
                            <br />
                            <span>every journey.</span>
                        </h2>

                        <p>
                            Our values are more than words. They influence how
                            we work, how we connect and how we create meaningful
                            experiences for every person we serve.
                        </p>
                    </div>
                </motion.div>

                {/* Values grid */}
                <motion.div
                    className="core-values-grid"
                    variants={reducedMotion ? undefined : containerVariants}
                    initial={reducedMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                >
                    {values.map((value) => {
                        const Icon = value.icon;

                        return (
                            <motion.article
                                key={value.number}
                                className="core-value-card"
                                variants={reducedMotion ? undefined : cardVariants}
                                whileHover={reducedMotion ? undefined : { y: -7 }}
                            >
                                <div className="core-value-top">
                                    <span className="core-value-number">
                                        {value.number}
                                    </span>

                                    <span className="core-value-icon">
                                        <Icon size={23} strokeWidth={1.6} />
                                    </span>
                                </div>

                                <div className="core-value-content">
                                    <span className="core-value-keyword">
                                        {value.keyword}
                                    </span>

                                    <h3>{value.title}</h3>

                                    <p>{value.description}</p>
                                </div>

                                <div className="core-value-bottom">
                                    <span className="core-value-bottom-line" />
                                    <ArrowUpRight size={19} />
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* Closing statement */}
                <motion.div
                    className="core-values-statement"
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="core-values-statement-mark">“</div>

                    <p>
                        The way we do things matters just as much as
                        <span> where we want to go.</span>
                    </p>

                    <a href="/contact" className="core-values-cta">
                        Connect with us
                        <ArrowUpRight size={17} />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
