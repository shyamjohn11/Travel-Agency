import { useState } from "react";
import "./TouristServices.css";

const categories = [
    { id: "all", label: "All" },
    { id: "adventure", label: "Adventure" },
    { id: "cultural", label: "Cultural" },
    { id: "nature", label: "Nature" },
    { id: "relaxation", label: "Relaxation" },
];

export default function TouristServices() {
    const [active, setActive] = useState("all");

    return (
        <section className="tourist-services">
            <div className="tourist-services-container">
                <h2 className="tourist-services-title">Tourist Services</h2>

                <div className="tourist-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`tourist-category-btn ${active === cat.id ? "active" : ""}`}
                            onClick={() => setActive(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="tourist-services-grid">
                    {[
                        { id: 1, title: "Heritage Walk", cat: "cultural" },
                        { id: 2, title: "Jungle Safari", cat: "adventure" },
                        { id: 3, title: "Beach Retreat", cat: "relaxation" },
                        { id: 4, title: "Mountain Trek", cat: "nature" },
                    ].filter((s) => active === "all" || s.cat === active).map((svc) => (
                        <article key={svc.id} className="tourist-card">
                            <h3>{svc.title}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
