import { useParams } from "react-router-dom";
import SEO from "../../Shared-Components/SEO/SEO";
import StructuredData from "../../Shared-Components/StructuredData/StructuredData";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import { DOMESTIC_DESTINATIONS } from "../../config/seo.config";
import { PAGES } from "../../config/seo.config";

export default function DomesticDestination() {
    const { destination } = useParams();
    const dest = DOMESTIC_DESTINATIONS.find(d => d.id === destination);

    if (!dest) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h1>Destination Not Found</h1>
                <p>The destination you're looking for doesn't exist.</p>
                <a href="/" style={{ color: "#FFAA33", textDecoration: "none" }}>Go to Home</a>
            </div>
        );
    }

    const breadcrumbList = [
        { name: 'Home', url: `${PAGES.home.path}` },
        { name: 'Domestic Packages', url: `${PAGES.packages.path}` },
        { name: dest.name, url: `${PAGES.packages.path}/domestic/${dest.id}` },
    ];

    return (
        <>
            <Navbar />
            <SEO
                title={`RJ Groups | ${dest.name} Tour Package - Best ${dest.name} Holiday Package`}
                description={
                    `Explore ${dest.name} with RJ Groups - ${dest.description} Best time to visit: ${dest.bestTimeToVisit}. Duration: ${dest.duration}. Book your ${dest.name} tour package from Kanyakumari, Tamil Nadu with trusted experts since 2012.`
                }
                keywords={
                    `${dest.name} tour package, ${dest.name} travel, ${dest.country} tourism, domestic tour packages India, travel agency Kanyakumari, travel agency Tamil Nadu, ${dest.name} holiday package, book ${dest.name} trip`
                }
                url={`${PAGES.domain}/domestic-packages/${dest.id}`}
                type="TravelAgency"
            />
            <StructuredData
                pageTitle={`RJ Groups | ${dest.name} Tour Package - Best ${dest.name} Holiday Package`}
                pageDescription={
                    `Explore ${dest.name} with RJ Groups - ${dest.description} Best time to visit: ${dest.bestTimeToVisit}. Duration: ${dest.duration}. Book your ${dest.name} tour package from Kanyakumari, Tamil Nadu with trusted experts since 2012.`
                }
                pageUrl={`${PAGES.domain}/domestic-packages/${dest.id}`}
                breadcrumbList={breadcrumbList}
            />
            <div className="destination-page">
                <div className="container">
                    <nav className="breadcrumb">
                        <ol>
                            {breadcrumbList.map((crumb, idx) => (
                                <li key={idx}>
                                    <a href={crumb.url}>{crumb.name}</a>
                                    {idx < breadcrumbList.length - 1 ? " / " : ""}
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <header className="dest-hero">
                        <div className="dest-hero-content">
                            <span className="dest-category-badge">{dest.category}</span>
                            <h1>{dest.name}</h1>
                            <span className="dest-country">{dest.country}</span>
                            <p>{dest.description}</p>
                            <div className="dest-meta">
                                <span><strong>Best Time to Visit:</strong> {dest.bestTimeToVisit}</span>
                                <span><strong>Duration:</strong> {dest.duration}</span>
                            </div>
                            <a href="/contact?destination=${encodeURIComponent(dest.name)}" className="dest-cta">
                                Book Your Trip
                            </a>
                        </div>
                    </header>

                    <section className="dest-highlights">
                        <h2>Trip Highlights</h2>
                        <div className="highlights-grid">
                            {dest.highlights.map((hl, idx) => (
                                <div key={idx} className="highlight-card">
                                    <span className="highlight-number">{idx + 1}</span>
                                    <span>{hl}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dest-package-details">
                        <h2>Package Includes</h2>
                        <div className="package-features">
                            {dest.includes.map((item, idx) => (
                                <div key={idx} className="feature-item">
                                    <span>✓</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dest-package-exclusions">
                        <h2>Package Exclusions</h2>
                        <div className="package-features">
                            {dest.excludes.map((item, idx) => (
                                <div key={idx} className="feature-item">
                                    <span>✗</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dest-faqs">
                        <h2>Frequently Asked Questions</h2>
                        <div className="dest-faq-list">
                            {dest.faqs.map((faq, idx) => (
                                <div key={idx} className="faq-item">
                                    <h4>{faq.question}</h4>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dest-contact">
                        <h2>Plan Your ${dest.name} Trip</h2>
                        <p>Ready to explore ${dest.name}? Contact us for a custom itinerary and quotation.</p>
                        <a href="/contact?destination=${encodeURIComponent(dest.name)}" className="dest-cta">
                            Enquire Now
                        </a>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
