
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./ContactFAQ.css";

const faqItems = [
    {
        question: "How can I book a travel package?",
        answer:
            "Booking a travel package is simple. Contact RJ Groups through our enquiry form, phone or email. Share your preferred destination, travel dates and number of travellers. Our team can guide you through the available options and next steps.",
    },
    {
        question: "Can I customize my travel itinerary?",
        answer:
            "Yes. You can share your travel preferences, interests, budget and schedule with us. We can discuss itinerary options that better suit your requirements and help you plan your journey.",
    },
    {
        question: "Do you provide international travel packages?",
        answer:
            "You can enquire about international destinations and travel packages through RJ Groups. Share your preferred country, travel dates and requirements so our team can discuss suitable options with you.",
    },
    {
        question: "How can I get a package quotation?",
        answer:
            "Submit an enquiry with your destination, travel dates, number of travellers and preferred trip type. Include any special requirements in the message field. Our team can review the details and get back to you with quotation information.",
    },
    {
        question: "Can I contact RJ Groups for group travel?",
        answer:
            "Yes. You can contact RJ Groups for group travel enquiries, including family trips, friends' holidays and other group journeys. Mention your group size, destination and preferred travel dates so we can understand your requirements.",
    },
];

export default function ContactFAQ() {
    const [activeIndex, setActiveIndex] = useState(0);
    const reduceMotion = useReducedMotion();

    const toggleFAQ = (index) => {
        setActiveIndex((current) => (current === index ? null : index));
    };

    return (
        <section className="contact-faq">
            <div className="contact-faq-container">

                {/* HEADER */}
                <motion.div
                    className="contact-faq-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65 }}
                >
                    <span className="contact-faq-eyebrow">
                        <span />
                        GOT QUESTIONS?
                    </span>

                    <h2>
                        Frequently Asked <span>Questions.</span>
                    </h2>

                    <p>
                        Find helpful answers to common questions about booking,
                        customized itineraries and planning your next journey with RJ Groups.
                    </p>
                </motion.div>

                {/* FAQ LAYOUT */}
                <div className="contact-faq-layout">

                    {/* LEFT SIDE */}
                    <motion.div
                        className="contact-faq-intro"
                        initial={reduceMotion ? false : { opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="contact-faq-intro-card">
                            <span className="contact-faq-intro-icon">
                                <MessageCircle size={26} />
                            </span>

                            <span className="contact-faq-intro-label">
                                NEED MORE INFORMATION?
                            </span>

                            <h3>
                                Your questions deserve the right answers.
                            </h3>

                            <p>
                                Can't find what you're looking for? Get in touch
                                with our team and tell us how we can help.
                            </p>

                            <Link to="/contact#contact-form" className="contact-faq-cta">
                                Ask Us Anything
                                <ArrowUpRight size={18} />
                            </Link>

                            <div className="contact-faq-decoration">
                                RJ GROUPS
                            </div>
                        </div>

                        <div className="contact-faq-side-note">
                            <span>01 — 05</span>
                            <p>
                                A little clarity makes every journey easier.
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT ACCORDION */}
                    <motion.div
                        className="contact-faq-list"
                        initial={reduceMotion ? false : { opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        {faqItems.map((item, index) => {
                            const isOpen = activeIndex === index;

                            return (
                                <div
                                    className={`contact-faq-item ${isOpen ? "is-open" : ""}`}
                                    key={item.question}
                                >
                                    <button
                                        className="contact-faq-question"
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={`contact-faq-answer-${index}`}
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span className="contact-faq-number">
                                            0{index + 1}
                                        </span>

                                        <span className="contact-faq-question-text">
                                            {item.question}
                                        </span>

                                        <span className="contact-faq-toggle">
                                            {isOpen ? (
                                                <Minus size={17} />
                                            ) : (
                                                <Plus size={17} />
                                            )}
                                        </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={`contact-faq-answer-${index}`}
                                                className="contact-faq-answer-wrap"
                                                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{
                                                    duration: reduceMotion ? 0 : 0.3,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <div className="contact-faq-answer">
                                                    <p>{item.answer}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
