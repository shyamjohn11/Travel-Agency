
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
    Globe2,
    Users,
    Headset,
    ShieldCheck,
    Compass,
    Plane,
    ArrowUpRight,
} from "lucide-react";

import "./CompanyHighlights.css";

gsap.registerPlugin(ScrollTrigger);

const statistics = [
    {
        value: 12,
        suffix: "+",
        label: "Years of Experience",
        description: "Creating memorable travel experiences.",
        image: "/images/highlight-experience.jpg",
        icon: Compass,
    },
    {
        value: 25,
        suffix: "+",
        label: "Destinations",
        description: "Explore incredible places around the world.",
        image: "/images/highlight-destinations.jpg",
        icon: Globe2,
    },
    {
        value: 500,
        suffix: "+",
        label: "Happy Travellers",
        description: "Building beautiful memories with every journey.",
        image: "/images/highlight-travellers.jpg",
        icon: Users,
    },
    {
        value: 24,
        suffix: "/7",
        label: "Travel Assistance",
        description: "We are always here whenever you need us.",
        image: "/images/highlight-support.jpg",
        icon: Headset,
    },
];

const trustFeatures = [
    {
        number: "01",
        icon: ShieldCheck,
        title: "Trusted Travel Planning",
        description:
            "Travel with confidence through carefully planned journeys and reliable travel assistance.",
        image: "/images/trust-planning.jpg",
    },
    {
        number: "02",
        icon: Compass,
        title: "Personalised Experiences",
        description:
            "Every journey is designed around your interests, preferences and travel goals.",
        image: "/images/trust-experience.jpg",
    },
    {
        number: "03",
        icon: Plane,
        title: "Support Throughout",
        description:
            "From planning your trip to reaching your destination, we are here to help.",
        image: "/images/trust-support.jpg",
    },
];

const CompanyHighlights = () => {
    const sectionRef = useRef(null);
    const numberRefs = useRef([]);

    useGSAP(
        () => {
            const reveal = (selector, options = {}) => {
                gsap.from(selector, {
                    y: 35,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: selector,
                        start: "top 88%",
                        once: true,
                    },
                    ...options,
                });
            };

            reveal(".highlights-eyebrow", { y: 20 });
            reveal(".highlights-title-line", {
                y: 40,
                duration: 0.9,
                stagger: 0.12,
            });
            reveal(".highlights-description", { y: 20 });
            reveal(".stat-card", {
                y: 50,
                scale: 0.97,
                stagger: 0.12,
            });
            reveal(".trust-heading", { y: 30 });
            reveal(".trust-card", {
                y: 50,
                scale: 0.97,
                stagger: 0.15,
            });

            numberRefs.current.forEach((element, index) => {
                if (!element) return;

                const counter = { value: 0 };

                gsap.to(counter, {
                    value: statistics[index].value,
                    duration: 1.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        once: true,
                    },
                    onUpdate: () => {
                        element.textContent = Math.round(counter.value).toLocaleString(
                            "en-IN"
                        );
                    },
                });
            });

            gsap.from(".highlights-bottom-line", {
                scaleX: 0,
                transformOrigin: "left",
                duration: 1,
                scrollTrigger: {
                    trigger: ".highlights-bottom-line",
                    start: "top 95%",
                    once: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section className="company-highlights" ref={sectionRef}>
            <div className="highlights-container">

                {/* SECTION HEADING */}
                <div className="highlights-heading">
                    <div className="highlights-eyebrow">
                        <span className="eyebrow-line" />
                        <span>RJ GROUPS AT A GLANCE</span>
                        <span className="eyebrow-line" />
                    </div>

                    <h2 className="highlights-title">
                        <span className="highlights-title-line">
                            Making Every Journey
                        </span>

                        <span className="highlights-title-line">
                            <span className="orange-text">Extraordinary.</span>
                        </span>
                    </h2>

                    <p className="highlights-description">
                        We bring people closer to the world through thoughtfully planned
                        journeys, personalised experiences and dependable travel support.
                    </p>
                </div>

                {/* STATISTICS CARDS */}
                <div className="statistics-grid">
                    {statistics.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <article
                                className="stat-card image-motion-card"
                                key={item.label}
                            >
                                <img
                                    className="motion-card-image"
                                    src={item.image}
                                    alt={item.label}
                                    loading="lazy"
                                />

                                <div className="motion-card-overlay" />

                                <div className="motion-card-top">
                                    <div className="motion-card-icon">
                                        <Icon size={19} strokeWidth={1.7} />
                                    </div>

                                    <span className="motion-card-index">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="stat-card-content">
                                    <div className="stat-number-wrapper">
                                        <span
                                            className="stat-number"
                                            ref={(element) => {
                                                numberRefs.current[index] = element;
                                            }}
                                        >
                                            0
                                        </span>

                                        <span className="stat-suffix">
                                            {item.suffix}
                                        </span>
                                    </div>

                                    <h3>{item.label}</h3>

                                    <div className="motion-card-details">
                                        <p>{item.description}</p>
                                        <span className="motion-card-line" />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* WHY CHOOSE US */}
                <div className="trust-section">
                    <div className="trust-heading">
                        <div>
                            <span className="trust-eyebrow">
                                WHY CHOOSE US
                            </span>

                            <h2>
                                Travel with{" "}
                                <span className="orange-text">confidence.</span>
                            </h2>
                        </div>

                        <p>
                            More than just a travel company. Your journey partner from
                            beginning to end.
                        </p>
                    </div>

                    {/* TRUST CARDS */}
                    <div className="trust-grid">
                        {trustFeatures.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    className="trust-card image-motion-card"
                                    key={item.number}
                                >
                                    <img
                                        className="motion-card-image"
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                    />

                                    <div className="motion-card-overlay" />

                                    <div className="motion-card-top">
                                        <div className="motion-card-icon">
                                            <Icon size={20} strokeWidth={1.7} />
                                        </div>

                                        <span className="motion-card-index">
                                            {item.number}
                                        </span>
                                    </div>

                                    <div className="trust-card-content">
                                        <h3>{item.title}</h3>

                                        <div className="motion-card-details">
                                            <p>{item.description}</p>

                                            <div className="trust-card-footer">
                                                <span>DISCOVER MORE</span>
                                                <ArrowUpRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className="highlights-bottom-line" />

            </div>
        </section>
    );
};

export default CompanyHighlights;
