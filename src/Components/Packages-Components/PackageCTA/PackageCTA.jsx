import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./PackageCTA.css";

export default function PackageCTA() {
  const [showForm, setShowForm] = useState(false);
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const phone = form.get("phone");
    const destination = form.get("destination");
    const travellers = form.get("travellers");
    const date = form.get("date");
    const message = form.get("message");

    const subject = encodeURIComponent("Travel Package Enquiry");
    const body = encodeURIComponent(
      `Name: ${ name } \nPhone: ${ phone } \nDestination: ${ destination } \nTravellers: ${ travellers } \nTravel Date: ${ date } \nRequirements: ${ message } `
    );

    window.location.href =
      `mailto:rjgroups2025 @gmail.com?subject = ${ subject }& body=${ body } `;

    setShowForm(false);
  };

  return (
    <section className="package-cta">
      <div className="package-cta__image" />
      <div className="package-cta__overlay" />

      <motion.div
        className="package-cta__content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <span className="package-cta__eyebrow">
          <Compass size={15} />
          YOUR NEXT ADVENTURE STARTS HERE
        </span>

        <h2>
          The World Is Waiting.
          <br />
          <span>Where Will You Go?</span>
        </h2>

        <p>
          From peaceful escapes to unforgettable adventures,
          let's create a travel experience around your plans.
        </p>

        <div className="package-cta__actions">
          <button
            className="package-cta__button"
            onClick={() => setShowForm(true)}
          >
            Plan My Trip
            <ArrowUpRight size={19} />
          </button>

          <Link to="/contact" className="package-cta__secondary">
            Talk to Our Team
          </Link>
        </div>

        <div className="package-cta__bottom">
          <span>PERSONALISED TRAVEL PLANNING</span>
          <span className="package-cta__line" />
          <span>RJ GROUPS</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="package-cta__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="package-cta__form-card"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="package-cta__close"
                onClick={() => setShowForm(false)}
                aria-label="Close enquiry form"
              >
                <X size={21} />
              </button>

              <span className="package-cta__form-label">
                LET'S PLAN YOUR JOURNEY
              </span>

              <h3>Start Your Travel Enquiry</h3>
              <p>Tell us a little about your trip.</p>

              <form onSubmit={handleSubmit}>
                <div className="package-cta__form-grid">
                  <input
                    name="name"
                    placeholder="Your name"
                    required
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    required
                  />
                  <input
                    name="destination"
                    placeholder="Preferred destination"
                    required
                  />
                  <input
                    name="travellers"
                    type="number"
                    min="1"
                    placeholder="No. of travellers"
                    required
                  />
                  <input
                    name="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <textarea
                  name="message"
                  rows="3"
                  placeholder="Tell us about your travel plans..."
                />

                <button type="submit" className="package-cta__submit">
                  Send Enquiry
                  <ArrowUpRight size={18} />
                </button>

                <small>
                  <CheckCircle2 size={13} />
                  Your enquiry will open in your email application.
                </small>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
