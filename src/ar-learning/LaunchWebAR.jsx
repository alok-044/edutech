import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  RotateCcw, 
  Box, 
  Layers, 
  Maximize,
  Scan,
  Aperture
} from "lucide-react";

const ARModel = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 perspective-1000"
        >
          {/* Simulated 3D Hologram Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Core Glow */}
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            
            {/* Outer Ring - Rotating */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-blue-400/30 rounded-full border-dashed" 
            />
            
            {/* Inner Ring - Counter Rotating */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-purple-400/30 rounded-full border-dotted" 
            />

            {/* Central Object - Floating & Rotating */}
            <motion.div 
              animate={{ 
                y: [-10, 10, -10],
                rotateY: 360
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
              className="relative z-10"
            >
               <Box className="w-32 h-32 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" strokeWidth={1} />
            </motion.div>
            
            {/* Floating Data Points */}
            {[...Array(3)].map((_, i) => (
                <motion.div 
                    key={i} 
                    className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    style={{
                        top: `${20 + i * 30}%`,
                        left: `${10 + i * 40}%`,
                    }}
                />
            ))}
          </div>
          
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-center min-w-[200px]"
          >
            <h3 className="text-white font-bold text-sm">Anatomy Module 01</h3>
            <p className="text-blue-300 text-xs">Human Heart • Interactive</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LaunchWebAR = () => {
  const videoRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null); 
  const [isScanning, setIsScanning] = useState(true);
  const [objectPlaced, setObjectPlaced] = useState(false);
  const [uiVisible, setUiVisible] = useState(true);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
        
        // Simulate scanning finding a surface
        setTimeout(() => {
            setIsScanning(false);
            setObjectPlaced(true);
        }, 3000);

      } catch (err) {
        console.error("Camera access denied or unavailable:", err);
        setHasPermission(false);
        // Fallback to simulation mode if camera fails
        setTimeout(() => {
            setIsScanning(false);
            setObjectPlaced(true);
        }, 2000);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const flash = document.getElementById("flash");
    if (flash) {
        flash.style.opacity = 1;
        setTimeout(() => flash.style.opacity = 0, 150);
    }
  };

  const handleReset = () => {
    setObjectPlaced(false);
    setIsScanning(true);
    setTimeout(() => { 
        setIsScanning(false); 
        setObjectPlaced(true); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50">
      
      {/* 1. Camera Layer */}
      {hasPermission ? (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            {/* Simulation Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-size-[40px_40px]" />
            <div className="z-10 text-center p-6">
                <Aperture className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin-slow" />
                <p className="text-gray-400 font-mono text-sm">
                    {hasPermission === false ? "Camera Access Denied. Starting Simulation." : "Initializing AR System..."}
                </p>
            </div>
        </div>
      )}

      {/* 2. AR Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Scanning Reticle */}
        <AnimatePresence>
            {isScanning && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-64 h-64 border-2 border-white/30 rounded-2xl relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1" />
                        
                        {/* Scan Line */}
                        <motion.div 
                            animate={{ top: ["5%", "95%", "5%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-2 right-2 h-0.5 bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 font-mono text-xs tracking-widest uppercase animate-pulse bg-black/50 px-2 rounded">
                            Scanning Surface...
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* 3D Model Placement */}
        <ARModel isVisible={objectPlaced} />

      </div>

      {/* 3. UI Layer (Controls) */}
      <motion.div 
        animate={{ opacity: uiVisible ? 1 : 0 }}
        className="absolute inset-0 z-20 flex flex-col justify-between p-6 pointer-events-none"
      >
        
        {/* Top Bar */}
        <div className="flex justify-between items-start pointer-events-auto">
            <Link to="/ar-learning">
                <button className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors">
                    <ArrowLeft size={24} />
                </button>
            </Link>
            
            <button 
                onClick={() => setUiVisible(!uiVisible)}
                className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
            >
                <Maximize size={24} />
            </button>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-6 pointer-events-auto">
            
            {/* Interactive prompts */}
            <AnimatePresence>
                {objectPlaced && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="self-center bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10"
                    >
                        <p className="text-white text-sm font-medium">Tap object to interact • Pinch to scale</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between px-4 pb-4">
                <button className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all active:scale-95">
                    <Layers size={24} />
                </button>

                {/* Shutter Button */}
                <button 
                    onClick={handleCapture}
                    className="w-20 h-20 rounded-full border-[5px] border-white/80 flex items-center justify-center relative group active:scale-95 transition-transform"
                >
                    <div className="w-16 h-16 bg-white rounded-full group-hover:scale-90 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                </button>

                <button 
                    onClick={handleReset}
                    className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all active:scale-95"
                >
                    <RotateCcw size={24} />
                </button>
            </div>
        </div>
      </motion.div>

      {/* Capture Flash Effect */}
      <div id="flash" className="absolute inset-0 bg-white opacity-0 pointer-events-none z-50 transition-opacity duration-150" />

    </div>
  );
};

export default LaunchWebAR;