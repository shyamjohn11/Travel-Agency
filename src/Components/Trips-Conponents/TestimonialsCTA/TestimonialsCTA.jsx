
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    ArrowRight,
    Quote,
    Star,
    MessageCircle,
    Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./TestimonialsCTA.css";

const testimonials = [
    {
        id: 1,
        name: "Priya & Family",
        location: "Chennai, Tamil Nadu",
        trip: "Kerala Family Holiday",
        initials: "PF",
        rating: 5,
        quote:
            "Everything was organised perfectly. From accommodation to sightseeing, every detail was handled smoothly. We had a wonderful family holiday.",
    },
    {
        id: 2,
        name: "Arun Kumar",
        location: "Nagercoil, Tamil Nadu",
        trip: "Kashmir Experience",
        initials: "AK",
        rating: 5,
        quote:
            "Kashmir was a dream destination for us. The itinerary was well planned, the arrangements were comfortable, and the experience was memorable.",
    },
    {
        id: 3,
        name: "Meera & Rahul",
        location: "Thiruvananthapuram, Kerala",
        trip: "Dubai Getaway",
        initials: "MR",
        rating: 5,
        quote:
            "Our Dubai trip was an amazing experience. The team helped us plan the journey and made the entire travel process simple and enjoyable.",
    },
];

const TestimonialsCTA = () => {
    const shouldReduceMotion = useReducedMotion();

    const reveal = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="testimonials-cta">
            <div className="testimonials-container">
                {/* TESTIMONIALS HEADER */}
                <motion.div
                    className="testimonials-heading"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="testimonials-eyebrow">
                        <span className="eyebrow-line" />
                        TRAVELLER STORIES
                    </span>

                    <div className="testimonials-title-row">
                        <h2>
                            Memories that
                            <br />
                            <span>travel with you.</span>
                        </h2>

                        <p>
                            Every journey creates a story worth sharing.
                            Discover what travellers have to say about
                            their experiences with RJ Groups.
                        </p>
                    </div>
                </motion.div>

                {/* TESTIMONIAL CARDS */}
                <div className="testimonial-grid">
                    {testimonials.map((item, index) => (
                        <motion.article
                            className="testimonial-card"
                            key={item.id}
                            initial={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : 35,
                            }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.65,
                                delay: shouldReduceMotion ? 0 : index * 0.13,
                            }}
                        >
                            <div className="testimonial-card-top">
                                <Quote size={27} strokeWidth={1.5} />

                                <div className="testimonial-stars">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill="currentColor"
                                            strokeWidth={1.5}
                                        />
                                    ))}
                                </div>
                            </div>

                            <p className="testimonial-quote">
                                “{item.quote}”
                            </p>

                            <div className="testimonial-trip">
                                <Plane size={14} />
                                <span>{item.trip}</span>
                            </div>

                            <div className="testimonial-divider" />

                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    {item.initials}
                                </div>

                                <div>
                                    <h3>{item.name}</h3>
                                    <span>{item.location}</span>
                                </div>

                                <ArrowUpRight
                                    className="testimonial-arrow"
                                    size={20}
                                />
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* TESTIMONIAL FOOTNOTE */}
                <motion.div
                    className="testimonial-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span>YOUR STORY COULD BE NEXT</span>
                    <Link to="/contact">
                        Plan your journey <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </div>

            {/* ENQUIRY CTA */}
            <motion.div
                className="travel-enquiry"
                initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 35,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75 }}
            >
                <div className="enquiry-image">
                    <div className="enquiry-image-overlay" />

                    <div className="enquiry-image-label">
                        <span className="enquiry-dot" />
                        YOUR NEXT CHAPTER STARTS HERE
                    </div>
                </div>

                <div className="enquiry-content">
                    <span className="testimonials-eyebrow">
                        LET'S PLAN SOMETHING SPECIAL
                    </span>

                    <h2>
                        The world is waiting.
                        <br />
                        <span>Where will you go?</span>
                    </h2>

                    <p>
                        Tell us what you dream of exploring. We'll help
                        you turn your travel ideas into a thoughtfully
                        planned journey.
                    </p>

                    <div className="enquiry-actions">
                        <Link to="/contact" className="enquiry-primary-btn">
                            Start an enquiry
                            <ArrowUpRight size={19} />
                        </Link>

                        <Link to="/packages" className="enquiry-secondary-btn">
                            Explore packages
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="enquiry-note">
                        <MessageCircle size={16} />
                        <span>Let's make your next trip memorable.</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TestimonialsCTA;