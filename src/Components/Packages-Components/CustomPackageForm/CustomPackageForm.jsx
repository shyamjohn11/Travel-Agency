
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    CalendarDays,
    Wallet,
    Hotel,
    Car,
    Compass,
    Plane,
    ArrowUpRight,
    Check,
    Send,
    X,
} from "lucide-react";
import "./CustomPackageForm.css";

const features = [
    {
        icon: MapPin,
        title: "Choose Your Destination",
        description: "Travel anywhere with a customised itinerary.",
    },
    {
        icon: CalendarDays,
        title: "Your Travel Dates",
        description: "Choose dates that fit your schedule.",
    },
    {
        icon: Hotel,
        title: "Stay Your Way",
        description: "Select accommodation to match your comfort.",
    },
    {
        icon: Wallet,
        title: "Your Budget",
        description: "Plan a trip around your preferred budget.",
    },
    {
        icon: Car,
        title: "Flexible Transport",
        description: "Choose suitable transport arrangements.",
    },
    {
        icon: Compass,
        title: "Personal Experiences",
        description: "Add sightseeing and activities you enjoy.",
    },
];

const initialForm = {
    name: "",
    phone: "",
    email: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travellers: "2",
    packageType: "Custom Holiday",
    accommodation: "Comfort",
    transport: "Need assistance",
    budget: "",
    interests: [],
    requirements: "",
};

const interestsList = [
    "Sightseeing",
    "Adventure",
    "Nature",
    "Shopping",
    "Beach Activities",
    "Cultural Experiences",
];

