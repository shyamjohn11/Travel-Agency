
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowUpRight,
    HelpCircle,
    Plus,
    Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./PackageFAQ.css";

const packageFAQs = [
    {
        id: 1,
        category: "Packages",
        question: "What types of travel packages does RJ Groups offer?",
        answer:
            "We assist with domestic holidays, international trips, beach holidays, hill station tours, family holidays, honeymoon trips and customised travel packages. Destinations and package details are discussed during your enquiry.",
    },
    {
        id: 2,
        category: "Packages",
        question: "Can I choose my own travel destination?",
        answer:
            "Yes. You can share your preferred destination, travel dates and interests. Our team can help you explore suitable travel options based on your requirements.",
    },
    {
        id: 3,
        category: "Customisation",
        question: "Can I customise a travel package?",
        answer:
            "Yes. You can discuss your preferred itinerary, accommodation, transportation, activities, travel dates and budget with our team. We will help you explore a suitable customised plan.",
    },
    {
        id: 4,
        category: "Customisation",
        question: "Can I change the number of travellers?",
        answer:
            "Yes. Share the number of adults and children during your enquiry. Package options and pricing may change depending on the final group size.",
    },
    {
        id: 5,
        category: "Pricing",
        question: "How much does a travel package cost?",
        answer:
            "Package costs depend on the destination, travel dates, number of travellers, accommodation, transportation and selected activities. Contact us for a quotation based on your requirements.",
    },
    {
        id: 6,
        category: "Pricing",
        question: "Are flights, hotels and meals included in the package?",
        answer:
            "Inclusions vary by package. Your quotation or itinerary should clearly specify accommodation, meals, flights, transportation, sightseeing, entry tickets and any additional charges.",
    },
    {
        id: 7,
        category: "Booking",
        question: "How can I book a travel package?",
        answer:
            "Choose a package or submit a custom travel enquiry through our website. Our team will discuss your requirements, provide the relevant details and explain the booking confirmation process.",
    },
    {
        id: 8,
        category: "Booking",
        question: "How early should I book my trip?",
        answer:
            "Booking in advance is generally recommended, especially for peak seasons, holidays and international travel. The ideal booking period depends on your destination and travel dates.",
    },
    {
        id: 9,
        category: "Booking",
        question: "Will I receive a booking confirmation?",
        answer:
            "Once your booking is confirmed through the applicable process, you should receive the relevant confirmation and itinerary details. Please retain these details for your journey.",
    },
    {
        id: 10,
        category: "Cancellation",
        question: "Can I cancel or modify my package?",
        answer:
            "Cancellation and modification options depend on the booking terms and the policies of the relevant airlines, hotels and travel providers. Please review the applicable terms before confirming your booking.",
    },
    {
        id: 11,
        category: "Travel",
        question: "Do I need a passport for international packages?",
        answer:
            "A valid passport is generally required for international travel. Visa requirements, passport validity rules and other documents depend on your destination and nationality. Please verify the requirements before departure.",
    },
    {
        id: 12,
        category: "Travel",
        question: "Can I request special travel arrangements?",
        answer:
            "Yes. Mention any special requirements during your enquiry, such as family arrangements, accessibility needs, preferred accommodation or dietary preferences. These requests are subject to provider availability and confirmation.",
    },
];

const categories = [
    "All",
    "Packages",
    "Customisation",
    "Pricing",
    "Booking",
    "Cancellation",
    "Travel",
];

export default function PackageFAQ() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [openId, setOpenId] = useState(1);

    const filteredFAQs =
        activeCategory === "All"
            ? packageFAQs
            : packageFAQs.filter(
                (faq) => faq.category === activeCategory
            );

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setOpenId(null);
    };

    return (
        <section className="package-faq-section">
            <div className="package-faq-container">

                {/* Heading */}
                <motion.div
                    className="package-faq-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="package-faq-eyebrow">
                        <span />
                        TRAVEL KNOWLEDGE CENTRE
                    </div>

                    <div className="package-faq-heading-row">
                        <div>
                            <h2>
                                Everything About
                                <br />
                                <span>Our Packages.</span>
                            </h2>
                        </div>

                        <p>
                            Planning your next holiday? Find helpful answers
                            about our travel packages, customisation,
                            pricing and booking process.
                        </p>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="package-faq-layout">

                    {/* Left Information Panel */}
                    <motion.aside
                        className="package-faq-sidebar"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="package-faq-icon">
                            <Plane size={29} />
                        </div>

                        <span className="package-faq-sidebar-label">
                            YOUR TRAVEL QUESTIONS
                        </span>

                        <h3>
                            Planning a trip?
                            <br />
                            Start with clarity.
                        </h3>

                        <p>
                            From choosing your destination to understanding
                            your package details, we're here to guide you.
                        </p>

                        <Link
                            to="/contact"
                            className="package-faq-sidebar-button"
                        >
                            Enquire Now
                            <ArrowUpRight size={18} />
                        </Link>

                        <div className="package-faq-decoration">
                            TRAVEL
                        </div>

                        <div className="package-faq-sidebar-bottom">
                            <HelpCircle size={17} />
                            <span>Need more information? Talk to our team.</span>
                        </div>
                    </motion.aside>

                    {/* Right FAQ */}
                    <div className="package-faq-content">

                        {/* Category Filters */}
                        <div className="package-faq-filters">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`package-faq-filter ${activeCategory === category ? "active" : ""
                                        }`}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Accordion */}
                        <div className="package-faq-list">
                            <AnimatePresence mode="popLayout">
                                {filteredFAQs.map((faq, index) => {
                                    const isOpen = openId === faq.id;

                                    return (
                                        <motion.article
                                            key={faq.id}
                                            className={`package-faq-item ${isOpen ? "open" : ""
                                                }`}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <button
                                                type="button"
                                                className="package-faq-question"
                                                onClick={() =>
                                                    setOpenId(isOpen ? null : faq.id)
                                                }
                                                aria-expanded={isOpen}
                                            >
                                                <span className="package-faq-number">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                <span className="package-faq-question-text">
                                                    {faq.question}
                                                </span>

                                                <span className="package-faq-plus">
                                                    <Plus size={19} />
                                                </span>
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        className="package-faq-answer-wrapper"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{
                                                            duration: 0.35,
                                                            ease: [0.22, 1, 0.36, 1],
                                                        }}
                                                    >
                                                        <p className="package-faq-answer">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.article>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {filteredFAQs.length === 0 && (
                            <p>No questions found in this category.</p>
                        )}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="package-faq-bottom"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <span>YOUR NEXT ADVENTURE AWAITS</span>
                        <h3>Still have questions about your trip?</h3>
                    </div>

                    <Link
                        to="/contact"
                        className="package-faq-bottom-button"
                    >
                        Talk to Our Team
                        <ArrowUpRight size={18} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
