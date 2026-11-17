
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import "./ExploreExperiences.css";

const experiences = [
    {
        id: 1,
        number: "01",
        title: "Beach Escapes",
        category: "BEACH EXPERIENCES",
        description: "Relax by turquoise waters and discover beautiful tropical shores.",
        image: "/images/experiences/beach.jpg",
        tag: "SUN, SAND & SEA",
    },
    {
        id: 2,
        number: "02",
        title: "Mountain Retreats",
        category: "MOUNTAIN EXPERIENCES",
        description: "Find peace among breathtaking mountains and scenic landscapes.",
        image: "/images/experiences/mountain.jpg",
        tag: "ADVENTURE & NATURE",
    },
    {
        id: 3,
        number: "03",
        title: "City Adventures",
        category: "CITY EXPERIENCES",
        description: "Explore iconic skylines, vibrant streets and unforgettable cities.",
        image: "/images/experiences/city.jpg",
        tag: "CULTURE & DISCOVERY",
    },
    {
        id: 4,
        number: "04",
        title: "Romantic Getaways",
        category: "HONEYMOON EXPERIENCES",
        description: "Celebrate together with beautiful stays and unforgettable moments.",
        image: "/images/experiences/honeymoon.jpg",
        tag: "LOVE & LUXURY",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function ExploreExperiences() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="explore-experiences">
            <div className="experiences-container">

                <motion.div
                    className="experiences-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="experiences-heading">
                        <span className="experiences-eyebrow">
                            <span />
                            FIND YOUR WAY
                        </span>

                        <h2>
                            Explore
                            <span> Experiences.</span>
                        </h2>

                        <p>
                            Every traveller has a different dream. Discover the
                            experience that matches yours, and let us create a
                            journey worth remembering.
                        </p>
                    </div>

                    <div className="experiences-header-note">
                        <Compass size={21} strokeWidth={1.5} />
                        <span>DISCOVER YOUR NEXT EXPERIENCE</span>
                    </div>
                </motion.div>

                <motion.div
                    className="experiences-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.13 },
                        },
                    }}
                >
                    {experiences.map((item) => (
                        <motion.article
                            className="experience-card"
                            key={item.id}
                            variants={reduceMotion ? {} : cardVariants}
                        >
                            <Link
                                to={`/contact?experience=${encodeURIComponent(item.title)}`}
                                className="experience-link"
                                aria-label={`Explore ${item.title}`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="experience-image"
                                    loading="lazy"
                                />

                                <div className="experience-overlay" />

                                <span className="experience-number">
                                    {item.number}
                                </span>

                                <span className="experience-tag">
                                    {item.tag}
                                </span>

                                <div className="experience-content">
                                    <span className="experience-category">
                                        {item.category}
                                    </span>

                                    <h3>{item.title}</h3>

                                    <p>{item.description}</p>

                                    <div className="experience-bottom">
                                        <span>Discover experience</span>

                                        <span className="experience-arrow">
                                            <ArrowUpRight size={19} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>

                <motion.div
                    className="experiences-footer"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p>Different dreams. One unforgettable journey.</p>

                    <Link to="/contact" className="experiences-cta">
                        Create Your Journey
                        <ArrowUpRight size={18} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
