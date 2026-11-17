
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    MapPin,
    Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useShaped } from "../../../hooks/useLegacyShape";
import "./DomesticPackages.css";



const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function DomesticPackages() {
    const destinations = useShaped({ category: "domestic" }, "domestic");
    const reduceMotion = useReducedMotion();

    return (
        <section className="domestic-section" id="domestic-packages">
            <div className="domestic-container">

                {/* Section Heading */}
                <motion.div
                    className="domestic-heading"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65 }}
                >
                    <span className="domestic-eyebrow">
                        <Plane size={14} />
                        EXPLORE INDIA
                    </span>

                    <h2>
                        Discover India's
                        <span> Beautiful Destinations</span>
                    </h2>

                    <p>
                        From peaceful hill stations to tropical beaches,
                        discover incredible destinations with RJ Groups.
                    </p>
                </motion.div>

                {/* Destination Grid */}
                <motion.div
                    className="domestic-grid"
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {destinations.map((destination) => (
                        <motion.article
                            className="domestic-card"
                            key={destination.id}
                            variants={cardVariants}
                            whileHover={
                                reduceMotion
                                    ? undefined
                                    : { y: -6, transition: { duration: 0.25 } }
                            }
                        >
                            {/* Image */}
                            <Link
                                to={`/package/${destination.slug}`}
                                className="domestic-image-link"
                                aria-label={`Explore ${destination.name}`}
                            >
                                <div className="domestic-image-wrapper">
                                    <img
                                        src={destination.image}
                                        alt={`${destination.name} travel destination`}
                                        className="domestic-image"
                                        loading="lazy"
                                    />

                                    <span className="domestic-category">
                                        {destination.category}
                                    </span>

                                    <span className="domestic-image-arrow">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="domestic-card-content">
                                <div className="domestic-location">
                                    <MapPin size={12} />
                                    <span>{destination.country}</span>
                                </div>

                                <h3>{destination.name}</h3>

                                <p>{destination.description}</p>

                                <Link
                                    to={`/package/${destination.slug}`}
                                    className="domestic-explore-link"
                                >
                                    Explore destination
                                    <ArrowUpRight size={15} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="domestic-cta"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="domestic-cta-content">
                        <span>YOUR NEXT JOURNEY STARTS HERE</span>
                        <h3>Let's plan your perfect getaway.</h3>
                        <p>
                            Tell us your dream destination. We'll help you make it happen.
                        </p>
                    </div>

                    <Link to="/contact" className="domestic-cta-button">
                        Plan Your Trip
                        <ArrowUpRight size={17} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}

export default DomesticPackages;
