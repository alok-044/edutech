import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useInView } from "framer-motion"; // Import useInView

// --- SHADER DEFINITIONS ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;

  vec2 toPolar(vec2 p) {
      float r = length(p);
      float a = atan(p.y, p.x);
      return vec2(r, a);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);

      vec2 polar = toPolar(p);
      float r = polar.x;

      vec2 i = p;
      float c = 0.0;
      float rot = r + u_time + p.x * 0.100;
      
      for (float n = 0.0; n < 4.0; n++) {
          float rr = r + 0.15 * sin(u_time*0.7 + float(n) + r*2.0);
          
          p *= mat2(
              cos(rot - sin(u_time / 10.0)), sin(rot),
              -sin(cos(rot) - u_time / 10.0), cos(rot)
          ) * -0.25;

          float t = r - u_time / (n + 30.0);
          i -= p + sin(t - i.y) + rr;

          c += 2.2 / length(vec2(
              (sin(i.x + t) / 0.15),
              (cos(i.y + t) / 0.15)
          ));
      }

      c /= 8.0;
      vec3 baseColor = vec3(0.2, 0.7, 0.5); 
      vec3 finalColor = baseColor * smoothstep(0.0, 1.0, c * 0.6);
      fragColor = vec4(finalColor, 1.0);
  }

  void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
  }
`;

// --- 3D PLANE COMPONENT ---
const ShaderPlane = ({ vertexShader, fragmentShader, uniforms }) => {
  const meshRef = useRef(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material;
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

// --- DATA: CARDS ---
const cardsData = [
  {
    title: "AI Agent Meetings",
    description: "Practice interviews, get tutoring, or have conversations with AI agents",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h15m-15 4.5h15m-15 4.5h15M7.5 3h9M18 12a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
    ),
  },
  {
    title: "AI Courses",
    description: "Create personalized courses tailored to your learning goals",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "AI Learning Paths",
    description: "Follow structured paths to master skills from beginner to expert",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "AI Resume Builder",
    description: "Create ATS-friendly resumes with our intuitive builder",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

// --- MAIN HERO COMPONENT ---
const SyntheticHero = ({
  title = "Your Learning Journey Starts Here",
  description = "Everything you need to learn, grow, and succeed in one place. Perfect for beginners and professionals alike.",
  badgeText = "GET STARTED",
  badgeLabel = "LEARN AI",
  ctaButtons = [
    { text: "EXPLORE THE COURSES", href: "#explore", primary: true },
    { text: "LEARN MORE", href: "#learn-more" },
  ],
}) => {
  const sectionRef = useRef(null);
  const badgeWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsHeaderRef = useRef(null);
  const cardsGridRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
    }),
    []
  );

  useGSAP(
    () => {
      if (!isInView) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Badge
      if (badgeWrapperRef.current) {
        gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -20 });
        tl.to(badgeWrapperRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0);
      }

      // 2. Headline
      if (headingRef.current) {
         gsap.set(headingRef.current, { autoAlpha: 0, y: 30, scale: 0.95 });
         tl.to(headingRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, 0.2);
      }

      // 3. Paragraph
      if (paragraphRef.current) {
        gsap.set(paragraphRef.current, { autoAlpha: 0, y: 20 });
        tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.4);
      }

      // 4. Buttons
      if (ctaRef.current) {
        gsap.set(ctaRef.current.children, { autoAlpha: 0, y: 10 });
        tl.to(ctaRef.current.children, { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.1 
        }, 0.6);
      }

      // 5. Cards Header
      if (cardsHeaderRef.current) {
        gsap.set(cardsHeaderRef.current, { autoAlpha: 0, y: 20 });
        tl.to(cardsHeaderRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.8);
      }

      // 6. Cards Grid
      if (cardsGridRef.current) {
        gsap.set(cardsGridRef.current.children, { autoAlpha: 0, y: 20 });
        tl.to(cardsGridRef.current.children, { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.1 
        }, 0.9);
      }
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start min-h-screen bg-black overflow-x-hidden"
    >
      {/* Background Canvas (Fixed) */}
      <div className="absolute inset-0 z-0 pointer-events-none top-0 left-0 w-full h-full">
        <Canvas>
          <ShaderPlane
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={shaderUniforms}
          />
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div ref={badgeWrapperRef} className="opacity-0">
          <div className="mb-6 bg-white/5 hover:bg-white/10 text-emerald-300 backdrop-blur-md border border-white/10 uppercase tracking-wider font-medium flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors">
            <span className="text-[10px] font-light tracking-[0.18em] text-emerald-100/80">
              {badgeLabel}
            </span>
            <span className="h-1 w-1 rounded-full bg-emerald-200/60" />
            <span className="text-xs font-light tracking-tight text-emerald-200">
              {badgeText}
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl max-w-4xl font-light tracking-tight text-white mb-6 drop-shadow-2xl opacity-0"
        >
          {title}
        </h1>

        {/* Description */}
        <p
          ref={paragraphRef}
          className="text-emerald-50/80 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed opacity-0"
        >
          {description}
        </p>

        {/* Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 mb-24"
        >
          {ctaButtons.map((button, index) => {
            const isPrimary = button.primary ?? index === 0;
            const baseClasses = "px-8 py-3 rounded-xl text-base font-medium transition-all cursor-pointer backdrop-blur-lg flex items-center justify-center opacity-0";
            const primaryClasses = "bg-emerald-500/80 hover:bg-emerald-400/80 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]";
            const secondaryClasses = "border border-white/20 text-white hover:bg-white/10";

            return (
                <a
                  key={index}
                  href={button.href}
                  className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
                >
                  
                  {button.text}
                </a>
            );
          })}
        </div>

        {/* --- NEW SECTION: QUICK START --- */}
        <div className="w-full">
          <h2 ref={cardsHeaderRef} className="text-3xl font-semibold text-white mb-10 tracking-tight opacity-0">
            Quick Start: Choose Your Path
          </h2>
          
          <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {cardsData.map((card, index) => (
              <div 
                key={index} 
                className="group relative bg-white/5 border border-white/10 hover:border-emerald-500/50 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 opacity-0"
              >
                {/* Icon Box */}
                <div className="h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                
                {/* Text Content */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                  {card.description}
                </p>
                
                {/* Link */}
                <a href="#" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Get Started <span className="ml-1">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SyntheticHero;