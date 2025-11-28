// components/ui/SmoothScrollWrapper.jsx
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScrollWrapper = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // The duration of the scroll animation (higher = smoother but slower feel)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1, // Sensitivity
      smoothTouch: false, // Keep native touch scrolling on mobile for better UX
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // 2. Connect Lenis to GSAP ScrollTrigger
    // This ensures GSAP animations update perfectly in sync with the smooth scroll
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Add Lenis's requestAnimationFrame to GSAP's ticker
    // This is crucial! It tells GSAP to update based on Lenis's time, not the browser's default
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert to milliseconds
    });

    // 4. Disable GSAP's default lag smoothing to prevent jitters during heavy calculation
    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup function
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative">
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;