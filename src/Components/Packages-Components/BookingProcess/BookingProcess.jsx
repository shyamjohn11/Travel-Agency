
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  MessageCircle,
  ClipboardCheck,
  PlaneTakeoff,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./BookingProcess.css";

const steps = [
  {
    id: "01",
    label: "DISCOVER",
    title: "Explore Packages",
    description:
      "Discover domestic tours, international holidays and accommodation options that match your travel interests.",
    icon: Search,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Beautiful mountain destination",
  },
  {
    id: "02",
    label: "CONNECT",
    title: "Share Your Requirements",
    description:
      "Tell us your destination, travel dates, number of travellers and preferred budget.",
    icon: MessageCircle,
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Traveller exploring a destination",
  },
  {
    id: "03",
    label: "CONFIRM",
    title: "Confirm Your Booking",
    description:
      "Review the proposed itinerary, inclusions, pricing and booking terms before confirming.",
    icon: ClipboardCheck,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Modern city skyline",
  },
  {
    id: "04",
    label: "TRAVEL",
    title: "Enjoy Your Journey",
    description:
      "Receive your booking details and get ready for your planned travel experience.",
    icon: PlaneTakeoff,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Scenic travel landscape",
  },
];

const cardVariants = {
  hidden: () => ({
    opacity: 0,
    y: 65,
    rotateX: 8,
    transition: {
      duration: 0.5,
    },
  }),
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.75,
      delay: custom * 0.13,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function BookingCard({ step, index, reducedMotion }) {
  const Icon = step.icon;

  return (
    <motion.article
      className="booking-image-card"
      custom={index}
      variants={cardVariants}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={
        reducedMotion
          ? undefined
          : {
            y: -9,
            transition: { duration: 0.3 },
          }
      }
    >
      <div className="booking-card-image">
        <img
          src={step.image}
          alt={step.imageAlt}
          loading="lazy"
        />

        <div className="booking-card-overlay" />

        <span className="booking-card-number">{step.id}</span>

        <div className="booking-card-top">
          <span className="booking-card-label">
            <span className="booking-label-dot" />
            {step.label}
          </span>

          <span className="booking-card-icon">
            <Icon size={21} strokeWidth={1.8} />
          </span>
        </div>

        <div className="booking-card-content">
          <span className="booking-card-step">
            STEP {step.id}
          </span>

          <h3>{step.title}</h3>

          <p>{step.description}</p>

          <div className="booking-card-bottom">
            <span>RJ GROUPS</span>
            <span className="booking-card-arrow">
              <ArrowUpRight size={19} />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function BookingProcess() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="booking-process-section">
      <div className="booking-process-container">

        {/* Section Heading */}
        <motion.div
          className="booking-process-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="booking-eyebrow">
            <span />
            YOUR JOURNEY STARTS HERE
          </div>

          <div className="booking-heading-row">
            <h2>
              From Planning
              <br />
              To <span>Takeoff.</span>
            </h2>

            <p>
              Every great journey begins with a simple plan.
              We make your travel experience smooth, clear and
              memorable from the first enquiry to your return.
            </p>
          </div>
        </motion.div>

        {/* Image Cards */}
        <div className="booking-image-grid">
          {steps.map((step, index) => (
            <BookingCard
              key={step.id}
              step={step}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="booking-process-cta"
          initial={reducedMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="booking-cta-content">
            <span>READY FOR YOUR NEXT ADVENTURE?</span>
            <h3>
              Your next adventure is just one enquiry away.
            </h3>
          </div>

          <Link to="/contact" className="booking-cta-button">
            Start Your Booking
            <ArrowUpRight size={19} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
