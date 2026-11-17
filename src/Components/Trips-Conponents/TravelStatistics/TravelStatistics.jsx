
import { useEffect, useRef } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    animate,
} from "framer-motion";
import {
    Compass,
    Globe2,
    Users,
    Headset,
    ArrowUpRight,
} from "lucide-react";
import "./TravelStatistics.css";

const statistics = [
    {
        id: "01",
        value: 12,
        suffix: "+",
        label: "Years of Experience",
        description: "Creating journeys with care and experience.",
        icon: Compass,
    },
    {
        id: "02",
        value: 25,
        suffix: "+",
        label: "Destinations",
        description: "Explore memorable places across the world.",
        icon: Globe2,
    },
    {
        id: "03",
        value: 500,
        suffix: "+",
        label: "Happy Travellers",
        description: "Helping travellers create lasting memories.",
        icon: Users,
    },
    {
        id: "04",
        value: 24,
        suffix: "/7",
        label: "Travel Assistance",
        description: "Support when you need help on your journey.",
        icon: Headset,
    },
];

const easing = [0.22, 1, 0.36, 1];

function StatCounter({ value, suffix, reduceMotion }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.5,
    });

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) =>
        Math.round(latest).toLocaleString("en-IN")
    );

    useEffect(() => {
        if (!isInView) return;

        if (reduceMotion) {
            count.set(value);
            return;
        }

        const controls = animate(count, value, {
            duration: 1.7,
            ease: easing,
        });

        return () => controls.stop();
    }, [isInView, value, reduceMotion, count]);

    return (
        <div className="travel-stat-number" ref={ref}>
            <motion.span>{rounded}</motion.span>
            <span className="travel-stat-suffix">{suffix}</span>
        </div>
    );
}

function StatisticCard({ item, index, reduceMotion }) {
    const Icon = item.icon;

    return (
        <motion.article
            className="travel-stat-card"
            initial={
                reduceMotion
                    ? false
                    : { opacity: 0, y: 25 }
            }
            whileInView={
                reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: easing,
            }}
        >
            <div className="travel-stat-card-top">
                <span className="travel-stat-index">{item.id}</span>

                <div className="travel-stat-icon">
                    <Icon size={21} strokeWidth={1.7} />
                </div>
            </div>

            <StatCounter
                value={item.value}
                suffix={item.suffix}
                reduceMotion={reduceMotion}
            />

            <h3>{item.label}</h3>

            <p>{item.description}</p>

            <div className="travel-stat-card-line" />
        </motion.article>
    );
}

export default function TravelStatistics() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="travel-statistics">
            <div className="travel-statistics-container">
                {/* SECTION HEADER */}
                <motion.div
                    className="travel-statistics-header"
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0, y: 20 }
                    }
                    whileInView={
                        reduceMotion
                            ? undefined
                            : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: easing }}
                >
                    <div className="travel-statistics-heading">
                        <span className="travel-statistics-eyebrow">
                            <span />
                            OUR JOURNEY IN NUMBERS
                        </span>

                        <h2>
                            Every journey.
                            <br />
                            <span>Every milestone.</span>
                        </h2>
                    </div>

                    <div className="travel-statistics-intro">
                        <p>
                            Every number represents a journey, a connection
                            and a memory created with RJ Groups.
                        </p>

                        <a href="/about" className="travel-statistics-link">
                            Discover our story
                            <ArrowUpRight size={16} />
                        </a>
                    </div>
                </motion.div>

                {/* STATISTICS GRID */}
                <div className="travel-statistics-grid">
                    {statistics.map((item, index) => (
                        <StatisticCard
                            key={item.id}
                            item={item}
                            index={index}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </div>

                {/* BOTTOM MESSAGE */}
                <motion.div
                    className="travel-statistics-footer"
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0, y: 15 }
                    }
                    whileInView={
                        reduceMotion
                            ? undefined
                            : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: easing }}
                >
                    <span className="travel-statistics-footer-dot" />
                    <p>
                        More than destinations. We create experiences
                        worth remembering.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
