
import { motion, useReducedMotion } from "framer-motion";
import {
    MapPin,
    Navigation,
    Clock,
    ArrowUpRight,
    Building2,
} from "lucide-react";
import "./OfficeLocation.css";

import { BUSINESS } from "../../../config/business.config";

const office = {
    name: BUSINESS.name,
    address: BUSINESS.address.street,
    city: BUSINESS.address.city,
    mapQuery: BUSINESS.mapQuery,
    workingDays: BUSINESS.workingDays,
    workingHours: BUSINESS.workingHours,
};

export default function OfficeLocation() {
    const reduceMotion = useReducedMotion();

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        office.mapQuery
    )}`;

    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
        office.mapQuery
    )}&output=embed`;

    return (
        <section className="office-location">
            <div className="office-location-container">

                {/* HEADER */}
                <motion.div
                    className="office-location-header"
                    initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="office-location-eyebrow">
                        <span />
                        COME SAY HELLO
                    </span>

                    <h2>
                        Find Us <span>Here.</span>
                    </h2>

                    <p>
                        We'd love to welcome you. Visit our office and let's
                        start planning your next journey together.
                    </p>
                </motion.div>

                {/* LOCATION CONTENT */}
                <motion.div
                    className="office-location-layout"
                    initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.75 }}
                >

                    {/* MAP */}
                    <div className="office-map-wrapper">
                        <iframe
                            title="RJ Groups office location map"
                            src={embedUrl}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />

                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="office-map-directions"
                        >
                            <Navigation size={17} />
                            Get Directions
                            <ArrowUpRight size={16} />
                        </a>

                        <div className="office-map-label">
                            <span className="office-map-dot" />
                            RJ GROUPS OFFICE
                        </div>
                    </div>

                    {/* OFFICE DETAILS */}
                    <div className="office-location-details">

                        <div className="office-detail-top">
                            <div className="office-detail-icon">
                                <Building2 size={24} />
                            </div>

                            <span>OUR OFFICE</span>
                        </div>

                        <h3>{office.name}</h3>

                        <div className="office-detail-item">
                            <span className="office-detail-item-icon">
                                <MapPin size={19} />
                            </span>

                            <div>
                                <small>OFFICE ADDRESS</small>
                                <p>{office.address}</p>
                                <strong>{office.city}</strong>
                            </div>
                        </div>

                        <div className="office-detail-divider" />

                        <div className="office-detail-item">
                            <span className="office-detail-item-icon">
                                <Clock size={19} />
                            </span>

                            <div>
                                <small>WORKING HOURS</small>
                                <p>{office.workingDays}</p>
                                <strong>{office.workingHours}</strong>
                            </div>
                        </div>

                        <div className="office-location-note">
                            <span>RJ GROUPS</span>
                            <p>
                                Your journey begins with a conversation.
                                We're looking forward to meeting you.
                            </p>
                        </div>

                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="office-directions-button"
                        >
                            Visit Our Office
                            <ArrowUpRight size={19} />
                        </a>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
    