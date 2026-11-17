
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    Compass,
    Globe2,
    Heart,
    MoveUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./OurStory.css";

const OurStory = () => {
    const reduceMotion = useReducedMotion();

    const reveal = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 35,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <section className="our-story">
            <div className="our-story-container">

                {/* SECTION HEADER */}
                <motion.div
                    className="our-story-top"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="our-story-label">
                        <span className="story-label-line" />
                        THE STORY BEHIND RJ GROUPS
                    </span>

                    <span className="our-story-number">01 / OUR STORY</span>
                </motion.div>

                {/* MAIN STORY */}
                <div className="our-story-layout">

                    {/* IMAGE COLUMN */}
                    <motion.div
                        className="our-story-visual"
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : -45,
                        }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.85 }}
                    >
                        <div className="our-story-image">
                            <img
                                src="/images/our-story.jpg"
                                alt="A beautiful destination representing the spirit of travel"
                                loading="lazy"
                            />

                            <div className="our-story-image-overlay" />

                            <div className="story-image-caption">
                                <Compass size={17} />
                                <span>EVERY JOURNEY HAS A BEGINNING</span>
                            </div>
                        </div>

                        <div className="story-image-side-note">
                            <span>RJ</span>
                            <span>GROUPS</span>
                        </div>

                        <div className="our-story-image-index">
                            <span>01</span>
                            <div />
                            <span>03</span>
                        </div>
                    </motion.div>

                    {/* CONTENT COLUMN */}
                    <motion.div
                        className="our-story-content"
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : 45,
                        }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.85, delay: 0.1 }}
                    >
                        <span className="our-story-kicker">
                            MORE THAN A TRAVEL COMPANY
                        </span>

                        <h2>
                            Built around
                            <br />
                            <span>dreams, driven</span>
                            <br />
                            by discovery.
                        </h2>

                        <p className="our-story-intro">
                            At RJ Groups, we believe travel is more than
                            visiting new places. It is about discovering
                            possibilities, creating meaningful connections,
                            and experiencing moments that stay with you.
                        </p>

                        <div className="our-story-divider" />

                        <p className="our-story-description">
                            Our vision is to make every journey feel personal,
                            purposeful, and memorable. From choosing the right
                            destination to planning the details of your trip,
                            we aim to make the travel experience simpler and
                            more enjoyable.
                        </p>

                        <p className="our-story-description">
                            With a commitment to thoughtful planning and
                            traveller-focused service, RJ Groups brings
                            opportunities and experiences closer to you.
                        </p>

                        {/* BRAND VALUES */}
                        <div className="our-story-values">
                            <div className="story-value">
                                <div className="story-value-icon">
                                    <Heart size={18} />
                                </div>
                                <div>
                                    <h3>Personal Approach</h3>
                                    <span>Journeys shaped around your needs.</span>
                                </div>
                            </div>

                            <div className="story-value">
                                <div className="story-value-icon">
                                    <Globe2 size={18} />
                                </div>
                                <div>
                                    <h3>Endless Possibilities</h3>
                                    <span>Experiences beyond the ordinary.</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/contact" className="our-story-link">
                            Get to know us
                            <span>
                                <ArrowUpRight size={17} />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* BOTTOM BRAND STATEMENT */}
                <motion.div
                    className="our-story-footer"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span>OUR PURPOSE</span>

                    <p>
                        Connecting opportunities.
                        <strong> Creating futures.</strong>
                    </p>

                    <MoveUpRight size={22} />
                </motion.div>
            </div>
        </section>
    );
};

export default OurStory;
