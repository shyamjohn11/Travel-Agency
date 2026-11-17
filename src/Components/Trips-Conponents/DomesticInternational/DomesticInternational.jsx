
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "./DomesticInternational.css";

const travelCategories = [
    {
        id: 1,
        number: "01",
        label: "EXPLORE INDIA",
        title: "Domestic",
        highlight: "Journeys.",
        description:
            "From peaceful hill stations to tropical beaches, discover the incredible beauty of India.",
        image: "/images/travel-categories/domestic.jpg",
        destinations: ["Kashmir", "Kerala", "Goa", "Rajasthan"],
        icon: MapPin,
        link: "/packages?type=domestic",
        button: "Explore Domestic",
    },
    {
        id: 2,
        number: "02",
        label: "DISCOVER THE WORLD",
        title: "International",
        highlight: "Escapes.",
        description:
            "Experience extraordinary destinations, different cultures and unforgettable adventures around the world.",
        image: "/images/travel-categories/international.jpg",
        destinations: ["Dubai", "Maldives", "Singapore", "Bali"],
        icon: Globe2,
        link: "/packages?type=international",
        button: "Explore International",
    },
];

const panelVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function DomesticInternational() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="domestic-international">
            <div className="di-container">

                {/* Header */}
                <motion.div
                    className="di-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div>
                        <span className="di-eyebrow">
                            <span />
                            YOUR JOURNEY STARTS HERE
                        </span>

                        <h2>
                            Near or Far,
                            <br />
                            <span>Explore More.</span>
                        </h2>

                        <p>
                            Whether you dream of exploring India or travelling
                            across the world, find the perfect journey with RJ Groups.
                        </p>
                    </div>

                    <span className="di-header-label">
                        TWO WAYS TO EXPLORE
                    </span>
                </motion.div>

                {/* Travel Panels */}
                <div className="di-grid">
                    {travelCategories.map((item) => {
                        const Icon = item.icon;

                        return (
                            <motion.article
                                className="di-panel"
                                key={item.id}
                                variants={reduceMotion ? {} : panelVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <img
                                    src={item.image}
                                    alt={`${item.title} travel experiences`}
                                    className="di-panel-image"
                                    loading="lazy"
                                />

                                <div className="di-panel-overlay" />

                                <div className="di-panel-top">
                                    <span className="di-panel-number">
                                        {item.number}
                                    </span>

                                    <span className="di-panel-label">
                                        {item.label}
                                    </span>
                                </div>

                                <div className="di-panel-content">
                                    <div className="di-panel-icon">
                                        <Icon size={19} strokeWidth={1.7} />
                                    </div>

                                    <h3>
                                        {item.title}
                                        <br />
                                        <span>{item.highlight}</span>
                                    </h3>

                                    <p>{item.description}</p>

                                    <div className="di-destinations">
                                        {item.destinations.map((destination) => (
                                            <span key={destination}>
                                                {destination}
                                            </span>
                                        ))}
                                    </div>

                                    <Link to={item.link} className="di-button">
                                        {item.button}
                                        <span className="di-button-icon">
                                            <ArrowUpRight size={19} />
                                        </span>
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* Bottom Text */}
                <motion.div
                    className="di-footer"
                    initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p>
                        One trusted travel partner. Countless destinations.
                    </p>
                    <span>RJ GROUPS — YOUR JOURNEY, OUR PRIORITY.</span>
                </motion.div>

            </div>
        </section>
    );
}
