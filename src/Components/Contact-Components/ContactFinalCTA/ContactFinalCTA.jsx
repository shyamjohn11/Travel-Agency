
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    Compass,
    MoveRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./ContactFinalCTA.css";

export default function ContactFinalCTA() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="contact-final-cta">
            <div className="contact-final-background">
                <img
                            src="/images/contact-final-cta.jpg"
                            alt="Beautiful tropical destination waiting to be explored"
                            className="contact-final-image"
                            loading="lazy"
                            decoding="async"
                        />
                <div className="contact-final-overlay" />
            </div>

            <motion.div
                className="contact-final-content"
                initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="contact-final-eyebrow">
                    <span />
                    YOUR NEXT CHAPTER STARTS HERE
                    <span />
                </span>

                <div className="contact-final-compass">
                    <Compass size={28} strokeWidth={1.3} />
                </div>

                <h2>
                    The World Is Waiting.
                    <br />
                    <span>Let's Explore It.</span>
                </h2>

                <p>
                    Whether it's a peaceful escape, an exciting adventure or
                    a journey across borders, your next unforgettable experience
                    starts with one conversation.
                </p>

                <div className="contact-final-actions">
                    <Link to="/trips" className="contact-final-primary">
                        Start Your Journey
                        <ArrowUpRight size={19} />
                    </Link>

                    <Link to="/packages" className="contact-final-secondary">
                        Explore Packages
                        <MoveRight size={18} />
                    </Link>
                </div>

                <div className="contact-final-bottom">
                    <span>RJ GROUPS</span>
                    <span>YOUR FUTURE, OUR PRIORITY.</span>
                    <span>CONNECTING OPPORTUNITIES. CREATING FUTURES.</span>
                </div>
            </motion.div>
        </section>
    );
}
