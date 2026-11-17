import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    MapPin,
    Phone,
    Mail,
    Send,
    CalendarDays,
    Users,
    Compass,
    CheckCircle2,
} from "lucide-react";
import "./ContactEnquiry.css";
import { BUSINESS } from "@/config/business.config";
import { addEnquiry } from "@/services/db";
import { MessageCircle } from "lucide-react";

const socialLinks = [
    { name: "Instagram", url: BUSINESS.social.facebook },
    { name: "Facebook", url: BUSINESS.social.instagram },
    { name: "LinkedIn", url: BUSINESS.social.linkedin },
].filter((social) => social.url && social.url !== "#");

const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    travellers: "2",
    tripType: "",
    message: "",
};

const initialErrors = {
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    travellers: "",
    tripType: "",
    message: "",
};

export default function ContactEnquiry() {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    const updateField = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = { ...initialErrors };
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required.";
            isValid = false;
        } else if (!/^\+?[\d\s()-]+$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number.";
            isValid = false;
        }

        if (!formData.destination.trim()) {
            newErrors.destination = "Destination is required.";
            isValid = false;
        }

        if (!formData.travelDate) {
            newErrors.travelDate = "Travel date is required.";
            isValid = false;
        }

        if (!formData.travellers) {
            newErrors.travellers = "Number of travellers is required.";
            isValid = false;
        }

        if (!formData.tripType) {
            newErrors.tripType = "Trip type is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const res = addEnquiry({
              name: formData.fullName.trim(),
              phone: formData.phone.trim(),
              email: formData.email.trim(),
              travelDate: formData.travelDate,
              travellers: Number(formData.travellers) || 1,
              message: formData.message.trim(),
              packageTitle: formData.destination,
              packageId: "",
              selection: null,
              source: "contact-form",
            });
            if (!res.ok) throw new Error(res.error || "Failed to save enquiry.");
            setSubmitted(true);
        } catch (error) {
            setSubmitError(error.message || "Failed to submit enquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const reveal = shouldReduceMotion
        ? {}
        : {
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
          };

    return (
        <section className="contact-enquiry" id="contact-form">
            <div className="contact-enquiry-container">

                {/* LEFT CONTENT */}
                <motion.div
                    className="enquiry-intro"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <span className="enquiry-eyebrow">
                        <span className="enquiry-eyebrow-line" />
                        START YOUR JOURNEY
                    </span>

                    <h2>
                        Let's Make Your Next Trip{" "}
                        <span>Unforgettable.</span>
                    </h2>

                    <p className="enquiry-description">
                        Every memorable journey begins with a simple conversation.
                        Tell us where you want to go, and let RJ Groups help you
                        turn your travel dreams into meaningful experiences.
                    </p>

                    <div className="enquiry-image-wrap">
                        <img
                            src="/images/contact-hero.jpg"
                            alt="Beautiful scenic travel destination"
                            className="enquiry-main-image"
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="enquiry-image-overlay" />

                        <div className="enquiry-image-caption">
                            <span>DISCOVER MORE</span>
                            <strong>Explore beyond the ordinary.</strong>
                        </div>

                        <div className="enquiry-floating-badge">
                            <div className="enquiry-badge-icon">
                                <Compass size={23} />
                            </div>
                            <div>
                                <strong>Made for explorers</strong>
                                <span>Journeys worth remembering</span>
                            </div>
                        </div>
                    </div>

                    <div className="enquiry-social">
                        <div>
                            <span className="enquiry-small-label">FOLLOW OUR JOURNEY</span>
                            <div className="enquiry-social-links">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                    >
                                        <span>{social.name}</span>
                                        <ArrowUpRight size={13} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="enquiry-contact-details">
                        {BUSINESS.phone && (
                            <a href={`tel:${BUSINESS.phone}`}>
                                <span className="enquiry-contact-icon">
                                    <Phone size={17} />
                                </span>
                                <span>
                                    <small>CALL US</small>
                                    <strong>{BUSINESS.phone}</strong>
                                </span>
                            </a>
                        )}
                        <a
                            href={`https://wa.me/${BUSINESS.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi RJ Groups, I would like to enquire about a trip.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="enquiry-contact-icon">
                                <MessageCircle size={17} />
                            </span>
                            <span>
                                <small>WHATSAPP US</small>
                                <strong>{BUSINESS.phone}</strong>
                            </span>
                        </a>

                        {BUSINESS.email && (
                            <a href={`mailto:${BUSINESS.email}`}>
                                <span className="enquiry-contact-icon">
                                    <Mail size={17} />
                                </span>
                                <span>
                                    <small>EMAIL US</small>
                                    <strong>{BUSINESS.email}</strong>
                                </span>
                            </a>
                        )}

                        {BUSINESS.address.full && (
                            <div className="enquiry-contact-address">
                                <span className="enquiry-contact-icon">
                                    <MapPin size={17} />
                                </span>
                                <span>
                                    <small>VISIT US</small>
                                    <strong>{BUSINESS.address.full}</strong>
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* RIGHT FORM */}
                <motion.div
                    className="enquiry-form-panel"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                >
                    <div className="enquiry-form-heading">
                        <div>
                            <span className="enquiry-eyebrow">
                                <span className="enquiry-eyebrow-line" />
                                YOUR NEXT ADVENTURE
                            </span>
                            <h3>Plan Your Journey</h3>
                            <p>
                                Share a few details and we'll help you get started.
                            </p>
                        </div>

                        <div className="enquiry-form-icon">
                            <Send size={22} />
                        </div>
                    </div>

                    <form className="enquiry-form" onSubmit={handleSubmit}>
                        <div className="enquiry-field">
                            <label htmlFor="fullName">Full Name <span>*</span></label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={updateField}
                                autoComplete="name"
                                required
                                aria-invalid={!!errors.fullName}
                                aria-describedby="fullName-error"
                            />
                            {errors.fullName && (
                                <p id="fullName-error" className="field-error">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        <div className="enquiry-form-grid">
                            <div className="enquiry-field">
                                <label htmlFor="email">Email Address <span>*</span></label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={updateField}
                                    autoComplete="email"
                                    required
                                    aria-invalid={!!errors.email}
                                    aria-describedby="email-error"
                                />
                                {errors.email && (
                                    <p id="email-error" className="field-error">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="enquiry-field">
                                <label htmlFor="phone">Phone Number <span>*</span></label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+91 00000 00000"
                                    value={formData.phone}
                                    onChange={updateField}
                                    autoComplete="tel"
                                    required
                                    aria-invalid={!!errors.phone}
                                    aria-describedby="phone-error"
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="field-error">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="enquiry-field">
                            <label htmlFor="destination">Preferred Destination <span>*</span></label>
                            <input
                                id="destination"
                                name="destination"
                                type="text"
                                placeholder="Where would you like to go?"
                                value={formData.destination}
                                onChange={updateField}
                                required
                                aria-invalid={!!errors.destination}
                                aria-describedby="destination-error"
                            />
                            {errors.destination && (
                                <p id="destination-error" className="field-error">
                                    {errors.destination}
                                </p>
                            )}
                        </div>

                        <div className="enquiry-form-grid">
                            <div className="enquiry-field enquiry-input-icon">
                                <label htmlFor="travelDate">Travel Date</label>
                                <div className="enquiry-input-wrap">
                                    <CalendarDays size={17} />
                                    <input
                                        id="travelDate"
                                        name="travelDate"
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        value={formData.travelDate}
                                        onChange={updateField}
                                        required
                                        aria-invalid={!!errors.travelDate}
                                        aria-describedby="travelDate-error"
                                    />
                                    {errors.travelDate && (
                                        <p id="travelDate-error" className="field-error">
                                            {errors.travelDate}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="enquiry-field enquiry-input-icon">
                                <label htmlFor="travellers">Number of Travellers</label>
                                <div className="enquiry-input-wrap">
                                    <Users size={17} />
                                    <select
                                        id="travellers"
                                        name="travellers"
                                        value={formData.travellers}
                                        onChange={updateField}
                                        required
                                        aria-invalid={!!errors.travellers}
                                        aria-describedby="travellers-error"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                                            <option key={number} value={number}>
                                                {number} {number === 1 ? "Traveller" : "Travellers"}
                                            </option>
                                        ))}
                                        <option value="10+">More than 10</option>
                                    </select>
                                    {errors.travellers && (
                                        <p id="travellers-error" className="field-error">
                                            {errors.travellers}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="enquiry-field">
                            <label htmlFor="tripType">Trip Type <span>*</span></label>
                            <select
                                id="tripType"
                                name="tripType"
                                value={formData.tripType}
                                onChange={updateField}
                                required
                                aria-invalid={!!errors.tripType}
                                aria-describedby="tripType-error"
                            >
                                <option value="" disabled>
                                    Select your trip type
                                </option>
                                <option value="Domestic">Domestic</option>
                                <option value="International">International</option>
                                <option value="Honeymoon">Honeymoon</option>
                                <option value="Family">Family</option>
                            </select>
                            {errors.tripType && (
                                <p id="tripType-error" className="field-error">
                                    {errors.tripType}
                                </p>
                            )}
                        </div>

                        <div className="enquiry-field">
                            <label htmlFor="message">Tell Us About Your Plans</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Share your preferences, budget, special requests..."
                                value={formData.message}
                                onChange={updateField}
                            />
                        </div>

                        <div className="enquiry-form-footer">
                            <p>
                                <span>*</span> Required fields
                            </p>

                            {submitError && (
                                <p className="form-submit-error" role="alert">
                                    {submitError}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="enquiry-submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        Submit Enquiry
                                        <ArrowUpRight size={19} />
                                    </>
                                )}
                            </button>
                        </div>

                        {submitted && (
                            <p className="enquiry-success" role="status">
                                <CheckCircle2 size={17} />
                                Your message has been sent. We'll get back to you soon.
                            </p>
                        )}
                    </form>

                    <div className="enquiry-form-bottom">
                        <span>RJ GROUPS</span>
                        <span>CONNECTING OPPORTUNITIES. CREATING FUTURES.</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
