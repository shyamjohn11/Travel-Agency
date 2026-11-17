
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    ArrowDownRight,
    ArrowUpRight,
    Compass,
    Globe2,
    HeartHandshake,
    Plane,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./AboutRJGroups.css";

gsap.registerPlugin(ScrollTrigger);

const storyItems = [
    {
        number: "01",
        icon: Compass,
        label: "WHO WE ARE",
        title: "Every journey starts with a good plan.",
        description:
            "RJ Groups is a travel and consultancy brand focused on helping people explore opportunities and discover destinations with confidence. We bring planning, guidance and travel support together in one place.",
    },
    {
        number: "02",
        icon: Globe2,
        label: "WHAT WE DO",
        title: "Making the world easier to explore.",
        description:
            "From travel planning and holiday packages to personalised trip arrangements, our goal is to make every step of your journey simpler, more organised and more enjoyable.",
    },
    {
        number: "03",
        icon: HeartHandshake,
        label: "OUR APPROACH",
        title: "People come first. Always.",
        description:
            "We believe every traveller has different expectations. That's why we focus on understanding individual needs, offering thoughtful guidance and creating experiences around each traveller.",
    },
];

export default function AboutRJGroups() {
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const mm = gsap.matchMedia();

            // Desktop scroll animation
            mm.add(
                "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
                () => {
                    const heading = section.querySelector(".about-heading");
                    const visual = section.querySelector(".about-visual");
                    const image = section.querySelector(".about-image");
                    const intro = section.querySelector(".about-intro");
                    const items = gsap.utils.toArray(
                        ".about-story-item",
                        section
                    );

                    // Heading entrance
                    gsap.from(heading, {
                        y: 55,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: heading,
                            start: "top 85%",
                            once: true,
                        },
                    });

                    // Image entrance
                    gsap.from(visual, {
                        y: 50,
                        scale: 0.94,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: visual,
                            start: "top 85%",
                            once: true,
                        },
                    });

                    // Image parallax
                    gsap.to(image, {
                        scale: 1.13,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    });

                    // Intro entrance
                    gsap.from(intro, {
                        y: 45,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: intro,
                            start: "top 85%",
                            once: true,
                        },
                    });

                    // Layered story cards
                    items.forEach((item) => {
                        const content = item.querySelector(
                            ".about-story-content"
                        );

                        // Reveal each card as it enters
                        gsap.fromTo(
                            content,
                            {
                                y: 70,
                                opacity: 0,
                            },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.9,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: item,
                                    start: "top 85%",
                                    once: true,
                                },
                            }
                        );

                        // Active story state
                        ScrollTrigger.create({
                            trigger: item,
                            start: "top 45%",
                            end: "bottom 45%",
                            onEnter: () => {
                                items.forEach((story) =>
                                    story.classList.remove("is-active")
                                );
                                item.classList.add("is-active");
                            },
                            onEnterBack: () => {
                                items.forEach((story) =>
                                    story.classList.remove("is-active")
                                );
                                item.classList.add("is-active");
                            },
                        });
                    });

                    // Last story remains active near the end
                    ScrollTrigger.create({
                        trigger: items[items.length - 1],
                        start: "top 45%",
                        onEnter: () => {
                            items.forEach((story) =>
                                story.classList.remove("is-active")
                            );
                            items[items.length - 1].classList.add("is-active");
                        },
                        onEnterBack: () => {
                            items.forEach((story) =>
                                story.classList.remove("is-active")
                            );
                            items[items.length - 1].classList.add("is-active");
                        },
                    });
                }
            );

            // Tablet and mobile: simple entrance animations
            mm.add(
                "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
                () => {
                    const elements = gsap.utils.toArray(
                        ".about-heading, .about-visual, .about-intro, .about-story-item",
                        section
                    );

                    elements.forEach((element) => {
                        gsap.from(element, {
                            y: 35,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 90%",
                                once: true,
                            },
                        });
                    });
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section className="about-rj-section" ref={sectionRef}>
            <div className="about-container">

                {/* SECTION HEADING */}
                <div className="about-heading">
                    <div className="about-eyebrow">
                        <span className="about-eyebrow-line" />
                        <span>GET TO KNOW US</span>
                    </div>

                    <div className="about-heading-row">
                        <h2>
                            ABOUT <span>RJ GROUPS</span>
                        </h2>

                        <p>
                            More than a destination.
                            <br />
                            A journey worth remembering.
                        </p>
                    </div>
                </div>

                {/* EDITORIAL LAYOUT */}
                <div className="about-layout">

                    {/* STICKY IMAGE */}
                    <div className="about-visual">
                        <div className="about-image-frame">
                            <img
                                className="about-image"
                                src="/images/about-rj-groups.jpg"
                                alt="Travel destination representing RJ Groups"
                                loading="lazy"
                                decoding="async"
                            />

                            <div className="about-image-overlay" />

                            <div className="about-image-caption">
                                <span>RJ GROUPS</span>
                                <h3>
                                    Explore more.
                                    <br />
                                    Experience more.
                                </h3>
                            </div>

                            <div className="about-image-badge">
                                <Plane size={19} />
                                <span>YOUR JOURNEY, OUR PRIORITY</span>
                            </div>
                        </div>
                    </div>

                    {/* SCROLLING STORY */}
                    <div className="about-story">

                        <div className="about-intro">
                            <span className="about-intro-label">
                                OUR STORY
                            </span>

                            <h3>
                                We turn travel ideas into
                                <span> meaningful experiences.</span>
                            </h3>

                            <p>
                                Discover a more thoughtful way to plan, explore
                                and experience the world with RJ Groups.
                            </p>
                        </div>

                        {/* OVERLAPPING STORY CARDS */}
                        <div className="about-story-stack">
                            {storyItems.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <article
                                        className={`about-story-item ${index === 0 ? "is-active" : ""
                                            }`}
                                        key={item.number}
                                        style={{
                                            "--story-index": index,
                                        }}
                                    >
                                        <div className="about-story-number">
                                            {item.number}
                                        </div>

                                        <div className="about-story-content">
                                            <div className="about-story-top">
                                                <div className="about-story-icon">
                                                    <Icon size={21} strokeWidth={1.7} />
                                                </div>

                                                <span>{item.label}</span>
                                            </div>

                                            <h3>{item.title}</h3>

                                            <p>{item.description}</p>

                                            <div className="about-story-line" />
                                        </div>

                                        <span className="about-story-background-number">
                                            {item.number}
                                        </span>
                                    </article>
                                );
                            })}
                        </div>

                        {/* DISCOVER LINK */}
                        <Link to="/about" className="about-more-link">
                            <span>DISCOVER OUR STORY</span>

                            <span className="about-more-icon">
                                <ArrowUpRight size={19} />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* BOTTOM STATEMENT */}
                <div className="about-bottom">
                    <span>THE WORLD IS WAITING</span>
                    <ArrowDownRight size={22} />
                </div>

            </div>
        </section>
    );
}
