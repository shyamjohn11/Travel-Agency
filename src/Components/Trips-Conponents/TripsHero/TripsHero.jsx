
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowDown,
    ArrowUpRight,
    MapPin,
    Plane,
    Compass,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./TripsHero.css";

const TripsHero = () => {
    const reduceMotion = useReducedMotion();

    const reveal = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: reduceMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section className="trips-hero">

            {/* Background image */}
            <motion.div
                className="trips-hero__background"
                initial={reduceMotion ? false : { scale: 1.18 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: reduceMotion ? 0 : 2.2,
                    ease: "easeOut",
                }}
            />

            {/* Overlays */}
            <div className="trips-hero__overlay" />
            <div className="trips-hero__bottom-gradient" />

            {/* Decorative top label */}
            <motion.div
                className="trips-hero__top-label"
                initial="hidden"
                animate="visible"
                variants={reveal}
            >
                <span className="trips-hero__label-icon">
                    <Sparkles size={14} />
                </span>

                <span>DISCOVER THE WORLD WITH RJ GROUPS</span>

                <span className="trips-hero__label-line" />
            </motion.div>

            {/* Main content */}
            <div className="trips-hero__container">

                <motion.div
                    className="trips-hero__content"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: reduceMotion ? 0 : 0.16,
                            },
                        },
                    }}
                >

                    <motion.div
                        className="trips-hero__eyebrow"
                        variants={reveal}
                    >
                        <span className="trips-hero__eyebrow-line" />
                        <span>YOUR JOURNEY STARTS HERE</span>
                    </motion.div>

                    <motion.h1
                        className="trips-hero__title"
                        variants={reveal}
                    >
                        Beyond
                        <br />

                        <span className="trips-hero__title-outline">
                            Ordinary.
                        </span>

                        <br />

                        <span className="trips-hero__title-accent">
                            Into Extraordinary.
                        </span>
                    </motion.h1>

                    <motion.p
                        className="trips-hero__description"
                        variants={reveal}
                    >
                        Discover breathtaking destinations, unforgettable
                        experiences and journeys that turn every moment
                        into a beautiful memory.
                    </motion.p>

                    <motion.div
                        className="trips-hero__actions"
                        variants={reveal}
                    >
                        <Link
                            to="/packages"
                            className="trips-hero__primary-btn"
                        >
                            Explore Our Trips
                            <span className="trips-hero__btn-icon">
                                <ArrowUpRight size={19} />
                            </span>
                        </Link>

                        <Link
                            to="/contact"
                            className="trips-hero__secondary-btn"
                        >
                            Plan Your Journey
                            <ArrowUpRight size={18} />
                        </Link>
                    </motion.div>

                    <motion.div
                        className="trips-hero__trust"
                        variants={reveal}
                    >
                        <div className="trips-hero__trust-icon">
                            <Compass size={19} />
                        </div>

                        <div>
                            <strong>Travel beyond expectations</strong>
                            <span>Every destination. Every experience. Every memory.</span>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Floating destination card */}
                <motion.div
                    className="trips-hero__destination"
                    initial={reduceMotion ? false : { opacity: 0, x: 45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: reduceMotion ? 0 : 1,
                        duration: 1,
                    }}
                >
                    <div className="trips-hero__destination-top">
                        <span>FEATURED DESTINATION</span>
                        <Plane size={17} />
                    </div>

                    <div className="trips-hero__destination-name">
                        Kashmir
                    </div>

                    <div className="trips-hero__destination-location">
                        <MapPin size={14} />
                        <span>Jammu & Kashmir, India</span>
                    </div>

                    <div className="trips-hero__destination-bottom">
                        <span>Explore the extraordinary</span>
                        <ArrowUpRight size={17} />
                    </div>
                </motion.div>

            </div>

            {/* Bottom information */}
            <div className="trips-hero__bottom">

                <div className="trips-hero__stats">

                    <div className="trips-hero__stat">
                        <strong>25<span>+</span></strong>
                        <small>Destinations</small>
                    </div>

                    <div className="trips-hero__stat-divider" />

                    <div className="trips-hero__stat">
                        <strong>500<span>+</span></strong>
                        <small>Happy Travellers</small>
                    </div>

                    <div className="trips-hero__stat-divider" />

                    <div className="trips-hero__stat">
                        <strong>12<span>+</span></strong>
                        <small>Years Experience</small>
                    </div>

                </div>

                <motion.a
                    href="#trips-explore"
                    className="trips-hero__scroll"
                    animate={
                        reduceMotion
                            ? {}
                            : { y: [0, 8, 0] }
                    }
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span>SCROLL TO EXPLORE</span>
                    <ArrowDown size={17} />
                </motion.a>

                <div className="trips-hero__index">
                    <span>01</span>
                    <div />
                    <span>TRAVEL STORIES</span>
                </div>

            </div>

        </section>
    );
};

export default TripsHero;
