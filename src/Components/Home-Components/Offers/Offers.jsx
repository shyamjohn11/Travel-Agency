
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  ArrowUpRight,
  MapPin,
  Clock3,
  Tag,
  Sparkles,
  Compass,
} from "lucide-react";

import { usePackages } from "../../../hooks/useCms";
import { formatINR } from "../../../services/db";

import "./Offers.css";

gsap.registerPlugin(ScrollTrigger);

export default function Offers() {
  const sectionRef = useRef(null);

  const list = usePackages({ category: "offer" });

  const offers = (Array.isArray(list) ? list : []).map((p, i) => {
    const price = Number(p.price) || 0;
    const originalPrice = Number(p.originalPrice) || 0;

    const hasDiscount =
      originalPrice > price && originalPrice > 0;

    const discount = hasDiscount
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

    return {
      id: p.slug || i,
      number: String(i + 1).padStart(2, "0"),
      title: p.title,
      badge: p.badge || "SPECIAL OFFER",
      description:
        p.summary ||
        "Enjoy an unforgettable travel experience with RJ Groups.",
      image: p.image,
      location: p.location,
      duration: p.duration,
      link: p.slug ? `/package/${p.slug}` : "/packages",
      price: formatINR(price),
      originalPrice: hasDiscount ? formatINR(originalPrice) : null,
      discount,
    };
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = sectionRef.current?.querySelector(
          ".offers-heading"
        );

        const cards = gsap.utils.toArray(
          sectionRef.current?.querySelectorAll(".offer-card") || []
        );

        const footer = sectionRef.current?.querySelector(
          ".offers-footer"
        );

        if (heading) {
          gsap.from(heading, {
            opacity: 0,
            y: 22,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            opacity: 0,
            y: 28,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (footer) {
          gsap.from(footer, {
            opacity: 0,
            y: 18,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [offers.length],
      revertOnUpdate: true,
    }
  );

  return (
    <section className="offers-section" ref={sectionRef}>
      <div className="offers-container">

        {/* HEADING */}
        <div className="offers-heading">
          <div className="offers-heading-top">
            <span className="offers-eyebrow">
              <span className="offers-eyebrow-line" />
              RJ GROUPS / EXCLUSIVE DEALS
            </span>

            <span className="offers-count">
              <Sparkles size={12} />
              {String(offers.length).padStart(2, "0")} OFFERS
            </span>
          </div>

          <div className="offers-heading-main">
            <h2>
              Travel more.
              <span> Spend less.</span>
            </h2>

            <p>
              Discover exciting destinations with exclusive
              travel packages and special prices.
            </p>
          </div>
        </div>

        {/* OFFER INTRO */}
        <div className="offers-intro-strip">
          <div className="offers-intro-left">
            <span className="offers-intro-icon">
              <Tag size={15} />
            </span>

            <div>
              <strong>Exclusive travel deals</strong>
              <span>Find your next getaway at a special price.</span>
            </div>
          </div>

          <span className="offers-intro-label">
            <span />
            SPECIAL DEALS
          </span>
        </div>

        {/* OFFER CARDS */}
        {offers.length > 0 ? (
          <div className="offers-grid">
            {offers.map((offer) => (
              <article className="offer-card" key={offer.id}>

                {/* IMAGE */}
                <Link
                  to={offer.link}
                  className="offer-card-image"
                  aria-label={`Explore ${offer.title}`}
                >
                  {offer.image ? (
                    <img
                      src={offer.image}
                      alt={offer.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="offer-image-placeholder">
                      <Compass size={28} />
                      <span>RJ GROUPS</span>
                    </div>
                  )}

                  <div className="offer-image-shade" />

                  <span className="offer-image-category">
                    <Sparkles size={10} />
                    {offer.badge}
                  </span>

                  {offer.discount && (
                    <span className="offer-discount-badge">
                      <strong>{offer.discount}%</strong>
                      <span>OFF</span>
                    </span>
                  )}

                  <span className="offer-image-number">
                    {offer.number}
                  </span>
                </Link>

                {/* CONTENT */}
                <div className="offer-card-content">
                  <div className="offer-card-meta">
                    {offer.location && (
                      <span>
                        <MapPin size={12} />
                        {offer.location}
                      </span>
                    )}

                    {offer.duration && (
                      <span>
                        <Clock3 size={12} />
                        {offer.duration}
                      </span>
                    )}
                  </div>

                  <h3>{offer.title}</h3>

                  <p className="offer-card-description">
                    {offer.description}
                  </p>

                  <div className="offer-card-divider" />

                  {/* PRICE AND LINK */}
                  <div className="offer-card-bottom">
                    <div className="offer-price-block">
                      <span className="offer-price-label">
                        PACKAGE PRICE
                      </span>

                      <div className="offer-price-values">
                        <strong>{offer.price}</strong>

                        {offer.originalPrice && (
                          <del>{offer.originalPrice}</del>
                        )}
                      </div>

                      {offer.discount && (
                        <span className="offer-saving">
                          Save {offer.discount}%
                        </span>
                      )}
                    </div>

                    <Link
                      to={offer.link}
                      className="offer-view-link"
                      aria-label={`View ${offer.title} package`}
                    >
                      <span>VIEW PACKAGE</span>
                      <span className="offer-view-icon">
                        <ArrowUpRight size={15} />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="offers-empty">
            <Tag size={23} />
            <h3>New offers are on the way</h3>
            <p>
              We are preparing exciting travel deals for you.
              Please check back soon.
            </p>

            <Link to="/packages">
              Explore packages
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}

        {/* FOOTER */}
        <div className="offers-footer">
          <div>
            <span>EXPLORE WITH RJ GROUPS</span>
            <h3>Ready for your next adventure?</h3>
          </div>

          <Link to="/packages" className="offers-footer-button">
            VIEW ALL PACKAGES
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
