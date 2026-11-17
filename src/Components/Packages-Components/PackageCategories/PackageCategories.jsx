
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./PackageCategories.css";

const categories = [
    {
        id: "01",
        title: "Beach Holidays",
        subtitle: "Escape to paradise",
        image: "/images/category-beach.jpg",
        count: "Coastal escapes",
    },
    {
        id: "02",
        title: "Hill Station Tours",
        subtitle: "Find your mountain moment",
        image: "/images/category-hills.jpg",
        count: "Mountain journeys",
    },
    {
        id: "03",
        title: "Family Packages",
        subtitle: "Make memories together",
        image: "/images/category-family.jpg",
        count: "Family adventures",
    },
    {
        id: "04",
        title: "Honeymoon Packages",
        subtitle: "Celebrate your love",
        image: "/images/category-honeymoon.jpg",
        count: "Romantic escapes",
    },
    {
        id: "05",
        title: "International Tours",
        subtitle: "Explore beyond borders",
        image: "/images/category-international.jpg",
        count: "Worldwide journeys",
    },
    {
        id: "06",
        title: "Adventure Trips",
        subtitle: "Make every moment count",
        image: "/images/category-adventure.jpg",
        count: "Thrill & discovery",
    },
];

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
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function PackageCategories() {
    return (
        <section className="package-categories">
            <div className="package-categories-container">

                {/* HEADING */}
                <motion.div
                    className="categories-heading"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65 }}
                >
                    <span className="categories-eyebrow">
                        <span />
                        EXPLORE YOUR JOURNEY
                    </span>

                    <div className="categories-title-row">
                        <h2>
                            Find your kind
                            <br />
                            of <span>adventure.</span>
                        </h2>

                        <p>
                            Discover memorable holidays, beautiful destinations
                            and experiences designed around your travel dreams.
                        </p>
                    </div>
                </motion.div>

                {/* CATEGORY GRID */}
                <motion.div
                    className="categories-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                >
                    {categories.map((category) => (
                        <motion.div
                            className="category-card"
                            variants={cardVariants}
                            key={category.id}
                            whileHover={{ y: -5 }}
                        >
                            <Link
                                to={`/packages?category=${encodeURIComponent(category.title)}`}
                                className="category-card-link"
                            >
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div className="category-overlay" />

                                <div className="category-top">
                                    <span>{category.id}</span>

                                    <span className="category-arrow">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </div>

                                <div className="category-content">
                                    <span className="category-count">
                                        {category.count}
                                    </span>

                                    <h3>{category.title}</h3>
                                    <p>{category.subtitle}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* BOTTOM LINK */}
                <motion.div
                    className="categories-bottom"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p>Your next unforgettable journey starts here.</p>

                    <Link to="/packages" className="categories-view-all">
                        Explore all packages
                        <ArrowUpRight size={17} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
