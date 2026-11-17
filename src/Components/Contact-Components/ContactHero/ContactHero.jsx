
import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import {
    ArrowDown,
    ArrowUpRight,
    MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./ContactHero.css";

export default function ContactHero() {
    const sectionRef = useRef(null);
    const reducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const imageScale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 1.15]
    );

    const contentY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 100]
    );

    return (
        <section
            className="contact-hero"
            ref={sectionRef}
        >
            {/* Background image */}
            <motion.div
                className="contact-hero-background"
                style={{
                    scale: reducedMotion ? 1 : imageScale,
                }}
            >
                <img
                src="/images/contact-hero.jpg"
                alt="Beautiful cinematic coastal destination at sunset"
                fetchPriority="high"
                loading="eager"
                decoding="async"
            />
            </motion.div>

            {/* Dark overlay */}
            <div className="contact-hero-overlay" />

            {/* Decorative elements */}
            <div className="contact-hero-grain" />

            {/* Main content */}
            <motion.div
                className="contact-hero-container"
                style={{
                    y: reducedMotion ? 0 : contentY,
                }}
            >
                <motion.div
                    className="contact-hero-content"
                    initial={reducedMotion ? false : { opacity: 0, y: 45 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* Eyebrow */}
                    <div className="contact-hero-eyebrow">
                        <span className="contact-hero-eyebrow-line" />
                        <span>LET'S START A CONVERSATION</span>
                    </div>

                    {/* Heading */}
                    <h1>
                        Every great journey
                        <br />
                        starts with a
                        <br />
                        <span>conversation.</span>
                    </h1>

                    {/* Description */}
                    <p className="contact-hero-description">
                        Have a destination in mind or an opportunity to explore?
                        We're here to listen, guide and help you take the next step.
                    </p>

                    {/* Actions */}
                    <div className="contact-hero-actions">
                        <a
                            href="#contact-form"
                            className="contact-hero-primary-btn"
                        >
                            <MessageCircle size={17} />
                            Get in Touch
                            <ArrowUpRight size={18} />
                        </a>

                        <Link
                            to="/trips"
                            className="contact-hero-secondary-btn"
                        >
                            Explore Our Journeys
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </motion.div>

                {/* Bottom information */}
                <motion.div
                    className="contact-hero-bottom"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <div className="contact-hero-brand">
                        <span>RJ GROUPS</span>
                        <span>YOUR FUTURE, OUR PRIORITY.</span>
                    </div>

                    <div className="contact-hero-scroll">
                        <span>SCROLL TO CONNECT</span>
                        <div className="contact-hero-scroll-icon">
                            <ArrowDown size={17} />
                        </div>
                    </div>

                    <div className="contact-hero-edition">
                        CONNECTING OPPORTUNITIES.
                        <br />
                        CREATING FUTURES.
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
