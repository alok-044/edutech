import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Video } from 'lucide-react';

const NewMeetingModal = ({ isOpen, onClose, type = 'agent' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-[#151515]">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-500" />
                Schedule {type === 'agent' ? 'AI' : 'Normal'} Meeting
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Meeting Title</label>
                <input type="text" placeholder="e.g., Weekly Sync" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors text-sm" />
              </div>

              {type === 'agent' && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Select Agent</label>
                  <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors text-sm appearance-none cursor-pointer">
                    <option>Select an agent...</option>
                    <option>Sarah (Interviewer)</option>
                    <option>Alex (Tutor)</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider items-center gap-1">
                    <Calendar size={12} /> Date
                  </label>
                  <input type="date" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider items-center gap-1">
                    <Clock size={12} /> Time
                  </label>
                  <input type="time" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors text-sm" />
                </div>
              </div>

              <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 transition-all cursor-pointer">
                Schedule Meeting
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewMeetingModal;