
import { useEffect, useId, useRef, useState } from "react";
import "./TravelledPlacesGallery.css";

const DEFAULT_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000",
        alt: "Mountain landscape in Kashmir",
        place: "Kashmir",
    },
    {
        src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000",
        alt: "Kerala backwaters",
        place: "Kerala",
    },
    {
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000",
        alt: "Dubai skyline",
        place: "Dubai",
    },
    {
        src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1000",
        alt: "Maldives tropical island",
        place: "Maldives",
    },
    {
        src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1000",
        alt: "Singapore city skyline",
        place: "Singapore",
    },
    {
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000",
        alt: "Bali tropical landscape",
        place: "Bali",
    },
    {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000",
        alt: "Snow-covered mountain peaks",
        place: "Himalayas",
    },
    {
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000",
        alt: "Beautiful lake surrounded by mountains",
        place: "Switzerland",
    },
    {
        src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1000",
        alt: "Greek island coastal village",
        place: "Greece",
    },
    {
        src: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1000",
        alt: "Scenic mountain road",
        place: "Europe",
    },
];

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;

function arc(bend) {
    return (
        (CAMERA - 1 + Math.cos(bend)) /
        (2 * CAMERA * Math.sin(bend))
    );
}

function measure(width, height, tile, aspect, gap, bend) {
    const h = Math.min(
        (tile / 100) * height,
        ((MAX_WIDTH / 100) * width) / aspect
    );

    const radius = width * arc(bend);

    if (!(h > 0) || !(radius > 0)) {
        return {
            columns: 2,
            sweep: 0,
            unit: 0,
            limit: 0,
        };
    }

    const deg = (rad) => (rad * 180) / Math.PI;
    const unit = deg(h / radius);
    const pitch = (aspect + gap / 100) * unit;
    const limit = deg(bend) + (aspect * unit) / 2;

    const columns = Math.min(
        60,
        Math.max(2, Math.ceil((2 * limit) / pitch))
    );

    const round = (n) => Number(n.toFixed(4));
    const sweep = round((columns * pitch) / 2);

    return {
        columns,
        sweep,
        unit: round(unit),
        limit: round(Math.min(sweep, limit)),
    };
}

