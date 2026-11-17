
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "./PackageHero.css";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
    {
        src: "/images/packages-hero.jpg",
        alt: "Maldives tropical island and clear blue ocean",
        number: "01",
        location: "MALDIVES",
        category: "BEACH HOLIDAYS",
        title: "Discover",
        accent: "Maldives.",
        description: "Relax on beautiful beaches and enjoy crystal-clear waters.",
        button: "VIEW PACKAGE",
    },
    {
        src: "/images/packages-hero-02.jpg",
        alt: "Swiss mountains and scenic landscape",
        number: "02",
        location: "SWITZERLAND",
        category: "MOUNTAIN TOURS",
        title: "Explore",
        accent: "Switzerland.",
        description: "Experience stunning mountains and unforgettable views.",
        button: "VIEW PACKAGE",
    },
    {
        src: "/images/packages-hero-03.jpg",
        alt: "Dubai skyline and modern architecture",
        number: "03",
        location: "DUBAI",
        category: "CITY HOLIDAYS",
        title: "Experience",
        accent: "Dubai.",
        description: "Discover iconic landmarks, luxury and city adventures.",
        button: "VIEW PACKAGE",
    },
    {
        src: "/images/packages-hero-04.jpg",
        alt: "Bali tropical beach holiday",
        number: "04",
        location: "BALI",
        category: "LUXURY GETAWAYS",
        title: "Escape To",
        accent: "Bali.",
        description: "Enjoy peaceful beaches, nature and relaxing stays.",
        button: "VIEW PACKAGE",
    },
];

