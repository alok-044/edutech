import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Robot() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center scale-110 lg:scale-125 translate-y-10">
      {/* Interactive 3D Robot Scene */}
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      
      {/* Optional: Overlay to prevent scroll capture if needed, 
          but usually we want interaction for the robot */}
    </div>
  );
}