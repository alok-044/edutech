// components/Features.jsx
'use client'

import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {/* Note: If you plan to use videos later, change this <img> to a <video> tag.
         Attributes like loop/muted/autoPlay are for videos.
      */}
      <img
        src={src}
        className="absolute left-0 top-0 size-full object-cover object-center"
        alt={typeof title === 'string' ? title : "Feature image"}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50 bg-black/40">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
        In a world overflowing with information, Edify AI stands
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
        Our platform is built to simplify your learning journey, offering tailored courses, real-time community interactions, and tools to help you build skills, secure opportunities, and thrive.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="https://epaouydin3q.exactdn.com/wp-content/uploads/2024/09/immersive-learning-experiences-4.jpg?strip=all&lossy=1&fit=1024%2C585&ssl=1"
          title={
            <>
              Immersive Virtual Classrooms
            </>
          }
          description="Revolutionizes online education with an immersive, collaborative environment."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="https://imgcdn.stablediffusionweb.com/2024/4/8/e5077c23-e5f1-4437-8864-d77e7f968788.jpg"
            title={
              <>
                Mock Interviews & Resume Builder
              </>
            }
            description="Ace your interviews with our AI-driven mock interview tool and craft ATS-friendly resumes with our intuitive builder."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="https://images.stockcake.com/public/9/6/9/9695d30e-4cad-46bb-bf8e-41a90d1a42f9_large/future-learning-illuminated-stockcake.jpg"
            title={
              <>
                AI-Powered Assistance
              </>
            }
            description="Get instant, accurate answers from our custom multimodal chatbot trained on your course content, accessible in text and audio formats."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="https://images.stockcake.com/public/9/6/4/96407c4d-cacf-4d52-aae0-41939aa7172a_large/holographic-medical-station-stockcake.jpg"
            title={
              <>
                Interactive Community Forums
              </>
            }
            description="Connect with learners worldwide through discussion forums, share ideas, and collaborate on projects."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="https://img.freepik.com/premium-photo/futuristic-classroom-with-numerous-tables-chairs-arranged-learning-collaboration-futuristic-classroom-scene-with-holographic-displays-interactive-learning-tools_538213-75086.jpg?semt=ais_hybrid&w=740&q=80"
            title={
              <>
                Interactive Community
              </>
            }
            description="Generate comprehensive learning pathways designed specifically for your career aspirations, from beginner to expert levels."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="https://img.freepik.com/free-vector/online-education-glow-isometric-composition-with-view-hi-tech-anvironment-with-people-computers-teacher_1284-26597.jpg?semt=ais_hybrid&w=740&q=80"
            title={
              <>
                Opportunity Finder
              </>
            }
            description="Discover opportunities like hackathons, meetups, and internships scraped from the web to match your skills and interests."
            isComingSoon
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;