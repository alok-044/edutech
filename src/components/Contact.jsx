import React from "react";
import AnimatedTitle from "./ui/AnimatedTitle";
import Button from "./ui/Button";

// Improved ImageClipBox: Ensures image covers container properly and accepts extra classes
const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img 
      src={src} 
      alt="Decorative clip" 
      className="absolute inset-0 w-full h-full object-cover" 
    />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-full px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden isolate">
        
        {/* --- Improvement: Ambient Background Glows --- */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full" />
        </div>

        {/* Left Image Group */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="https://www.oxaam.com/articles/wp-content/uploads/2025/02/top-ai-tools-productivity-2025.webp"
            clipClass="contact-clip-path-1 transition-transform duration-500 hover:scale-105"
          />
          <ImageClipBox
            src="https://edure.in/wp-content/uploads/2025/02/ai-tools.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60 transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Image Group */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 h-80 lg:h-96">
          <ImageClipBox
            src="https://edure.in/wp-content/uploads/2025/02/ai-tools.webp"
            // Removed redundant positioning classes that are likely in the CSS class
            clipClass="contact-clip-path-1 md:scale-125 transition-transform duration-500 hover:scale-110"
          />
          <ImageClipBox
            src="https://edure.in/wp-content/uploads/2025/02/ai-tools.webp"
            clipClass="sword-man-clip-path md:scale-125 transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center relative z-10">
          <p className="mb-10 font-general text-xl uppercase tracking-widest text-blue-200">
            Join Ed X AI
          </p>

          <AnimatedTitle
            title="<b>C</b>onnect<br /><b>W</b>ith<br /><b>U</b>s"
            containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button 
            title="contact us" 
            containerClass="mt-10 cursor-pointer bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;