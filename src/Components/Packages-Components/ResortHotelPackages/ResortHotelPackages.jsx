
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    BedDouble,
    MapPin,
    Sparkles,
    Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./ResortHotelPackages.css";

const stays = [
    {
        id: 1,
        name: "Luxury Beach Resorts",
        location: "Goa & Coastal Destinations",
        description:
            "Relax with beautiful sea views, premium rooms and unforgettable beach experiences.",
        image: "/images/resort-booking/resort-hero.jpg",
        category: "BEACH STAY",
        number: "01",
        features: ["Sea View", "Swimming Pool", "Premium Stay"],
    },
    {
        id: 2,
        name: "Hill View Resorts",
        location: "Ooty, Munnar & Kodaikanal",
        description:
            "Wake up to misty mountains, refreshing weather and peaceful surroundings.",
        image: "/images/resort-booking/luxury-resort.jpg",
        category: "HILL STAY",
        number: "02",
        features: ["Mountain View", "Nature", "Relaxation"],
    },
    {
        id: 3,
        name: "Luxury City Hotels",
        location: "Chennai, Bengaluru & Major Cities",
        description:
            "Enjoy comfortable accommodation with modern facilities and convenient locations.",
        image: "/images/resort-booking/hotel-room.jpg",
        category: "CITY HOTEL",
        number: "03",
        features: ["City Access", "Modern Rooms", "Comfort"],
    },
    {
        id: 4,
        name: "Romantic Getaways",
        location: "Kerala, Maldives & More",
        description:
            "Create special memories with beautiful stays for couples and honeymooners.",
        image: "/images/resort-booking/honeymoon.jpg",
        category: "COUPLE STAY",
        number: "04",
        features: ["Private Stay", "Scenic Views", "Romantic Setting"],
    },
    {
        id: 5,
        name: "Family Holiday Resorts",
        location: "Popular Holiday Destinations",
        description:
            "Find welcoming stays designed for comfortable family holidays and quality time.",
        image: "/images/resort-booking/family-room.jpg",
        category: "FAMILY STAY",
        number: "05",
        features: ["Family Rooms", "Leisure", "Convenience"],
    },
    {
        id: 6,
        name: "Premium Nature Retreats",
        location: "Wayanad, Coorg & Thekkady",
        description:
            "Unwind in peaceful natural surroundings with a refreshing change of scenery.",
        image: "/images/resort-booking/private-villa.jpg",
        category: "NATURE RETREAT",
        number: "06",
        features: ["Green Views", "Peaceful Stay", "Nature"],
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
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

function ResortCard({ stay, reduceMotion }) {
    return (
        <motion.article
            className="resort-card"
            variants={reduceMotion ? undefined : cardVariants}
            initial={reduceMotion ? false : undefined}
            whileHover={reduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                to={`/contact?stay=${encodeURIComponent(stay.name)}`}
                className="resort-card-link"
                aria-label={`Enquire about ${stay.name}`}
            >
                <div className="resort-image-wrap">
                    <img
                        src={stay.image}
                        alt={stay.name}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.style.opacity = "0";
                        }}
                    />

                    <div className="resort-image-overlay" />

                    <span className="resort-number">
                        {stay.number}
                    </span>

                    <span className="resort-category">
                        {stay.category}
                    </span>

                    <span className="resort-image-arrow">
                        <ArrowUpRight size={18} />
                    </span>
                </div>

                <div className="resort-card-content">
                    <span className="resort-location">
                        <MapPin size={12} />
                        {stay.location}
                    </span>

                    <h3>{stay.name}</h3>

                    <p>{stay.description}</p>

                    <div className="resort-features">
                        {stay.features.map((feature) => (
                            <span key={feature}>{feature}</span>
                        ))}
                    </div>

                    <div className="resort-card-footer">
                        <span>
                            <BedDouble size={15} />
                            STAY OPTIONS
                        </span>

                        <span className="resort-explore">
                            ENQUIRE NOW
                            <ArrowUpRight size={14} />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function ResortHotelPackages() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="resort-section">
            <div className="resort-container">

                {/* Heading */}
                <motion.div
                    className="resort-heading"
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0, y: 20 }
                    }
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.55,
                    }}
                >
                    <div className="resort-eyebrow">
                        <Sparkles size={14} />
                        <span>STAY COMFORTABLE. TRAVEL BETTER.</span>
                    </div>

                    <div className="resort-heading-row">
                        <div>
                            <h2>
                                Find Your Perfect
                                <span> Stay.</span>
                            </h2>

                            <p>
                                From luxury resorts to peaceful retreats, discover
                                comfortable stays for every kind of journey with RJ Groups.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="resort-view-all"
                        >
                            Find Your Stay
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </motion.div>

                {/* Resort cards */}
                <motion.div
                    className="resort-grid"
                    variants={reduceMotion ? undefined : containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView={reduceMotion ? undefined : "visible"}
                    viewport={{
                        once: true,
                        amount: 0.1,
                    }}
                >
                    {stays.map((stay) => (
                        <ResortCard
                            key={stay.id}
                            stay={stay}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="resort-bottom"
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0, y: 20 }
                    }
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    transition={{
                        duration: 0.55,
                    }}
                >
                    <div className="resort-bottom-icon">
                        <Star size={20} />
                    </div>

                    <div className="resort-bottom-text">
                        <h3>A better stay makes a better journey.</h3>

                        <p>
                            Share your destination and travel dates to enquire
                            about suitable accommodation.
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className="resort-enquiry"
                    >
                        Enquire Now
                        <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
