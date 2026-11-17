
import { motion, useReducedMotion } from "framer-motion";
import {
    Hotel,
    Utensils,
    Car,
    Plane,
    MapPinned,
    Headset,
    ShieldCheck,
    Ticket,
    ArrowUpRight,
    CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./PackageInclusions.css";

const inclusions = [
    {
        id: 1,
        number: "01",
        title: "Accommodation",
        description:
            "Comfortable hotel or resort stays based on the selected travel package.",
        image: "/images/inclusion-accommodation.jpg",
        features: ["Premium Hotels", "Resort Stays", "Comfortable Rooms"],
        icon: Hotel,
    },
    {
        id: 2,
        number: "02",
        title: "Meals & Dining",
        description:
            "Meal arrangements according to the selected package and hotel plan.",
        image: "/images/inclusion-dining.jpg",
        features: ["Breakfast", "Local Cuisine", "Dining Options"],
        icon: Utensils,
    },
    {
        id: 3,
        number: "03",
        title: "Transportation",
        description:
            "Travel transfers and local transportation as specified in your itinerary.",
        image: "/images/inclusion-transport.jpg",
        features: ["Private Transfers", "Airport Pickup", "Local Travel"],
        icon: Car,
    },
    {
        id: 4,
        number: "04",
        title: "Flight Assistance",
        description:
            "Flight booking assistance and travel coordination when included in the package.",
        image: "/images/inclusion-flight.jpg",
        features: ["Flight Booking", "Travel Planning", "Ticket Assistance"],
        icon: Plane,
    },
    {
        id: 5,
        number: "05",
        title: "Sightseeing",
        description:
            "Selected sightseeing locations and guided experiences as per the itinerary.",
        image: "/images/inclusion-sightseeing.jpg",
        features: ["Tourist Spots", "Guided Tours", "Local Experiences"],
        icon: MapPinned,
    },
    {
        id: 6,
        number: "06",
        title: "Travel Assistance",
        description:
            "Support with travel planning, coordination and booking-related queries.",
        image: "/images/inclusion-assistance.jpg",
        features: ["Trip Coordination", "Booking Support", "Travel Guidance"],
        icon: Headset,
    },
    {
        id: 7,
        number: "07",
        title: "Travel Protection",
        description:
            "Travel insurance or protection options where specifically included or arranged.",
        image: "/images/inclusion-protection.jpg",
        features: ["Insurance Options", "Travel Safety", "Peace of Mind"],
        icon: ShieldCheck,
    },
    {
        id: 8,
        number: "08",
        title: "Entry Tickets",
        description:
            "Entry tickets and activity charges for attractions listed as included.",
        image: "/images/inclusion-tickets.jpg",
        features: ["Entry Passes", "Activity Tickets", "Attraction Access"],
        icon: Ticket,
    },
];

function InclusionCard({ item, index, reduceMotion }) {
    const Icon = item.icon;

    return (
        <motion.article
            className="inclusion-card"
            initial={
                reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
                    }
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
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : (index % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className="inclusion-image-wrap">
                <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                />

                <div className="inclusion-image-overlay" />

                {/* Top details */}
                <div className="inclusion-image-top">
                    <span className="inclusion-number">
                        {item.number}
                    </span>

                    <span className="inclusion-icon">
                        <Icon size={20} strokeWidth={1.8} />
                    </span>
                </div>

                {/* Default content */}
                <div className="inclusion-image-content">
                    <span className="inclusion-label">
                        RJ GROUPS SERVICES
                    </span>

                    <h3>{item.title}</h3>

                    <span className="inclusion-discover">
                        Explore Inclusion
                        <ArrowUpRight size={15} />
                    </span>
                </div>

                {/* Hover content */}
                <div className="inclusion-hover-content">
                    <div className="inclusion-hover-icon">
                        <Icon size={22} strokeWidth={1.7} />
                    </div>

                    <span className="inclusion-hover-label">
                        INCLUDED SERVICE {item.number}
                    </span>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <div className="inclusion-features">
                        {item.features.map((feature) => (
                            <span key={feature}>
                                <CheckCircle2 size={12} />
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="inclusion-hover-footer">
                        <span>RJ GROUPS</span>
                        <ArrowUpRight size={17} />
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default function PackageInclusions() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="inclusions-section">
            <div className="inclusions-container">

                {/* Heading */}
                <motion.div
                    className="inclusions-heading"
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 25,
                            }
                    }
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.65,
                    }}
                >
                    <div className="inclusions-eyebrow">
                        <CheckCircle2 size={15} />
                        <span>TRAVEL WITH CONFIDENCE</span>
                    </div>

                    <h2>
                        Everything You Need
                        <span>For Your Journey.</span>
                    </h2>

                    <p>
                        Enjoy a convenient travel experience with thoughtfully
                        coordinated services and package options from RJ Groups.
                    </p>
                </motion.div>

                {/* Inclusion cards */}
                <div className="inclusions-grid">
                    {inclusions.map((item, index) => (
                        <InclusionCard
                            key={item.id}
                            item={item}
                            index={index}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="inclusions-note"
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 25,
                            }
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
                        duration: 0.6,
                    }}
                >
                    <div className="inclusions-note-content">
                        <div className="inclusions-note-icon">
                            <CheckCircle2 size={21} />
                        </div>

                        <div>
                            <h3>
                                Every package is different. Your journey should be too.
                            </h3>

                            <p>
                                Inclusions depend on the destination, package, travel
                                dates and selected services. Check your itinerary
                                for the exact details.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/contact"
                        className="inclusions-enquiry"
                    >
                        Customise Your Trip
                        <ArrowUpRight size={17} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
