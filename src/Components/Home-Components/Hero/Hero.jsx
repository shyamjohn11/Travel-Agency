
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const images = [
    "/images/hero/kashmir.jpg",
    "/images/hero/kerala.jpg",
    "/images/hero/dubai.jpg",
    "/images/hero/maldives.jpg",
];

export default function Hero() {
    const sectionRef = useRef(null);
    const slidesRef = useRef([]);

    // Refresh ScrollTrigger after images and layout initialize
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    useGSAP(
        () => {
            const slides = slidesRef.current.filter(Boolean);

            if (!slides.length) return;

            const mm = gsap.matchMedia();

            // Normal animation
            mm.add(
                "(prefers-reduced-motion: no-preference)",
                () => {
                    gsap.set(slides, {
                        scale: 1.15,
                        opacity: 0,
                    });

                    gsap.set(slides[0], {
                        scale: 1,
                        opacity: 1,
                    });

                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: "+=400%",
                            scrub: 1,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    images.forEach((_, index) => {
                        if (index === images.length - 1) return;

                        timeline.to(
                            slides[index],
                            {
                                scale: 1.4,
                                opacity: 0,
                                duration: 1,
                                ease: "none",
                            },
                            index
                        );

                        timeline.fromTo(
                            slides[index + 1],
                            {
                                scale: 1.2,
                                opacity: 0,
                            },
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 1,
                                ease: "none",
                            },
                            index
                        );
                    });

                    return () => {
                        timeline.scrollTrigger?.kill();
                        timeline.kill();
                    };
                }
            );

            // Reduced motion accessibility
            mm.add(
                "(prefers-reduced-motion: reduce)",
                () => {
                    gsap.set(slides, {
                        opacity: 0,
                        scale: 1,
                    });

                    gsap.set(slides[0], {
                        opacity: 1,
                    });
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
            className="travel-hero"
            ref={sectionRef}
        >
            {/* Background Images */}

            <div className="hero-backgrounds">
                {images.map((image, index) => (
                    <div
                        className="hero-slide"
                        key={image}
                        ref={(el) => {
                            slidesRef.current[index] = el;
                        }}
                    >
                        <img
                            src={image}
                            alt={`RJ Groups travel destination ${index + 1}`}
                            loading={index === 0 ? "eager" : "lazy"}
                            fetchPriority={index === 0 ? "high" : "auto"}
                        />
                    </div>
                ))}
            </div>

            {/* Cinematic Overlay */}

            <div className="hero-overlay" />

            {/* Hero Content */}

            <div className="hero-content">
                <h1 className="hero-slogan">
                    Connecting Opportunities.
                    <span> Creating Futures.</span>
                </h1>

                <a
                    href="/packages"
                    className="hero-button"
                >
                    Explore Packages
                    <ArrowUpRight size={16} />
                </a>
            </div>
        </section>
    );
}
