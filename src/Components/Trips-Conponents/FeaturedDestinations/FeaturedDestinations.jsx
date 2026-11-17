
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "./FeaturedDestinations.css";

const destinations = [
    {
        id: 1,
        name: "Kashmir",
        subtitle: "Paradise on Earth",
        country: "India",
        image: "/images/destinations/kashmir.jpg",
        number: "01",
        category: "MOUNTAIN ESCAPE",
    },
    {
        id: 2,
        name: "Kerala",
        subtitle: "God's Own Country",
        country: "India",
        image: "/images/destinations/kerala.jpg",
        number: "02",
        category: "NATURE & BACKWATERS",
    },
    {
        id: 3,
        name: "Dubai",
        subtitle: "Where Luxury Meets Adventure",
        country: "UAE",
        image: "/images/destinations/dubai.jpg",
        number: "03",
        category: "CITY & LUXURY",
    },
    {
        id: 4,
        name: "Maldives",
        subtitle: "A Tropical Paradise",
        country: "Maldives",
        image: "/images/destinations/maldives.jpg",
        number: "04",
        category: "ISLAND ESCAPE",
    },
    {
        id: 5,
        name: "Singapore",
        subtitle: "A City of Endless Wonders",
        country: "Singapore",
        image: "/images/destinations/singapore.jpg",
        number: "05",
        category: "CITY EXPLORATION",
    },
    {
        id: 6,
        name: "Bali",
        subtitle: "Discover the Island of Gods",
        country: "Indonesia",
        image: "/images/destinations/bali.jpg",
        number: "06",
        category: "TROPICAL RETREAT",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function FeaturedDestinations() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="featured-destinations">
            <div className="featured-destinations-container">

                {/* Section Header */}
                <motion.div
                    className="destinations-header"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="destinations-heading">
                        <span className="destinations-eyebrow">
                            <span className="eyebrow-line" />
                            EXPLORE THE WORLD
                        </span>

                        <h2>
                            Featured
                            <span> Destinations.</span>
                        </h2>

                        <p>
                            From breathtaking landscapes to vibrant cities, discover
                            destinations that turn every journey into an unforgettable
                            experience.
                        </p>
                    </div>

                    <Link to="/packages" className="destinations-view-all">
                        Explore all destinations
                        <ArrowUpRight size={17} />
                    </Link>
                </motion.div>

                {/* Destination Cards */}
                <motion.div
                    className="destinations-grid"
                    variants={shouldReduceMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                >
                    {destinations.map((destination) => (
                        <motion.article
                            className="destination-card"
                            key={destination.name}
                            variants={shouldReduceMotion ? {} : cardVariants}
                        >
                            <Link
                                to={`/contact?destination=${encodeURIComponent(
                                    destination.name
                                )}`}
                                className="destination-card-link"
                                aria-label={`Explore ${destination.name}`}
                            >
                                <div className="destination-image">
                                    <img
                                        src={destination.image}
                                        alt={`${destination.name} travel destination`}
                                        loading="lazy"
                                    />

                                    <div className="destination-image-overlay" />

                                    <span className="destination-number">
                                        {destination.number}
                                    </span>

                                    <span className="destination-category">
                                        {destination.category}
                                    </span>

                                    <div className="destination-content">
                                        <div className="destination-location">
                                            <MapPin size={13} />
                                            {destination.country}
                                        </div>

                                        <h3>{destination.name}</h3>

                                        <p>{destination.subtitle}</p>

                                        <span className="destination-explore">
                                            Explore destination
                                            <span className="destination-arrow">
                                                <ArrowUpRight size={17} />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="destinations-bottom"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p>
                        Your next unforgettable journey starts here.
                    </p>

                    <Link to="/contact" className="destinations-cta">
                        Plan Your Trip
                        <ArrowUpRight size={18} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
