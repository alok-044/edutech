
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';

const ChatAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I\'m your AI Resume Assistant. I can help you draft bullet points, optimize your summary, or tailor your resume for specific job descriptions. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const dragControls = useDragControls();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Simulate AI response (mock)
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: "That's a great start! To make it stronger, try quantifying your achievements. For example, instead of 'Managed a team', try 'Managed a team of 5 developers, increasing productivity by 20%'." 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <AnimatePresence >
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          drag
          dragControls={dragControls}
          dragListener={false} // Disables dragging from the body
          dragMomentum={false} // Stops immediately on release
          className="fixed bottom-6 right-6 w-96 h-[600px] bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 font-sans"
        >
          {/* Header - Now acts as the drag handle */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a] cursor-grab select-none"
          >
            <div className="flex items-center gap-3 pointer-events-none">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer pointer-events-auto"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.type === 'bot' ? 'bg-blue-600/20 text-blue-400' : 'bg-white/10 text-gray-300'
                }`}>
                  {msg.type === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'bot' 
                    ? 'bg-[#1a1a1a] text-gray-200 rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-[#1a1a1a]">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your resume..."
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatAssistant;
