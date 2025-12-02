// src/courses/Certificate.jsx
import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Download, ArrowLeft, CheckCircle } from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const courseTitles = {
  1: "Complete Python for AI",
  2: "Machine Learning A-Z",
  3: "Data Science Bootcamp",
  4: "Generative AI Masterclass",
  5: "Deep Learning Specialization",
  6: "NLP with Transformers",
  7: "React Developer Roadmap",
  8: "JavaScript Zero to Hero",
  9: "C Programming Essentials",
  10: "Full-Stack Web Development",
  11: "AI Prompt Engineering",
  12: "Computer Vision with PyTorch",
  13: "Data Structures & Algorithms",
  14: "SQL & Databases Mastery",
  15: "Cloud Computing on AWS",
  16: "Cybersecurity Fundamentals"
};

const Certificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Safe ID Lookup
  const parsedId = parseInt(id) || 0;
  const lookupId = courseTitles[parsedId] ? parsedId : 4;
  
  const courseName = courseTitles[lookupId];
  const studentName = "Alok Kumar"; 

  // 2. Stable Date & ID
  const date = useMemo(() => new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }), []);

  const certId = useMemo(() => {
    return `EDX-${id || '00'}-${Date.now().toString().slice(-6)}`;
  }, [id]);

  const handleDownload = () => window.print();

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white relative overflow-hidden font-serif">
      <div className="fixed inset-0 z-0 print:hidden opacity-40">
        <ShaderBackground color="#FFD700" alpha={0.5} />
      </div>

      <div className="relative top-3 z-10 max-w-6xl mx-auto px-6 py-20 print:p-0 print:w-full print:max-w-none">
        
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-10 print:hidden">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-300 flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft size={19} /> Back
          </button>

          <button
            onClick={handleDownload}
            className="bg-linear-to-r from-yellow-500 to-yellow-600 px-6 py-2.5 rounded-xl text-black font-semibold shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white text-black rounded-2xl shadow-2xl p-12 border-12 border-yellow-600 print:rounded-none print:border-none print:shadow-none relative overflow-hidden"
        >
          {/* Inner Border */}
          <div className="absolute inset-3 border-[5px] border-yellow-300 pointer-events-none"></div>

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] z-0 pointer-events-none">
            <Award size={500} />
          </div>

          <div className="relative z-10 text-center">

            {/* Header Icon */}
            <div className="w-24 h-24 bg-linear-to-br from-yellow-500 to-yellow-700 text-white flex items-center justify-center mx-auto rounded-full shadow-xl mb-6">
              <Award size={50} />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-gray-900 uppercase font-serif">
              Certificate
            </h1>
            <p className="text-xl tracking-[0.25em] text-gray-600 uppercase mt-2 font-sans">
              of Achievement
            </p>

            {/* Body */}
            <p className="mt-14 text-gray-700 text-lg font-sans">This is proudly presented to</p>

            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-yellow-700 tracking-tight font-serif border-b-2 border-yellow-100 pb-4 inline-block px-10">
              {studentName}
            </h2>

            <p className="text-gray-700 text-lg mt-10 font-sans">
              for successfully completing the course
            </p>

            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-3 font-serif">
              {courseName}
            </h3>

            <p className="max-w-2xl mx-auto mt-6 text-gray-600 font-sans leading-relaxed">
              Demonstrating outstanding proficiency, completing assessments,
              and meeting all program standards with excellence.
            </p>

            {/* Footer Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-end px-4 md:px-10">

              {/* Date */}
              <div className="text-center order-2 md:order-1">
                <p className="font-semibold text-gray-900 font-sans">{date}</p>
                <div className="w-40 h-px bg-gray-400 my-2 mx-auto"></div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-sans">
                  Date Issued
                </p>
              </div>

              {/* Gold Seal (Replaced QR Code) */}
              <div className="flex justify-center order-1 md:order-2 mb-6 md:mb-0">
                 <div className="w-28 h-28 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex justify-center items-center shadow-inner border-4 border-yellow-200">
                    <CheckCircle className="w-14 h-14 text-white drop-shadow-md" />
                 </div>
              </div>

              {/* Signature */}
              <div className="text-center order-3">
                <p className="italic text-2xl text-gray-800 font-serif">EdX AI Director</p>
                <div className="w-40 h-px bg-gray-400 my-2 mx-auto"></div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-sans">
                  Authorized Signature
                </p>
              </div>
            </div>

            {/* Certificate ID */}
            <p className="text-[10px] text-gray-400 mt-12 font-mono">
              Certificate ID: {certId} • Verify at edx-ai.com/verify
            </p>

          </div>
        </motion.div>
      </div>

      {/* Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { size: landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; background: white; }
          .print\\:hidden { display: none !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:w-full { width: 100% !important; max-width: none !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:border-none { border: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
      `}} />
    </div>
  );
};

export default Certificate;