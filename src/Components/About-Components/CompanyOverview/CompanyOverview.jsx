
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    Building2,
    Compass,
    Globe2,
    Handshake,
    Plane,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./CompanyOverview.css";

const companyServices = [
    {
        number: "01",
        title: "Travel Planning",
        description: "Thoughtfully planned domestic and international journeys.",
        icon: Plane,
    },
    {
        number: "02",
        title: "Destination Experiences",
        description: "Discover destinations and experiences that inspire you.",
        icon: Globe2,
    },
    {
        number: "03",
        title: "Personal Assistance",
        description: "Guidance and support throughout your travel planning.",
        icon: Handshake,
    },
];

const companyValues = [
    {
        title: "Trust",
        description: "Building relationships through transparent communication.",
        icon: ShieldCheck,
    },
    {
        title: "Discovery",
        description: "Making new destinations and opportunities accessible.",
        icon: Compass,
    },
    {
        title: "Commitment",
        description: "Putting traveller needs at the centre of our approach.",
        icon: Sparkles,
    },
];

const CompanyOverview = () => {
    const reduceMotion = useReducedMotion();

    const reveal = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 30,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <section className="company-overview">
            <div className="company-overview-container">

                {/* HEADER */}
                <motion.div
                    className="company-overview-header"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <div>
                        <span className="company-overview-label">
                            <span />
                            WHO WE ARE
                        </span>

                        <h2>
                            A closer look at
                            <br />
                            <span>RJ Groups.</span>
                        </h2>
                    </div>

                    <p>
                        A company built around people, possibilities,
                        and the belief that every journey deserves
                        thoughtful planning.
                    </p>
                </motion.div>

                {/* COMPANY INTRODUCTION */}
                <div className="company-overview-main">

                    <motion.div
                        className="company-overview-image"
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : -35,
                        }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/images/company-overview.jpg"
                            alt="Travel planning and destination exploration"
                            loading="lazy"
                        />

                        <div className="company-overview-image-overlay" />

                        <div className="company-image-brand">
                            <Building2 size={19} />
                            <div>
                                <span>RJ GROUPS</span>
                                <small>CONSULTANCY & TRAVEL AGENCY</small>
                            </div>
                        </div>

                        <div className="company-image-caption">
                            CONNECTING PEOPLE WITH POSSIBILITIES.
                        </div>
                    </motion.div>

                    <motion.div
                        className="company-overview-description"
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : 35,
                        }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <span className="company-small-heading">
                            OUR COMPANY
                        </span>

                        <h3>
                            More than a name.
                            <br />
                            <span>A commitment.</span>
                        </h3>

                        <p>
                            RJ Groups Consultancy and Travel Agency Private
                            Limited is focused on connecting people with
                            meaningful opportunities and travel experiences.
                        </p>

                        <p>
                            Through our travel-focused services, we aim to
                            simplify the planning process, help travellers
                            explore new destinations, and make every journey
                            more convenient and memorable.
                        </p>

                        <p>
                            Our approach is built on understanding individual
                            needs, clear communication, and attention to the
                            details that make a difference.
                        </p>

                        <Link to="/contact" className="company-overview-link">
                            Connect with RJ Groups
                            <span>
                                <ArrowUpRight size={17} />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* SERVICES */}
                <div className="company-services">
                    <motion.div
                        className="company-services-heading"
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span>WHAT WE FOCUS ON</span>
                        <h3>Our areas of service.</h3>
                    </motion.div>

                    <div className="company-services-grid">
                        {companyServices.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <motion.div
                                    className="company-service-card"
                                    key={service.number}
                                    initial={{
                                        opacity: 0,
                                        y: reduceMotion ? 0 : 25,
                                    }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: reduceMotion ? 0 : index * 0.12,
                                    }}
                                >
                                    <div className="company-service-top">
                                        <span>{service.number}</span>
                                        <Icon size={22} strokeWidth={1.6} />
                                    </div>

                                    <h4>{service.title}</h4>
                                    <p>{service.description}</p>

                                    <div className="company-service-line" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* COMPANY VALUES */}
                <motion.div
                    className="company-values"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="company-values-heading">
                        <span>OUR FOUNDATION</span>
                        <h3>What guides us.</h3>
                    </div>

                    <div className="company-values-list">
                        {companyValues.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div className="company-value-item" key={value.title}>
                                    <div className="company-value-icon">
                                        <Icon size={19} />
                                    </div>

                                    <div>
                                        <h4>{value.title}</h4>
                                        <p>{value.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default CompanyOverview;