export default function TravelledPlacesGallery({
    images = DEFAULT_IMAGES,
    title = "Every journey tells a story.",
    subtitle = "A collection of destinations, unforgettable experiences and memories made with RJ Groups.",
    speed = 4,
    tileHeight = 28,
    aspectRatio = 16 / 9,
    gap = 7,
    axis = 56,
    curve = 80,
    fade = 12,
    className = "",
    showCTA = true,
}) {
    const containerRef = useRef(null);
    const id = useId().replace(/[^a-zA-Z0-9]/g, "");

    const orbitClass = `tpg-orbit-${id}`;
    const tileClass = `tpg-tile-${id}`;

    const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

    const [layout, setLayout] = useState(null);
    const [shown, setShown] = useState({});

    // Measure the gallery container
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;

            const next = measure(
                width,
                height,
                tileHeight,
                aspectRatio,
                gap,
                bend
            );

            setLayout((previous) => {
                if (
                    previous?.columns === next.columns &&
                    previous?.sweep === next.sweep &&
                    previous?.unit === next.unit
                ) {
                    return previous;
                }

                return next;
            });
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [tileHeight, aspectRatio, gap, bend]);

    // Preload the destination images
    useEffect(() => {
        images.forEach(({ src }) => {
            const image = new Image();
            image.src = src;
        });
    }, [images]);

    const safeImages = images.length ? images : DEFAULT_IMAGES;

    const {
        columns,
        sweep,
        unit,
        limit,
    } =
        layout ??
        measure(1200, 560, tileHeight, aspectRatio, gap, bend);

    const unitSize = (value) =>
        `calc(${Number(value.toFixed(4))} * min(${tileHeight}cqh, ${Number(
            (MAX_WIDTH / aspectRatio).toFixed(4)
        )}cqw))`;

    const radiusValue = 100 * arc(bend);
    const radius = `${Number(radiusValue.toFixed(3))}cqw`;

    const turn = (degrees) =>
        `translateZ(${radius}) rotateY(${Number(
            degrees.toFixed(4)
        )}deg) translateZ(-${radius})`;

    const hide = Number(
        (
            ((sweep - limit) / (2 * sweep || 1)) *
            100
        ).toFixed(4)
    );

    const duration = columns * speed;

    const keyframes = `
    @keyframes ${orbitClass} {
      from {
        transform: ${turn(-sweep)};
      }
      to {
        transform: ${turn(sweep)};
      }
      0%, ${hide}%, ${100 - hide}%, 100% {
        visibility: hidden;
      }
      ${hide + 0.001}%, ${100 - hide - 0.001}% {
        visibility: visible;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .${tileClass} {
        animation-play-state: paused !important;
      }
    }
  `;

    const share = aspectRatio / SLICES;

    const mask = `linear-gradient(
    90deg,
    transparent 0%,
    #000 ${fade}%,
    #000 ${100 - fade}%,
    transparent 100%
  )`;

    return (
        <section
            className={`travelled-gallery-section ${className}`}
        >
            <div className="travelled-gallery-header">
                <div className="travelled-gallery-heading">
                    <span className="travelled-gallery-eyebrow">
                        <span className="travelled-gallery-eyebrow-line" />
                        RJ GROUPS · TRAVEL MEMORIES
                    </span>

                    <h2>{title}</h2>

                    <p>{subtitle}</p>
                </div>

                <div className="travelled-gallery-counter">
                    <span className="counter-number">
                        {String(safeImages.length).padStart(2, "0")}
                    </span>
                    <span className="counter-label">
                        DESTINATIONS
                        <br />
                        AND MEMORIES
                    </span>
                </div>
            </div>

            <div
                ref={containerRef}
                className="travelled-gallery-stage"
                style={{
                    containerType: "size",
                }}
            >
                <style>{keyframes}</style>

                {/* Curved image gallery */}
                <div
                    className="travelled-gallery-band"
                    aria-hidden="true"
                    style={{
                        opacity: layout ? 1 : 0,
                        perspective: `${Number(
                            (radiusValue * CAMERA).toFixed(3)
                        )}cqw`,
                        perspectiveOrigin: `50% ${axis}%`,
                        maskImage: mask,
                        WebkitMaskImage: mask,
                    }}
                >
                    {Array.from({ length: columns }, (_, tileIndex) => {
                        const first = columns - 1 - tileIndex;

                        const imageIndex =
                            (shown[tileIndex] ?? first) % safeImages.length;

                        const currentImage = safeImages[imageIndex];

                        return (
                            <div
                                key={tileIndex}
                                className={`travelled-gallery-tile ${tileClass}`}
                                style={{
                                    left: `calc(50% - ${unitSize(aspectRatio / 2)})`,
                                    top: `calc(${axis}% - ${unitSize(0.5)})`,
                                    width: unitSize(aspectRatio),
                                    height: unitSize(1),
                                    transformStyle: "preserve-3d",
                                    animation: `${orbitClass} ${duration}s linear ${-tileIndex * speed
                                        }s infinite`,
                                }}
                                onAnimationIteration={(event) => {
                                    const lap = Math.round(
                                        event.elapsedTime / duration
                                    );

                                    const nextImage = lap * columns + first;

                                    setShown((previous) => {
                                        if (previous[tileIndex] === nextImage) {
                                            return previous;
                                        }

                                        return {
                                            ...previous,
                                            [tileIndex]: nextImage,
                                        };
                                    });
                                }}
                            >
                                {Array.from({ length: SLICES }, (_, sliceIndex) => (
                                    <div
                                        key={sliceIndex}
                                        className={`travelled-gallery-slice ${sliceIndex === 0 ? "first-slice" : ""
                                            } ${sliceIndex === SLICES - 1 ? "last-slice" : ""
                                            }`}
                                        style={{
                                            left: unitSize((aspectRatio - share) / 2),
                                            width:
                                                sliceIndex === SLICES - 1
                                                    ? unitSize(share)
                                                    : `calc(${unitSize(share)} + 1px)`,
                                            height: unitSize(1),
                                            transform: turn(
                                                (aspectRatio / 2 -
                                                    (sliceIndex + 0.5) * share) *
                                                unit
                                            ),
                                        }}
                                    >
                                        <img
                                            src={currentImage.src}
                                            alt=""
                                            draggable="false"
                                            className="travelled-gallery-image"
                                            style={{
                                                left: unitSize(-sliceIndex * share),
                                                width: unitSize(aspectRatio),
                                                height: unitSize(1),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Overlay content */}
                <div className="travelled-gallery-overlay">
                    <div className="travelled-gallery-overlay-top">
                        <span>01 — EXPLORE THE WORLD</span>
                        <span>CURATED BY RJ GROUPS</span>
                    </div>

                    <div className="travelled-gallery-overlay-bottom">
                        <div>
                            <span className="gallery-bottom-label">
                                MORE THAN JUST A TRIP
                            </span>
                            <h3>
                                Collect moments.
                                <br />
                                <span>Not just miles.</span>
                            </h3>
                        </div>

                        {showCTA && (
                            <a
                                href="/trips"
                                className="travelled-gallery-button"
                            >
                                Explore our trips
                                <span>↗</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="travelled-gallery-side-label">
                    CONNECTING OPPORTUNITIES. CREATING FUTURES.
                </div>
            </div>

            {/* Destination names */}
            <div className="travelled-gallery-footer">
                <div className="gallery-footer-left">
                    <span className="gallery-footer-dot" />
                    <span>MADE FOR THE JOURNEY</span>
                </div>

                <div className="gallery-footer-right">
                    {safeImages.slice(0, 5).map((image, index) => (
                        <span key={`${image.place}-${index}`}>
                            {image.place}
                            {index !== Math.min(safeImages.length, 5) - 1 && (
                                <i> / </i>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}


