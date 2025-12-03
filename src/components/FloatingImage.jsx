import React, { useRef } from "react";
import gsap from "gsap";
import Button from "./buttons/Button";
import AnimatedTitle from "./ui/AnimatedTitle";
import { Link } from "react-router-dom"; 

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-screen w-full bg-black text-blue-50 relative overflow-hidden">
      <div className="flex size-full flex-col items-center py-10 pb-24 text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-blue-300 md:text-base max-w-5xl text-center mx-auto mb-8">
          Create courses tailored to your interests and goals
        </p>

        <div className="relative w-full max-w-4xl mx-auto h-[50vh] md:h-[70vh]">
          <AnimatedTitle
            title="<b>C</b>ust<b>o</b>mi<b>z</b>a<b>b</b>le <br /> <b>C</b>our<b>s</b>e<b>s</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-5xl md:text-8xl font-black text-white uppercase leading-[0.9]"
          />

          <div className="story-img-container will-change-transform -mt-10 md:-mt-20">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  src="https://alphatarget.com/wp-content/uploads/2024/05/artificial-intelligence-1.jpg"
                  alt="AI Course Preview"
                  className="object-cover w-full h-full rounded-lg shadow-2xl shadow-blue-500/20"
                />
              </div>
            </div>

            {/* SVG Filter */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex w-full justify-center mt-32 px-6">
          <div className="flex flex-col items-center text-center max-w-lg">
            <p className="mt-3 text-lg font-light text-slate-300">
              Where knowledge meets innovation. Discover the power of 
              <span className="text-white font-semibold"> AI-driven education</span> and shape your future amidst infinite opportunities.
            </p>

            {/* FIX: Wrapped Button in Link because Button component renders a <button> tag, not a link */}
            <Link to="/ai-course">
              <Button
                id="realm-btn"
                title="Start Learning Now"
                containerClass="mt-8 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;