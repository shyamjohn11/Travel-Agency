
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, MapPin } from "lucide-react";

import { useShaped } from "../../../hooks/useLegacyShape";
import "./TravelPackages.css";

gsap.registerPlugin(ScrollTrigger);

// =========================================
// DESTINATION DATA
// =========================================



// =========================================
// MAIN COMPONENT
// =========================================

export default function TravelPackages() {
    const destinations = useShaped({ featured: true, limit: 6 }, "travel");
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(
        () => {
            const cards = cardsRef.current.filter(Boolean);
            const grid = gridRef.current;

            if (!grid || !cards.length) return;

            const heading = sectionRef.current.querySelector(
                ".packages-heading-content"
            );

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            // =====================================
            // HEADING ANIMATION
            // =====================================

            gsap.fromTo(
                heading,
                {
                    opacity: 0,
                    y: 45,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 78%",
                        once: true,
                    },
                }
            );

            // =====================================
            // REDUCED MOTION
            // =====================================

            if (reduceMotion) {
                gsap.set(cards, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                });

                return;
            }

            // =====================================
            // MOBILE ANIMATION
            // =====================================

            const media = gsap.matchMedia();

            media.add("(max-width: 550px)", () => {
                gsap.set(cards, {
                    opacity: 0,
                    y: 100,
                    scale: 0.94,
                });

                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 85%",
                        end: "bottom 60%",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
            });

            // =====================================
            // TABLET AND DESKTOP ANIMATION
            // =====================================

            media.add("(min-width: 551px)", () => {
                const getStartPosition = (card) => {
                    const gridWidth = grid.clientWidth;
                    const gridHeight = grid.offsetHeight;

                    const cardWidth = card.offsetWidth;
                    const cardHeight = card.offsetHeight;

                    const cardLeft = card.offsetLeft;
                    const cardTop = card.offsetTop;

                    const cardCenterX = cardLeft + cardWidth / 2;
                    const cardCenterY = cardTop + cardHeight / 2;

                    return {
                        x: gridWidth / 2 - cardCenterX,
                        y: gridHeight + 260 - cardCenterY,
                    };
                };

                // Place all cards at the bottom-centre starting position.
                cards.forEach((card) => {
                    const position = getStartPosition(card);

                    gsap.set(card, {
                        opacity: 0,
                        x: position.x,
                        y: position.y,
                        scale: 0.72,
                        rotation: 3,
                        transformOrigin: "center center",
                    });
                });

                // Sequential scroll-driven animation.
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 85%",
                        end: "bottom 35%",
                        scrub: 1.4,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card, index) => {
                    timeline.to(
                        card,
                        {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotation: 0,
                            duration: 1,
                            ease: "power3.out",
                        },
                        index * 0.48
                    );
                });
            });

            return () => media.revert();
        },
        {
            scope: sectionRef,
            dependencies: [],
        }
    );

    return (
        <section
            className="travel-packages-section"
            ref={sectionRef}
        >
            <div className="packages-container">

                {/* SECTION HEADING */}

                <div className="packages-heading">

                    <div className="packages-heading-content">

                        <span className="packages-eyebrow">
                            <span className="packages-eyebrow-line" />
                            EXPLORE THE WORLD WITH US
                        </span>

                        <h2>
                            TRAVEL <span>PACKAGES</span>
                        </h2>

                        <p>
                            From peaceful escapes to exciting city adventures,
                            discover destinations that make every journey special.
                        </p>

                    </div>

                    <Link
                        to="/packages"
                        className="packages-view-all"
                    >
                        <span>VIEW ALL PACKAGES</span>
                        <ArrowUpRight size={19} />
                    </Link>

                </div>

                {/* DESTINATION GRID */}

                <div
                    className="packages-grid"
                    ref={gridRef}
                >

                    {destinations.map((destination, index) => (
                        <article
                            className="destination-card"
                            key={destination.id}
                            ref={(element) => {
                                cardsRef.current[index] = element;
                            }}
                        >

                            {/* DESTINATION IMAGE */}

                            <img
                                src={destination.image}
                                alt={`${destination.name} travel destination`}
                                className="destination-image"
                                loading="lazy"
                            />

                            {/* IMAGE OVERLAY */}

                            <div className="destination-overlay" />

                            {/* TOP CONTENT */}

                            <div className="destination-card-top">

                                <span className="destination-number">
                                    {destination.number}
                                </span>

                                <span className="destination-location">
                                    <MapPin size={13} />
                                    {destination.country}
                                </span>

                            </div>

                            {/* BOTTOM CONTENT */}

                            <div className="destination-content">

                                <span className="destination-category">
                                    {destination.category}
                                </span>

                                <h3>{destination.name}</h3>

                                <p>{destination.description}</p>

                                <Link
                                    to={`/package/${destination.slug}`}
                                    className="destination-explore"
                                    aria-label={`Explore ${destination.name} packages`}
                                >

                                    <span>{destination.duration}</span>

                                    <span className="destination-arrow">
                                        <ArrowUpRight size={19} />
                                    </span>

                                </Link>

                            </div>

                        </article>
                    ))}

                </div>

                {/* BOTTOM CTA */}

                <div className="packages-bottom">

                    <p>
                        YOUR NEXT ADVENTURE IS WAITING.
                        <span> LET'S PLAN IT TOGETHER.</span>
                    </p>

                    <Link
                        to="/contact"
                        className="packages-contact-link"
                    >
                        PLAN YOUR TRIP
                        <ArrowUpRight size={18} />
                    </Link>

                </div>

            </div>
        </section>
    );
}
