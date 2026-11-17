import { useState } from "react";
import "./VehicleServices.css";

const filters = [
    { id: "all", label: "All" },
    { id: "bikes", label: "Bikes" },
    { id: "cars", label: "Cars" },
    { id: "suv", label: "SUV" },
];

export default function VehicleServices() {
  const [active, setActive] = useState("all");

    return (
        <section className="vehicle-services">
            <div className="vehicle-services-container">
                <h2 className="vehicle-services-title">Vehicle Services</h2>

                <div className="used-vehicles-filters">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            className={`vehicle-filter-btn ${active === f.id ? "active" : ""}`}
                            onClick={() => setActive(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="vehicle-grid">
                    {[
                        { id: 1, title: "Mountain Bike", cat: "bikes" },
                        { id: 2, title: "Sedan Car", cat: "cars" },
                        { id: 3, title: "SUV Rental", cat: "suv" },
                    ].filter((v) => active === "all" || v.cat === active).map((svc) => (
                        <article key={svc.id} className="vehicle-card">
                            <h3>{svc.title}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
