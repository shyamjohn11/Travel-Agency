
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    Compass,
    Eye,
    Globe2,
    HeartHandshake,
    Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./MissionVision.css";

const MissionVision = () => {
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
        <section className="mission-vision">
            <div className="mission-vision-container">

                {/* HEADER */}
                <motion.div
                    className="mv-header"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                >
                    <div>
                        <span className="mv-eyebrow">
                            <span />
                            WHAT DRIVES US
                        </span>

                        <h2>
                            Purpose in every step.
                            <br />
                            <span>Possibility in every journey.</span>
                        </h2>
                    </div>

                    <p>
                        Our mission shapes what we do today.
                        Our vision inspires what we want to
                        create tomorrow.
                    </p>
                </motion.div>

                {/* MISSION & VISION CARDS */}
                <div className="mv-grid">

                    {/* MISSION */}
                    <motion.article
                        className="mv-card mv-mission"
                        initial={{
                            opacity: 0,
                            y: reduceMotion ? 0 : 40,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.75 }}
                    >
                        <div className="mv-card-image">
                            <img
                                src="/images/mission.jpg"
                                alt="Sunrise over a beautiful mountain destination"
                                loading="lazy"
                            />
                            <div className="mv-image-overlay" />
                        </div>

                        <div className="mv-card-content">
                            <div className="mv-card-top">
                                <div className="mv-icon">
                                    <Target size={23} />
                                </div>

                                <span>01 / OUR MISSION</span>
                            </div>

                            <div className="mv-card-main">
                                <span className="mv-small-label">
                                    WHAT WE STAND FOR
                                </span>

                                <h3>
                                    Making every
                                    <br />
                                    journey <span>meaningful.</span>
                                </h3>

                                <p>
                                    To provide thoughtful travel planning and
                                    personalised assistance that help people
                                    explore destinations with confidence,
                                    convenience, and memorable experiences.
                                </p>
                            </div>

                            <div className="mv-card-footer">
                                <span>OUR PURPOSE TODAY</span>
                                <Compass size={20} />
                            </div>
                        </div>
                    </motion.article>

                    {/* VISION */}
                    <motion.article
                        className="mv-card mv-vision"
                        initial={{
                            opacity: 0,
                            y: reduceMotion ? 0 : 40,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.75,
                            delay: reduceMotion ? 0 : 0.15,
                        }}
                    >
                        <div className="mv-card-image">
                            <img
                                src="/images/vision.jpg"
                                alt="Beautiful tropical island and ocean landscape"
                                loading="lazy"
                            />
                            <div className="mv-image-overlay" />
                        </div>

                        <div className="mv-card-content">
                            <div className="mv-card-top">
                                <div className="mv-icon">
                                    <Eye size={23} />
                                </div>

                                <span>02 / OUR VISION</span>
                            </div>

                            <div className="mv-card-main">
                                <span className="mv-small-label">
                                    WHERE WE ASPIRE TO GO
                                </span>

                                <h3>
                                    Inspiring a world
                                    <br />
                                    of <span>possibilities.</span>
                                </h3>

                                <p>
                                    To become a trusted name in travel and
                                    consultancy by connecting people with
                                    opportunities, creating meaningful
                                    experiences, and building lasting relationships.
                                </p>
                            </div>

                            <div className="mv-card-footer">
                                <span>OUR DIRECTION TOMORROW</span>
                                <Globe2 size={20} />
                            </div>
                        </div>
                    </motion.article>
                </div>

                {/* SHARED VALUES */}
                <motion.div
                    className="mv-statement"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="mv-statement-icon">
                        <HeartHandshake size={23} />
                    </div>

                    <div className="mv-statement-text">
                        <span>OUR GUIDING BELIEF</span>
                        <h3>
                            Your dreams deserve thoughtful journeys.
                        </h3>
                    </div>

                    <Link to="/contact" className="mv-contact-link">
                        Let's connect
                        <ArrowUpRight size={18} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default MissionVision;
