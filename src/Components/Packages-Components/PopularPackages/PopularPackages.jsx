
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    MapPin,
    MoveRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useShaped } from "../../../hooks/useLegacyShape";
import "./PopularPackages.css";



const easing = [0.22, 1, 0.36, 1];

function PackageCard({ item, index, reduceMotion }) {
    return (
        <motion.article
            className="popular-stack-card"
            style={{ zIndex: index + 1 }}
            initial={
                reduceMotion
                    ? false
                    : { opacity: 0, y: 35, scale: 0.985 }
            }
            whileInView={
                reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0, scale: 1 }
            }
            viewport={{ once: true, amount: 0.12 }}
            transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: easing,
            }}
        >
            <Link
                to={`/package/${item.slug}`}
                className="popular-stack-link"
                aria-label={`Enquire about ${item.name}`}
            >
                <div className="popular-stack-image">
                    <motion.img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        initial={reduceMotion ? false : { scale: 1.06 }}
                        whileInView={reduceMotion ? undefined : { scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.8,
                            ease: easing,
                        }}
                        onError={(event) => {
                            event.currentTarget.style.opacity = "0";
                        }}
                    />

                    <div className="popular-stack-image-overlay" />

                    <span className="popular-stack-number">{item.number}</span>

                    <span className="popular-stack-category">
                        {item.category}
                    </span>

                    <span className="popular-stack-image-arrow">
                        <ArrowUpRight size={18} />
                    </span>
                </div>

                <div className="popular-stack-content">
                    <div className="popular-stack-location">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                    </div>

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <div className="popular-stack-bottom">
                        <span>DISCOVER THIS JOURNEY</span>

                        <div className="popular-stack-bottom-arrow">
                            <MoveRight size={17} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function PopularPackages() {
    const packages = useShaped({ featured: true, limit: 6 }, "popular");
    const reduceMotion = useReducedMotion();

    return (
        <section className="popular-packages">
            <div className="popular-packages-container">
                {/* HEADER */}
                <motion.div
                    className="popular-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={
                        reduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: easing }}
                >
                    <div>
                        <span className="popular-eyebrow">
                            <span />
                            CURATED JOURNEYS
                        </span>

                        <h2>
                            Popular tour
                            <br />
                            <span>packages.</span>
                        </h2>
                    </div>

                    <div className="popular-header-right">
                        <p>
                            Explore handpicked destinations and discover
                            memorable journeys for your next holiday.
                        </p>

                        <Link to="/packages" className="popular-all-link">
                            View all packages
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </motion.div>

                {/* STACK INTRO */}
                <div className="popular-stack-wrapper">
                    <div className="popular-stack-intro">
                        <span>01 — 06</span>
                        <span>SCROLL TO EXPLORE DESTINATIONS</span>
                    </div>

                    {/* DESTINATION CARDS */}
                    <div className="popular-stack">
                        {packages.map((item, index) => (
                            <PackageCard
                                key={item.id}
                                item={item}
                                index={index}
                                reduceMotion={reduceMotion}
                            />
                        ))}
                    </div>
                </div>

                {/* FOOTER */}
                <motion.div
                    className="popular-footer"
                    initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                    whileInView={
                        reduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: easing }}
                >
                    <div>
                        <span className="popular-footer-dot" />
                        <p>Ready to plan your next adventure?</p>
                    </div>

                    <Link to="/contact" className="popular-enquiry-btn">
                        Plan your trip
                        <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
