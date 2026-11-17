import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
    const lenisRef = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            lerp: 0.08,
            orientation: "vertical",
            gestureOrientation: "vertical",
        });
        lenisRef.current = lenis;

        // Standard Lenis + GSAP integration: update ScrollTrigger in the same RAF
        const updateLenis = (time) => {
            lenis.raf(time * 1000);
            ScrollTrigger.update();
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        const lenis = lenisRef.current;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
        // Single refresh after layout settles
        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, [pathname]);

    return null;
};

export default SmoothScroll;