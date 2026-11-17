
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import "./TravelStory.css";

export default function TravelStory() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="travel-story">

            <div className="travel-story-image">
                <motion.img
                    src="/images/travel-story.jpg"
                    alt="Beautiful scenic travel landscape with mountains and a peaceful lake"
                    initial={reduceMotion ? false : { scale: 1.12 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="travel-story-overlay" />

                <div className="travel-story-content">

                    <motion.div
                        className="travel-story-label"
                        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <Compass size={16} />
                        <span>THE ART OF TRAVEL</span>
                    </motion.div>

                    <motion.h2
                        initial={reduceMotion ? false : { opacity: 0, y: 45 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        Every journey
                        <br />
                        tells a <span>story.</span>
                    </motion.h2>

                    <motion.p
                        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                    >
                        Beyond destinations and itineraries, travel is about
                        the moments we collect, the people we meet and the
                        memories that stay with us forever.
                    </motion.p>

                    <motion.div
                        className="travel-story-actions"
                        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                    >
                        <Link to="/trips" className="travel-story-button">
                            Discover Our Trips
                            <ArrowUpRight size={18} />
                        </Link>

                        <span className="travel-story-caption">
                            YOUR NEXT STORY STARTS HERE
                        </span>
                    </motion.div>
                </div>

                <div className="travel-story-bottom">
                    <span>RJ GROUPS</span>

                    <span className="travel-story-scroll">
                        SCROLL TO EXPLORE
                        <ArrowDown size={15} />
                    </span>

                    <span>EST. FOR EVERY JOURNEY</span>
                </div>
            </div>

        </section>
    );
}
