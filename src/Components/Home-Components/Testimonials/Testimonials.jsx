import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    Quote,
    Star,
    ArrowUpRight,
    MapPin,
    Plane,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

// Real customer testimonials need to be provided by the business.
// Placeholder testimonials have been removed for production.
// To add real testimonials, replace this array with verified customer data.
const reviews = [];

function StarRating({ rating, size = 15 }) {
    return (
        <div
            className="testimonial-stars"
            aria-label={`${rating} out of 5 stars`}
        >
            {Array.from({ length: rating }, (_, index) => (
                <Star
                    key={index}
                    size={size}
                    fill="currentColor"
                    strokeWidth={1.5}
                />
            ))}
        </div>
    );
}

export default function Testimonials() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const reduceMotion = useReducedMotion();

    const activeReview = reviews[activeIndex];

    useGSAP(
        () => {
            const cards = cardRefs.current.filter(Boolean);

            if (!cards.length) return;

            if (reduceMotion) {
                gsap.set(cards, {
                    opacity: 1,
                    y: 0,
                    clearProps: "transform",
                });

                return;
            }

            const mm = gsap.matchMedia();

            // DESKTOP AND TABLET
            mm.add("(min-width: 601px)", () => {
                cards.forEach((card, index) => {
                    gsap.fromTo(
                        card,
                        {
                            opacity: 0.45,
                            y: 65,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                end: "top 45%",
                                scrub: 1,
                                onEnter: () => setActiveIndex(index),
                                onEnterBack: () => setActiveIndex(index),
                            },
                        }
                    );
                });
            });

            // MOBILE
            mm.add("(max-width: 600px)", () => {
                cards.forEach((card, index) => {
                    gsap.fromTo(
                        card,
                        {
                            opacity: 0.5,
                            y: 45,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                end: "top 55%",
                                scrub: 0.8,
                                onEnter: () => setActiveIndex(index),
                                onEnterBack: () => setActiveIndex(index),
                            },
                        }
                    );
                });
            });

            return () => mm.revert();
        },
        {
            scope: sectionRef,
            dependencies: [reduceMotion],
        }
    );

    // If no reviews are provided, do not render the section.
    if (!reviews || reviews.length === 0) {
        return null;
    }

    return (
        <section
            className="testimonials-section"
            ref={sectionRef}
        >
            <div className="testimonials-container">

                {/* SECTION HEADING */}

                <motion.div
                    className="testimonials-heading"
                    initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                    whileInView={
                        reduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <div className="testimonials-eyebrow">
                        <span />
                        TRAVELLER STORIES
                    </div>

                    <div className="testimonials-heading-row">
                        <h2>
                            STORIES FROM
                            <br />
                            <span>OUR TRAVELLERS.</span>
                        </h2>

                        <p>
                            Every journey has a story.
                            <br />
                            Discover experiences worth remembering.
                        </p>
                    </div>
                </motion.div>

                {/* SPLIT SCROLL LAYOUT */}

                <div className="testimonials-showcase">

                    {/* LEFT STICKY IMAGE PANEL */}

                    <div className="testimonial-visual-column">
                        <div className="testimonial-visual-sticky">

                            <div className="testimonial-visual">

                                {/* BACKGROUND IMAGE */}

                                <AnimatePresence mode="sync">
                                    <motion.img
                                        key={activeReview.image}
                                        className="testimonial-visual-image"
                                        src={activeReview.image}
                                        alt={activeReview.imageAlt}
                                        initial={
                                            reduceMotion
                                                ? false
                                                : {
                                                        opacity: 0,
                                                        scale: 1.2,
                                                    }
                                        }
                                        animate={{
                                            opacity: 1,
                                            scale: reduceMotion ? 1 : 1.06,
                                        }}
                                        exit={
                                            reduceMotion
                                                ? undefined
                                                : {
                                                        opacity: 0,
                                                        scale: 1.12,
                                                    }
                                        }
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.9,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />
                                </AnimatePresence>

                                <div className="testimonial-visual-overlay" />

                                {/* BRAND LOGO */}

                                <div className="testimonial-brand">
                                    <div className="testimonial-brand-logo">
                                        <img
                                            src="/images/rj-groups-logo.png"
                                            alt="RJ Groups logo"
                                        />
                                    </div>

                                    <div className="testimonial-brand-name">
                                        <strong>RJ GROUPS</strong>
                                        <span>CONSULTANCY & TRAVEL</span>
                                    </div>
                                </div>

                                {/* VISUAL CONTENT */}

                                <div className="testimonial-visual-content">

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeReview.id}
                                            className="testimonial-active-content"
                                            initial={
                                                reduceMotion
                                                    ? false
                                                    : {
                                                            opacity: 0,
                                                            y: 35,
                                                        }
                                        }
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={
                                            reduceMotion
                                                ? undefined
                                                : {
                                                        opacity: 0,
                                                        y: -20,
                                                    }
                                        }
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.55,
                                            ease: "easeOut",
                                        }}
                                        >
                                            <div className="testimonial-active-category">
                                                <span />
                                                {activeReview.category}
                                            </div>

                                            <div className="testimonial-active-quote">
                                                <Quote
                                                    size={38}
                                                    fill="currentColor"
                                                />
                                            </div>

                                            <StarRating
                                                rating={activeReview.rating}
                                                size={17}
                                            />

                                            <p className="testimonial-active-review">
                                                “{activeReview.review}”
                                            </p>

                                            <div className="testimonial-active-customer">
                                                <div className="testimonial-active-avatar">
                                                    {activeReview.initials}
                                                </div>

                                                <div>
                                                    <h3>{activeReview.name}</h3>

                                                    <span>
                                                        <MapPin size={13} />
                                                        {activeReview.location}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="testimonial-active-trip">
                                                <Plane size={15} />
                                                {activeReview.trip}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                </div>

                                {/* IMAGE FOOTER */}

                                <div className="testimonial-visual-footer">
                                    <span>REAL JOURNEYS. SHARED STORIES.</span>

                                    <span className="testimonial-counter">
                                        {String(activeIndex + 1).padStart(2, "0")}
                                        <span> / </span>
                                        {String(reviews.length).padStart(2, "0")}
                                    </span>
                                </div>

                            </div>

                            {/* PROGRESS */}

                            <div className="testimonial-progress">
                                {reviews.map((item, index) => (
                                    <button
                                        type="button"
                                        key={item.id}
                                        className={
                                            activeIndex === index
                                                ? "testimonial-progress-item active"
                                                : "testimonial-progress-item"
                                        }
                                        onClick={() => {
                                            setActiveIndex(index);

                                            const card = cardRefs.current[index];

                                            card?.scrollIntoView({
                                                behavior: reduceMotion
                                                    ? "auto"
                                                    : "smooth",
                                                block: "center",
                                            });
                                        }}
                                        aria-label={`View testimonial ${index + 1}`}
                                    >
                                        <span />
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SCROLLING TESTIMONIAL CARDS */}

                    <div className="testimonials-list">

                        <div className="testimonials-list-heading">
                            <span>01 — 03</span>
                            <span>SCROLL TO EXPLORE STORIES</span>
                        </div>

                        {reviews.map((item, index) => (
                            <article
                                key={item.id}
                                ref={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                                className={`testimonial-card ${activeIndex === index
                                    ? "testimonial-card-active"
                                    : ""
                                    }`}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <div className="testimonial-card-top">
                                    <span className="testimonial-card-number">
                                        0{index + 1}
                                    </span>

                                    <StarRating rating={item.rating} />
                                </div>

                                <div className="testimonial-card-category">
                                    {item.category}
                                </div>

                                <h3 className="testimonial-card-title">
                                    {item.trip}
                                </h3>

                                <p className="testimonial-review">
                                    “{item.review}”
                                </p>

                                <div className="testimonial-divider" />

                                <div className="testimonial-customer">

                                    <div className="testimonial-avatar">
                                        {item.initials}
                                    </div>

                                    <div className="testimonial-customer-info">
                                        <h4>{item.name}</h4>

                                        <span>{item.location}</span>
                                    </div>

                                    <div className="testimonial-card-arrow">
                                        <ArrowUpRight size={21} />
                                    </div>
                                </div>

                                {activeIndex === index && (
                                    <motion.div
                                        className="testimonial-active-line"
                                        layoutId="testimonial-active-line"
                                        transition={{
                                            duration: 0.35,
                                        }}
                                    />
                                )}
                            </article>
                        ))}
                        <div className="testimonial-list-end">
                            <span />
                            MORE STORIES. MORE MEMORIES.
                        </div>

                    </div>

                </div>

                {/* BOTTOM CTA */}

                <motion.div
                    className="testimonials-bottom"
                    initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={
                        reduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                    }}
                >
                    <div>
                        <span className="testimonials-bottom-label">
                            YOUR STORY COULD BE NEXT
                        </span>

                        <h3>
                            Ready to make your
                            <span> own memories?</span>
                        </h3>
                    </div>

                    <Link
                        to="/contact"
                        className="testimonials-cta"
                    >
                        <span>PLAN YOUR JOURNEY</span>
                        <ArrowUpRight size={19} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
