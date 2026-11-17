
import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import {
    ArrowUpRight,
    ArrowRight,
    MapPin,
    Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useShaped } from "../../../hooks/useLegacyShape";
import "./InternationalPackages.css";



function DestinationCard({ destination, index }) {
    const cardRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start 95%", "center 60%"],
    });

    const xValue = useTransform(
        scrollYProgress,
        [0, 1],
        [index % 2 === 0 ? 65 : 85, 0]
    );

    const scaleValue = useTransform(
        scrollYProgress,
        [0, 1],
        [0.94, 1]
    );

    const opacityValue = useTransform(
        scrollYProgress,
        [0, 0.6, 1],
        [0.2, 0.8, 1]
    );

    const imageScaleValue = useTransform(
        scrollYProgress,
        [0, 1],
        [1.08, 1]
    );

    const x = useSpring(xValue, {
        stiffness: 90,
        damping: 22,
        mass: 0.4,
    });

    const scale = useSpring(scaleValue, {
        stiffness: 90,
        damping: 22,
        mass: 0.4,
    });

    const opacity = useSpring(opacityValue, {
        stiffness: 90,
        damping: 22,
    });

    const imageScale = useSpring(imageScaleValue, {
        stiffness: 90,
        damping: 22,
    });

    return (
        <motion.article
            ref={cardRef}
            className="international-card"
            style={
                shouldReduceMotion
                    ? {}
                    : {
                        x,
                        scale,
                        opacity,
                    }
            }
        >
            <Link
                to={`/package/${destination.slug}`}
                className="international-card-link"
            >
                {/* Image */}
                <div className="international-card-image">
                    <motion.img
                        src={destination.image}
                        alt={`${destination.name} travel destination`}
                        loading="lazy"
                        style={
                            shouldReduceMotion ? {} : { scale: imageScale }
                        }
                    />

                    <div className="international-image-overlay" />

                    <span className="international-card-number">
                        {destination.number}
                    </span>

                    <span className="international-category">
                        {destination.category}
                    </span>

                    <motion.span
                        className="international-card-arrow"
                        whileHover={
                            shouldReduceMotion
                                ? undefined
                                : { rotate: 45, scale: 1.08 }
                        }
                    >
                        <ArrowUpRight size={18} />
                    </motion.span>
                </div>

                {/* Content */}
                <div className="international-card-content">
                    <div className="international-card-location">
                        <MapPin size={12} />
                        <span>{destination.country}</span>
                    </div>

                    <h3>{destination.name}</h3>

                    <p>{destination.description}</p>

                    <div className="international-card-bottom">
                        <span>Explore Destination</span>
                        <ArrowRight size={15} />
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function InternationalPackages() {
    const destinations = useShaped({ category: "international" }, "intl");
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="international-section">
            <div className="international-container">

                {/* Section Heading */}
                <div className="international-heading">

                    <motion.div
                        className="international-eyebrow"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                    >
                        <Plane size={14} />
                        <span>EXPLORE BEYOND BORDERS</span>
                    </motion.div>

                    <motion.div
                        className="international-heading-row"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                    >
                        <div>
                            <h2>
                                International
                                <span> Packages.</span>
                            </h2>

                            <p>
                                Discover extraordinary destinations and create
                                unforgettable memories with RJ Groups.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="international-heading-link"
                        >
                            Plan Your Journey
                            <ArrowUpRight size={16} />
                        </Link>
                    </motion.div>
                </div>

                {/* Destination Grid */}
                <div className="international-destination-grid">
                    {destinations.map((destination, index) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="international-bottom-cta"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="international-cta-icon">
                        <Plane size={21} />
                    </div>

                    <div className="international-cta-text">
                        <span>YOUR NEXT ADVENTURE STARTS HERE</span>
                        <h3>Where would you like to go next?</h3>
                    </div>

                    <Link
                        to="/contact"
                        className="international-cta-button"
                    >
                        Customize Your Trip
                        <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
