import React, { useRef } from "react";
import { Link } from "react-router-dom"; // Fixed: Imported Link, removed unused useNavigate
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import AnimatedTitle from "./ui/AnimatedTitle";
// Removed unused Button import

/* -------------------------------------------------------------------------- */
/* Helper Component: Image Box with Clip Path                                 */
/* -------------------------------------------------------------------------- */

const ImageClipBox = ({ src, clipPath, className = "" }) => (
  <div
    className={`relative h-full w-full shadow-2xl ${className}`}
    style={{ clipPath }}
  >
    <img
      src={src}
      alt="AI illustration"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
  </div>
);

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

const Contact = () => {
  const containerRef = useRef(null);
  // Removed unused navigate hook

  // 1. Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yRight = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // 2. Mouse Tilt Logic
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const rotateX = useTransform(smoothY, [0, 1], [5, -5]); 
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]); 

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const CLIP_PATHS = {
    top: "polygon(0 0, 100% 0, 100% 100%, 30% 100%, 0 70%)",
    bottom: "polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 30%)",
    sword: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)",
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative my-20 min-h-[80vh] w-full overflow-hidden px-4 sm:px-10"
    >
      <div className="relative mx-auto h-full max-w-7xl rounded-4xl bg-[#0A0A0A] border border-white/10 py-24 text-blue-50 sm:overflow-hidden shadow-2xl">
        
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ x: useTransform(smoothX, [0, 1], [-20, 20]) }}
            className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]"
          />
          <motion.div
            style={{ x: useTransform(smoothX, [0, 1], [20, -20]) }}
            className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-600/10 blur-[100px]"
          />
        </div>

        {/* --- LEFT IMAGE GROUP --- */}
        <motion.div
          style={{ y: yLeft, rotateX, rotateY, perspective: 1000 }}
          className="absolute -left-16 top-0 hidden h-full w-80 sm:block lg:left-10 lg:w-96"
        >
          <div className="mb-6 h-[45%] w-full">
            <ImageClipBox
              src="https://www.bpsolutions.com/hubfs/ai-technische-onmogelijkheden.jpg"
              clipPath={CLIP_PATHS.top}
            />
          </div>
          <div className="h-[45%] w-full">
            <ImageClipBox
              src="https://www.technewsworld.com/wp-content/uploads/sites/3/2025/02/humanoid-robot-programming-code.jpg"
              clipPath={CLIP_PATHS.bottom}
            />
          </div>
        </motion.div>

        {/* --- RIGHT IMAGE --- */}
        <motion.div
          style={{ y: yRight, rotateX, rotateY, perspective: 1000 }}
          className="absolute -top-20 right-10 hidden h-[600px] w-80 sm:block lg:top-10 lg:w-96"
        >
          <ImageClipBox
            src="https://i0.wp.com/sidgs.com/wp-content/uploads/2023/01/Top-Trends-To-Watch-out-In-Artificial-Intelligence-AI-in-2023-SID-Global-Solutions.png?fit=1920%2C1278&ssl=1"
            clipPath={CLIP_PATHS.sword}
            className="mt-12"
          />
        </motion.div>

        {/* --- CENTER CONTENT --- */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <p className="mb-8 font-general text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300 md:text-xs">
            Join Ed X AI
          </p>

          <AnimatedTitle
            title="<b>C</b>onnect<br /><b>W</b>ith<br /><b>U</b>s"
            containerClass="special-font !text-6xl font-black uppercase leading-[0.9] text-white sm:!text-8xl md:!text-9xl drop-shadow-2xl"
          />

          <p className="mt-8 max-w-md font-circular-web text-lg text-blue-100/70">
            Want to collaborate, learn, or bring AI into your organization?
            Reach out — our team replies within 48 hours.
          </p>

          <div className="mt-12 flex items-center gap-6">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/40 border-none font-semibold transition-colors"
            >
              Contact Us
            </Link>
            
            <a 
              href="/learn-more" 
              className="group relative text-sm font-semibold uppercase text-blue-200 transition-colors hover:text-white"
            >
              Learn More
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;