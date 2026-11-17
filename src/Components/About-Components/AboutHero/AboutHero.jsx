
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
    ArrowDown,
    ArrowUpRight,
    Compass,
    MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./AboutHero.css";

const AboutHero = () => {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const imageScale = useTransform(
        scrollYProgress,
        [0, 1],
        reduceMotion ? [1, 1] : [1.08, 1.2]
    );

    const fadeUp = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 35 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="about-hero" ref={sectionRef}>
            {/* BACKGROUND IMAGE */}
            <motion.div
                className="about-hero-image"
                style={{
                    y: imageY,
                    scale: imageScale,
                }}
            />

            <div className="about-hero-overlay" />

            {/* TOP CONTENT */}
            <div className="about-hero-inner">
                <motion.div
                    className="about-hero-top"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                >
                    <div className="about-hero-location">
                        <MapPin size={14} />
                        <span>TRAVEL BEYOND EXPECTATIONS</span>
                    </div>

                    <span className="about-hero-index">RJ GROUPS / ABOUT</span>
                </motion.div>

                {/* MAIN CONTENT */}
                <div className="about-hero-content">
                    <motion.div
                        className="about-hero-eyebrow"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        <span />
                        GET TO KNOW RJ GROUPS
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ duration: 0.9, delay: 0.25 }}
                    >
                        We don't just plan
                        <br />
                        <span>journeys.</span>
                        <br />
                        We create stories.
                    </motion.h1>

                    <motion.p
                        className="about-hero-description"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Every destination has a story. Every traveller has
                        a dream. We bring them together through thoughtfully
                        planned travel experiences.
                    </motion.p>

                    <motion.div
                        className="about-hero-actions"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ duration: 0.8, delay: 0.55 }}
                    >
                        <Link to="/contact" className="about-hero-button">
                            Let's talk
                            <ArrowUpRight size={18} />
                        </Link>

                        <Link to="/trips" className="about-hero-text-link">
                            Explore our journeys
                            <ArrowUpRight size={16} />
                        </Link>
                    </motion.div>
                </div>

                {/* BOTTOM CONTENT */}
                <motion.div
                    className="about-hero-bottom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <div className="about-hero-brand">
                        <Compass size={19} strokeWidth={1.5} />
                        <div>
                            <span>RJ GROUPS</span>
                            <small>YOUR FUTURE, OUR PRIORITY.</small>
                        </div>
                    </div>

                    <div className="about-hero-scroll">
                        <span>SCROLL TO DISCOVER</span>
                        <div className="about-scroll-icon">
                            <ArrowDown size={16} />
                        </div>
                    </div>

                    <span className="about-hero-est">CONNECTING OPPORTUNITIES. CREATING FUTURES.</span>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;