export default function PackagesHero() {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const images = gsap.utils.toArray(
                section.querySelectorAll(".packages-hero-image")
            );

            const captions = gsap.utils.toArray(
                section.querySelectorAll(".packages-slide-content")
            );

            const blackout = section.querySelector(".packages-hero-blackout");
            const top = section.querySelector(".packages-hero-top");
            const bottom = section.querySelector(".packages-hero-bottom");

            if (!images.length || !blackout) return;

            // Reduced-motion fallback: show the first destination.
            if (reduceMotion) {
                gsap.set(images, { autoAlpha: 0, scale: 1 });
                gsap.set(captions, { autoAlpha: 0, y: 0 });
                gsap.set(images[0], { autoAlpha: 1 });
                gsap.set(captions[0], { autoAlpha: 1 });
                gsap.set(blackout, { autoAlpha: 0 });
                return;
            }

            const mm = gsap.matchMedia();

            const createSequence = (scrollDistance) => {
                gsap.set(images, {
                    autoAlpha: 0,
                    scale: 1.7,
                    transformOrigin: "center center",
                    force3D: true,
                });

                gsap.set(images[0], {
                    autoAlpha: 1,
                    scale: 1.05,
                });

                gsap.set(captions, {
                    autoAlpha: 0,
                    y: 35,
                });

                gsap.set(captions[0], {
                    autoAlpha: 1,
                    y: 0,
                });

                gsap.set(blackout, { autoAlpha: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: scrollDistance,
                        scrub: 0.8,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Hide the top and bottom details as the sequence begins.
                tl.to(
                    [top, bottom],
                    {
                        autoAlpha: 0,
                        duration: 0.4,
                        ease: "none",
                    },
                    0
                );

                images.forEach((image, index) => {
                    const caption = captions[index];

                    // Keep the final slide visible.
                    if (index === images.length - 1) {
                        tl.to(image, {
                            scale: 1.35,
                            duration: 1,
                            ease: "none",
                        });

                        return;
                    }

                    // Slowly zoom into the current destination.
                    tl.to(image, {
                        scale: 1.4,
                        duration: 0.8,
                        ease: "none",
                    });

                    // Move the current package text away.
                    tl.to(
                        caption,
                        {
                            autoAlpha: 0,
                            y: -30,
                            duration: 0.25,
                            ease: "power2.in",
                        },
                        "<0.4"
                    );

                    // Zoom into the image for the transition.
                    tl.to(image, {
                        scale: 3.4,
                        autoAlpha: 0,
                        duration: 0.4,
                        ease: "power2.in",
                    });

                    // Cover the screen with black.
                    tl.to(
                        blackout,
                        {
                            autoAlpha: 1,
                            duration: 0.2,
                            ease: "none",
                        },
                        "<0.08"
                    );

                    const nextImage = images[index + 1];
                    const nextCaption = captions[index + 1];

                    // Prepare the next destination.
                    tl.set(nextImage, {
                        autoAlpha: 1,
                        scale: 1.8,
                    });

                    tl.set(nextCaption, {
                        autoAlpha: 0,
                        y: 35,
                    });

                    // Reveal the next image with a zoom-out effect.
                    tl.to(nextImage, {
                        scale: 1.05,
                        duration: 0.8,
                        ease: "power2.out",
                    });

                    tl.to(
                        blackout,
                        {
                            autoAlpha: 0,
                            duration: 0.5,
                            ease: "none",
                        },
                        "<"
                    );

                    // Reveal the next package content.
                    tl.to(
                        nextCaption,
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power3.out",
                        },
                        "<0.12"
                    );
                });

                return tl;
            };

            mm.add("(min-width: 769px)", () => {
                const timeline = createSequence("+=450%");
                return () => {
                    timeline.scrollTrigger?.kill();
                    timeline.kill();
                };
            });

            mm.add("(max-width: 768px)", () => {
                const timeline = createSequence("+=350%");
                return () => {
                    timeline.scrollTrigger?.kill();
                    timeline.kill();
                };
            });

            return () => mm.revert();
        },
        {
            scope: sectionRef,
            dependencies: [reduceMotion],
            revertOnUpdate: true,
        }
    );

    return (
        <section className="packages-hero" ref={sectionRef}>
            {/* Background destination images */}
            <div className="packages-hero-background">
                {heroSlides.map((slide, index) => (
                    <img
                        key={slide.src}
                        className="packages-hero-image"
                        src={slide.src}
                        alt={slide.alt}
                        loading="eager"
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "auto"}
                        draggable="false"
                    />
                ))}

                <div className="packages-hero-overlay" />
                <div className="packages-hero-vignette" />
                <div className="packages-hero-blackout" />
            </div>

            {/* Top information */}
            <div className="packages-hero-top">
                <div className="packages-hero-brand">
                    <MapPin size={15} />
                    <span>RJ GROUPS</span>
                    <span className="packages-brand-divider">/</span>
                    <span>TRAVEL COLLECTION</span>
                </div>

                <span className="packages-hero-index">
                    CURATED JOURNEYS · 2026
                </span>
            </div>

            {/* Destination content */}
            <div className="packages-slides-container">
                {heroSlides.map((slide) => (
                    <div className="packages-slide-content" key={slide.number}>
                        <div className="packages-slide-category">
                            <span className="packages-category-line" />
                            <span>{slide.category}</span>
                        </div>

                        <div className="packages-slide-location">
                            <MapPin size={14} />
                            <span>{slide.location}</span>
                            <span className="packages-slide-number">
                                {slide.number} / 04
                            </span>
                        </div>

                        <h1 className="packages-slide-title">
                            <span>{slide.title}</span>
                            <span className="packages-slide-accent">
                                {slide.accent}
                            </span>
                        </h1>

                        <p className="packages-slide-description">
                            {slide.description}
                        </p>

                        <Link
                            to="/packages#all-packages"
                            className="packages-hero-button"
                        >
                            <span>{slide.button}</span>
                            <span className="packages-button-icon">
                                <ArrowUpRight size={18} />
                            </span>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Bottom information */}
            <div className="packages-hero-bottom">
                <div className="packages-bottom-label">
                    <span className="packages-bottom-dot" />
                    <span>YOUR JOURNEY STARTS HERE</span>
                </div>

                <div className="packages-scroll-hint">
                    <span>SCROLL TO EXPLORE</span>
                    <ArrowDown size={16} />
                </div>

                <span className="packages-bottom-brand">RJ GROUPS</span>
            </div>
        </section>
    );
}