export default function CustomPackageForm() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(initialForm);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const toggleInterest = (interest) => {
        setForm((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((item) => item !== interest)
                : [...prev.interests, interest],
        }));
    };

    const openForm = () => {
        setShowForm(true);
        setTimeout(() => {
            document.getElementById("custom-package-form")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    const submitForm = (event) => {
        event.preventDefault();

        const subject = encodeURIComponent(
            `Custom Travel Package Enquiry - ${form.destination}`
        );

        const body = encodeURIComponent(`
CUSTOM PACKAGE ENQUIRY - RJ GROUPS

Customer: ${form.name}
Phone: ${form.phone}
Email: ${form.email}

Destination: ${form.destination}
Package Type: ${form.packageType}
Departure: ${form.departureDate}
Return: ${form.returnDate || "Not specified"}
Travellers: ${form.travellers}

Accommodation: ${form.accommodation}
Transport: ${form.transport}
Budget: ${form.budget || "Not specified"}
Interests: ${form.interests.join(", ") || "Not specified"}

Additional Requirements:
${form.requirements || "None"}
    `);

        window.location.href =
            `mailto:rjgroups2025@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section className="custom-packages-section">
            <div className="custom-packages-container">

                {/* Section Heading */}
                <motion.div
                    className="custom-packages-heading"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="custom-packages-eyebrow">
                        <span />
                        YOUR TRIP. YOUR WAY.
                    </span>

                    <h2>
                        Travel Without
                        <br />
                        <span>Limits.</span> Create Your Own Trip.
                    </h2>

                    <p>
                        Every traveller is different. Tell us what you have in mind
                        and let RJ Groups help create a personalised travel experience
                        around your preferences.
                    </p>
                </motion.div>

                {/* Main Custom Package Layout */}
                <div className="custom-packages-layout">

                    <motion.div
                        className="custom-packages-visual"
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/images/packages-hero.jpg"
                            alt="Beautiful destination for a customised holiday"
                            loading="lazy"
                        />

                        <div className="custom-visual-overlay" />

                        <div className="custom-visual-content">
                            <span>MADE AROUND YOU</span>
                            <h3>
                                Your Journey.
                                <br />
                                Your Story.
                            </h3>
                            <p>
                                Discover the freedom of a holiday designed around you.
                            </p>
                        </div>

                        <div className="custom-visual-badge">
                            <Plane size={19} />
                            <span>PERSONALISED TRAVEL</span>
                        </div>
                    </motion.div>

                    <div className="custom-packages-content">
                        <span className="custom-content-label">
                            DESIGN YOUR HOLIDAY
                        </span>

                        <h3>A holiday that feels like yours.</h3>

                        <p className="custom-content-description">
                            From a relaxing getaway to an adventure-filled escape,
                            customise your travel plans with flexible options.
                        </p>

                        <div className="custom-features-grid">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;

                                return (
                                    <motion.div
                                        className="custom-feature"
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08 }}
                                    >
                                        <div className="custom-feature-icon">
                                            <Icon size={20} />
                                        </div>

                                        <div>
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <button
                            className="custom-package-button"
                            type="button"
                            onClick={openForm}
                        >
                            Create My Custom Package
                            <ArrowUpRight size={19} />
                        </button>
                    </div>
                </div>

                {/* Custom Package Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            id="custom-package-form"
                            className="custom-package-form-wrapper"
                            initial={{ opacity: 0, height: 0, y: 30 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 25 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="custom-package-form-card">

                                <div className="custom-form-heading">
                                    <div>
                                        <span>BUILD YOUR OWN PACKAGE</span>
                                        <h3>Tell us your travel preferences.</h3>
                                        <p>
                                            Share a few details and our team can help plan
                                            your personalised trip.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="custom-form-close"
                                        onClick={() => setShowForm(false)}
                                        aria-label="Close custom package form"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={submitForm}>
                                    <div className="custom-form-grid">

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-name">Full Name *</label>
                                            <input
                                                id="custom-name"
                                                name="name"
                                                value={form.name}
                                                onChange={updateField}
                                                placeholder="Your full name"
                                                required
                                            />
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-phone">Phone Number *</label>
                                            <input
                                                id="custom-phone"
                                                name="phone"
                                                type="tel"
                                                value={form.phone}
                                                onChange={updateField}
                                                placeholder="Your phone number"
                                                pattern="[0-9+() -]{7,20}"
                                                required
                                            />
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-email">Email Address *</label>
                                            <input
                                                id="custom-email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={updateField}
                                                placeholder="Your email address"
                                                required
                                            />
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-destination">
                                                Preferred Destination *
                                            </label>
                                            <input
                                                id="custom-destination"
                                                name="destination"
                                                value={form.destination}
                                                onChange={updateField}
                                                placeholder="e.g. Kashmir, Dubai, Kerala"
                                                required
                                            />
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-departure">
                                                Departure Date *
                                            </label>
                                            <input
                                                id="custom-departure"
                                                type="date"
                                                name="departureDate"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={form.departureDate}
                                                onChange={updateField}
                                                required
                                            />
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-return">Return Date</label>
                                            <input
                                                id="custom-return"
                                                type="date"
                                                name="returnDate"
                                                min={
                                                    form.departureDate ||
                                                    new Date().toISOString().split("T")[0]
                                                }
                                                value={form.returnDate}
                                                onChange={updateField}
                                            />
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-travellers">
                                                Number of Travellers *
                                            </label>
                                            <input
                                                id="custom-travellers"
                                                type="number"
                                                name="travellers"
                                                min="1"
                                                max="100"
                                                value={form.travellers}
                                                onChange={updateField}
                                                required
                                            />
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-package-type">
                                                Package Type
                                            </label>
                                            <select
                                                id="custom-package-type"
                                                name="packageType"
                                                value={form.packageType}
                                                onChange={updateField}
                                            >
                                                <option>Custom Holiday</option>
                                                <option>Family Holiday</option>
                                                <option>Honeymoon</option>
                                                <option>Adventure Trip</option>
                                                <option>Group Tour</option>
                                                <option>Business Travel</option>
                                            </select>
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-accommodation">
                                                Accommodation Preference
                                            </label>
                                            <select
                                                id="custom-accommodation"
                                                name="accommodation"
                                                value={form.accommodation}
                                                onChange={updateField}
                                            >
                                                <option>Comfort</option>
                                                <option>Budget</option>
                                                <option>Premium</option>
                                                <option>Luxury</option>
                                                <option>No accommodation required</option>
                                            </select>
                                        </div>

                                        <div className="custom-form-field">
                                            <label htmlFor="custom-transport">
                                                Transport Preference
                                            </label>
                                            <select
                                                id="custom-transport"
                                                name="transport"
                                                value={form.transport}
                                                onChange={updateField}
                                            >
                                                <option>Need assistance</option>
                                                <option>Flight</option>
                                                <option>Private Car</option>
                                                <option>Bus</option>
                                                <option>Train</option>
                                                <option>Own Transport</option>
                                            </select>
                                        </div>

                                        <div className="custom-form-field custom-field-full">
                                            <label htmlFor="custom-budget">
                                                Approximate Total Budget
                                            </label>
                                            <select
                                                id="custom-budget"
                                                name="budget"
                                                value={form.budget}
                                                onChange={updateField}
                                            >
                                                <option value="">Select your budget</option>
                                                <option>Below ₹10,000</option>
                                                <option>₹10,000 – ₹25,000</option>
                                                <option>₹25,000 – ₹50,000</option>
                                                <option>₹50,000 – ₹1,00,000</option>
                                                <option>Above ₹1,00,000</option>
                                                <option>Flexible / Not decided</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="custom-interest-section">
                                        <label>What would you like to experience?</label>

                                        <div className="custom-interest-options">
                                            {interestsList.map((interest) => (
                                                <button
                                                    type="button"
                                                    key={interest}
                                                    className={`custom-interest-chip ${form.interests.includes(interest) ? "active" : ""
                                                        }`}
                                                    onClick={() => toggleInterest(interest)}
                                                >
                                                    <Check size={14} />
                                                    {interest}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="custom-form-field custom-field-full">
                                        <label htmlFor="custom-requirements">
                                            Additional Requirements
                                        </label>
                                        <textarea
                                            id="custom-requirements"
                                            name="requirements"
                                            rows="4"
                                            value={form.requirements}
                                            onChange={updateField}
                                            placeholder="Tell us about your preferred places, activities or special requirements..."
                                        />
                                    </div>

                                    <div className="custom-form-bottom">
                                        <p>
                                            Submitting this form sends a travel enquiry.
                                            Your booking is not confirmed until agreed with RJ Groups.
                                        </p>

                                        <button
                                            type="submit"
                                            className="custom-form-submit"
                                        >
                                            Send Custom Enquiry
                                            <Send size={17} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
