
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    Globe2,
    Headset,
    ShieldCheck,
    Compass,
    Sparkles,
    Handshake,
    ArrowUpRight,
} from "lucide-react";

import "./WhyChooseUs.css";

gsap.registerPlugin(ScrollTrigger);

const advantages = [
    {
        id: "01",
        title: "All-in-One Solutions",
        description:
            "Travel, recruitment, ticket booking and business assistance — explore multiple services in one place.",
        category: "EVERYTHING IN ONE PLACE",
        image:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=90",
        icon: Globe2,
    },
    {
        id: "02",
        title: "Customer-Focused",
        description:
            "We take time to understand your needs and help you explore solutions that suit your requirements.",
        category: "YOU COME FIRST",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=90",
        icon: Headset,
    },
    {
        id: "03",
        title: "Reliable Assistance",
        description:
            "Get helpful guidance, clear communication and practical assistance throughout your service experience.",
        category: "HERE TO HELP",
        image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=90",
        icon: ShieldCheck,
    },
    {
        id: "04",
        title: "Personalised Planning",
        description:
            "Explore travel and service options shaped around your preferences, schedule and expectations.",
        category: "MADE AROUND YOU",
        image:
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=90",
        icon: Compass,
    },
    {
        id: "05",
        title: "Convenient Experience",
        description:
            "Discover different service categories through one convenient point of contact.",
        category: "A SIMPLER EXPERIENCE",
        image:
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=90",
        icon: Sparkles,
    },
    {
        id: "06",
        title: "A Helpful Partnership",
        description:
            "Build a relationship with a team that values attentive service and clear communication.",
        category: "MOVING FORWARD TOGETHER",
        image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=90",
        icon: Handshake,
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardRefs = useRef([]);

    useGSAP(
        () => {
            const cards = cardRefs.current.filter(Boolean);
            const heading = headingRef.current;

            if (!cards.length) return;

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (reduceMotion) {
                gsap.set([heading, ...cards], {
                    autoAlpha: 1,
                    clearProps: "transform",
                });
                return;
            }

            // Heading entrance
            gsap.fromTo(
                heading,
                {
                    autoAlpha: 0,
                    y: 55,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 88%",
                        once: true,
                    },
                }
            );

            // Cards arrive sequentially from different directions
            const entranceDirections = [
                { x: -110, y: 100, rotation: -9 },
                { x: 0, y: 130, rotation: 7 },
                { x: 110, y: 90, rotation: 10 },
                { x: -100, y: 110, rotation: 8 },
                { x: 0, y: 140, rotation: -8 },
                { x: 100, y: 100, rotation: 9 },
            ];

            cards.forEach((card, index) => {
                const direction =
                    entranceDirections[index % entranceDirections.length];

                const image = card.querySelector(".why-card-image");
                const content = card.querySelector(".why-card-content");
                const icon = card.querySelector(".why-card-icon");

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 94%",
                        end: "top 52%",
                        scrub: 1.15,
                    },
                });

                timeline.fromTo(
                    card,
                    {
                        autoAlpha: 0,
                        x: direction.x,
                        y: direction.y,
                        rotate: direction.rotation,
                        scale: 0.78,
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        ease: "power2.out",
                        duration: 1,
                    }
                );

                if (image) {
                    timeline.fromTo(
                        image,
                        { scale: 1.18 },
                        { scale: 1, ease: "power2.out", duration: 1 },
                        "<"
                    );
                }

                if (content) {
                    timeline.fromTo(
                        content,
                        { y: 28, autoAlpha: 0.4 },
                        { y: 0, autoAlpha: 1, duration: 0.65 },
                        0.25
                    );
                }

                if (icon) {
                    timeline.fromTo(
                        icon,
                        { rotate: -35, scale: 0.5 },
                        { rotate: 0, scale: 1, duration: 0.5 },
                        0.3
                    );
                }
            });

            // Small floating movement on decorative card icons
            cards.forEach((card, index) => {
                const icon = card.querySelector(".why-card-icon");
                if (!icon) return;

                gsap.to(icon, {
                    y: index % 2 === 0 ? -5 : 5,
                    duration: 2.2 + index * 0.12,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });
        },
        {
            scope: sectionRef,
        }
    );

    return (
        <section className="why-choose-section" ref={sectionRef}>
            <div className="why-choose-container">
                {/* SECTION HEADING */}
                <div className="why-heading" ref={headingRef}>
                    <div className="why-heading-left">
                        <span className="why-eyebrow">
                            <span className="why-eyebrow-line" />
                            THE RJ GROUPS DIFFERENCE
                        </span>

                        <h2>
                            More Than Services.
                            <br />
                            <span>We Make It Simple.</span>
                        </h2>
                    </div>

                    <div className="why-heading-right">
                        <p>
                            Discover a more convenient way to access travel, career and
                            business services. Here is what makes the RJ Groups experience
                            different.
                        </p>

                        <a href="/about" className="why-heading-link">
                            ABOUT RJ GROUPS
                            <ArrowUpRight size={17} />
                        </a>
                    </div>
                </div>

                {/* ASYMMETRICAL IMAGE CARD GRID */}
                <div className="why-card-grid">
                    {advantages.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <article
                                className={`why-image-card why-card-position-${index + 1}`}
                                key={item.id}
                                ref={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="why-card-image"
                                    loading="lazy"
                                />

                                <div className="why-card-gradient" />

                                <div className="why-card-top">
                                    <span className="why-card-number">{item.id}</span>

                                    <div className="why-card-icon">
                                        <Icon size={19} strokeWidth={1.8} />
                                    </div>
                                </div>

                                <div className="why-card-content">
                                    <span className="why-card-category">
                                        {item.category}
                                    </span>

                                    <h3>{item.title}</h3>

                                    <p>{item.description}</p>

                                    <div className="why-card-bottom">
                                        <span>RJ GROUPS</span>
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>

                                <div className="why-card-hover-indicator">
                                    <ArrowUpRight size={21} />
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* BOTTOM STATEMENT */}
                <div className="why-bottom">
                    <span className="why-bottom-line" />

                    <p>
                        DIFFERENT SERVICES. ONE PLACE.
                        <span> ONE COMMITMENT.</span>
                    </p>

                    <span className="why-bottom-line" />
                </div>
            </div>
        </section>
    );
}
