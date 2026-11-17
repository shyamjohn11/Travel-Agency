import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    ArrowUpRight,
    MoveUpRight,
    Plane,
    ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./CallToAction.css";

gsap.registerPlugin(ScrollTrigger);

const travelImages = [
    {
        src: "/images/cta-travel-01.jpg",
        alt: "Beautiful mountain travel destination",
    },
    {
        src: "/images/cta-travel-02.jpg",
        alt: "Tropical beach and ocean destination",
    },
    {
        src: "/images/cta-travel-03.jpg",
        alt: "Scenic European city destination",
    },
];

export default function CallToAction() {
    const sectionRef = useRef(null);
    const imageRefs = useRef([]);
    const progressRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Recalculate ScrollTrigger positions after mount so a browser refresh
    // (which may restore scroll position) does not leave pinned content stuck
    // and the page blank.
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                ScrollTrigger.refresh();
            } catch {
                /* never let a refresh error unmount the app */
            }
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(
        () => {
            try {
                const images = imageRefs.current.filter(Boolean);

                if (!images.length) return;

                gsap.set(images, {
                    opacity: 0,
                    scale: 1.25,
                });

                gsap.set(images[0], {
                    opacity: 1,
                    scale: 1.12,
                });

                if (reduceMotion) {
                    gsap.set(images, {
                        opacity: 0,
                        scale: 1,
                    });

                    gsap.set(images[0], {
                        opacity: 1,
                    });

                    return;
                }

                const mm = gsap.matchMedia();

                const createImageTimeline = (endDistance) => {
                    const timeline = gsap.timeline({
                        defaults: {
                            ease: "none",
                        },
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: endDistance,
                            scrub: 1.2,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    timeline.to(
                        images[0],
                        {
                            scale: 1.35,
                            duration: 1,
                        },
                        0
                    );

                    timeline.to(
                        images[0],
                        {
                            opacity: 0,
                            duration: 0.45,
                        },
                        0.8
                    );

                    timeline.fromTo(
                        images[1],
                        {
                            opacity: 0,
                            scale: 1.3,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                        },
                        0.8
                    );

                    timeline.to(
                        images[1],
                        {
                            scale: 1.35,
                            duration: 1,
                        },
                        1.8
                    );

                    timeline.to(
                        images[1],
                        {
                            opacity: 0,
                            duration: 0.45,
                        },
                        2.6
                    );

                    timeline.fromTo(
                        images[2],
                        {
                            opacity: 0,
                            scale: 1.3,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                        },
                        2.6
                    );

                    timeline.to(
                        images[2],
                        {
                            scale: 1.18,
                            duration: 1,
                        },
                        3.4
                    );

                    if (progressRef.current) {
                        timeline.to(
                            progressRef.current,
                            {
                                scaleX: 1,
                                duration: 4.4,
                            },
                            0
                        );
                    }

                    return timeline;
                };

                mm.add("(min-width: 601px)", () => {
                    if (progressRef.current) {
                        gsap.set(progressRef.current, {
                            scaleX: 0,
                            transformOrigin: "left center",
                        });
                    }
                    createImageTimeline("+=440%");
                });

                mm.add("(max-width: 600px)", () => {
                    if (progressRef.current) {
                        gsap.set(progressRef.current, {
                            scaleX: 0,
                            transformOrigin: "left center",
                        });
                    }
                    createImageTimeline("+=300%");
                });

                return () => mm.revert();
            } catch (err) {
                console.warn("CallToAction GSAP init failed:", err);
            }
        },
        {
            scope: sectionRef,
            dependencies: [reduceMotion],
        }
    );

    const reveal = {
        hidden: {
            opacity: 0,
            y: 45,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section className="cta-section" ref={sectionRef}>
            <div className="cta-banner">

                {/* TRAVEL IMAGE SLIDES */}
                <div className="cta-image-wrapper">
                    {travelImages.map((image, index) => (
                        <div
                            className={`cta-background cta-background-${index + 1}`}
                            key={image.src}
                            ref={(element) => {
                                imageRefs.current[index] = element;
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    ))}
                </div>

                {/* DARK OVERLAY */}
                <div className="cta-overlay" />

                {/* DECORATIVE CIRCLE */}
                <motion.div
                    className="cta-decoration"
                    animate={
                        reduceMotion
                            ? undefined
                            : { rotate: 360 }
                    }
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <div className="cta-decoration-circle">
                        <Plane size={30} strokeWidth={1.2} />
                    </div>
                </motion.div>

                {/* MAIN CONTENT */}
                <div className="cta-content">

                        <motion.div
                            className="cta-eyebrow"
                            variants={reveal}
                            initial={reduceMotion ? false : "hidden"}
                            whileInView={reduceMotion ? undefined : "visible"}
                            viewport={{ once: true }}
                        >
                            Explore the World with RJ Groups
                        </motion.div>

                        <motion.h2
                            variants={reveal}
                            initial={reduceMotion ? false : "hidden"}
                            whileInView={reduceMotion ? undefined : "visible"}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.12,
                                duration: 0.9,
                            }}
                        >
                            Your Next Journey
                            <br />
                            Starts Here
                        </motion.h2>

                    <motion.p
                        className="cta-description"
                        variants={reveal}
                        initial={reduceMotion ? false : "hidden"}
                        whileInView={reduceMotion ? undefined : "visible"}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.25,
                            duration: 0.8,
                        }}
                    >
                        Dreaming of somewhere new? Let's make it happen.
                        Connect with RJ Groups and start planning a journey
                        worth remembering.
                    </motion.p>

                    <motion.div
                        className="cta-actions"
                        variants={reveal}
                        initial={reduceMotion ? false : "hidden"}
                        whileInView={reduceMotion ? undefined : "visible"}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.35,
                            duration: 0.8,
                        }}
                    >
                        <Link
                            to="/contact"
                            className="cta-primary-button"
                        >
                            <span>LET'S TALK ABOUT YOUR TRIP</span>

                            <span className="cta-button-icon">
                                <ArrowUpRight size={20} />
                            </span>
                        </Link>

                        <span className="cta-secondary-text">
                            YOUR JOURNEY. YOUR WAY.
                        </span>
                    </motion.div>
                </div>

                {/* SCROLL INDICATOR */}
                <div className="cta-scroll-indicator">
                    <span>SCROLL TO EXPLORE</span>
                    <ChevronDown size={17} />
                </div>

                {/* BOTTOM DETAILS */}
                <motion.div
                    className="cta-bottom"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    whileInView={
                        reduceMotion ? undefined : { opacity: 1 }
                    }
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.6,
                        duration: 1,
                    }}
                >
                    <span>RJ GROUPS</span>
                    <span>EXPLORE MORE. EXPERIENCE MORE.</span>
                    <MoveUpRight size={19} />
                </motion.div>

                {/* SCROLL PROGRESS */}
                <div className="cta-progress-track">
                    <div
                        className="cta-progress-bar"
                        ref={progressRef}
                    />
                </div>

            </div>
        </section>
    );
}
