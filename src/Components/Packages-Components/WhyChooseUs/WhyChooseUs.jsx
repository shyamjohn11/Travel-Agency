
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    Check,
    Compass,
    Headset,
    HeartHandshake,
    Layers3,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./WhyChooseUs.css";

const benefits = [
    {
        number: "01",
        icon: Layers3,
        title: "All-in-One Solutions",
        description:
            "Explore travel, bookings, recruitment and other services through one convenient destination.",
    },
    {
        number: "02",
        icon: HeartHandshake,
        title: "Customer-First Approach",
        description:
            "We focus on understanding your requirements and helping you find suitable solutions.",
    },
    {
        number: "03",
        icon: ShieldCheck,
        title: "Reliable Assistance",
        description:
            "Get clear communication and guidance throughout your enquiry and service journey.",
    },
    {
        number: "04",
        icon: Compass,
        title: "Personalised Planning",
        description:
            "We help shape travel plans and service options around your individual needs.",
    },
    {
        number: "05",
        icon: Users,
        title: "Convenient Experience",
        description:
            "A straightforward way to explore services, share requirements and connect with our team.",
    },
    {
        number: "06",
        icon: Headset,
        title: "Support When You Need It",
        description:
            "Our team is available to assist with enquiries and help you understand the next steps.",
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
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function WhyChooseUs() {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    return (
        <section className="why-choose-section" ref={sectionRef}>
            <div className="why-choose-container">

                {/* Section Heading */}
                <motion.div
                    className="why-choose-heading"
                    initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="why-choose-eyebrow">
                        <span className="why-eyebrow-line" />
                        THE RJ GROUPS DIFFERENCE
                    </div>

                    <div className="why-heading-row">
                        <h2>
                            Why Choose
                            <br />
                            <span>RJ Groups?</span>
                        </h2>

                        <p>
                            More than a service provider, we're here to make
                            your journey easier with thoughtful planning,
                            convenient solutions and personal assistance.
                        </p>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="why-choose-main">

                    {/* Image Side */}
                    <motion.div
                        className="why-choose-visual"
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="why-visual-image">
                            <img
                                src="/images/packages-hero.jpg"
                                alt="Beautiful travel destination representing RJ Groups"
                                loading="lazy"
                            />

                            <div className="why-image-gradient" />

                            <div className="why-image-caption">
                                <span>YOUR JOURNEY, OUR PRIORITY</span>
                                <h3>
                                    Every journey
                                    <br />
                                    deserves a better beginning.
                                </h3>
                            </div>

                            <div className="why-image-sticker">
                                <Sparkles size={17} />
                                <span>Made for your needs</span>
                            </div>
                        </div>

                        <div className="why-visual-bottom">
                            <div className="why-bottom-icon">
                                <HeartHandshake size={21} />
                            </div>
                            <div>
                                <strong>People come first.</strong>
                                <span>That's the RJ Groups approach.</span>
                            </div>
                            <ArrowUpRight size={22} />
                        </div>
                    </motion.div>

                    {/* Benefits Side */}
                    <motion.div
                        className="why-choose-benefits"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <motion.article
                                    className="why-benefit-card"
                                    variants={cardVariants}
                                    key={benefit.number}
                                    whileHover={reduceMotion ? {} : { x: 6 }}
                                >
                                    <div className="why-benefit-number">
                                        {benefit.number}
                                    </div>

                                    <div className="why-benefit-icon">
                                        <Icon size={23} strokeWidth={1.7} />
                                    </div>

                                    <div className="why-benefit-content">
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.description}</p>
                                    </div>

                                    <div className="why-benefit-check">
                                        <Check size={16} />
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="why-choose-cta"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="why-cta-content">
                        <span>LET'S MAKE IT HAPPEN</span>
                        <h3>Ready to experience the RJ Groups difference?</h3>
                    </div>

                    <Link to="/contact" className="why-cta-button">
                        Talk to Our Team
                        <ArrowUpRight size={19} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
