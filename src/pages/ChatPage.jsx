import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  MoreVertical, 
  Phone, 
  Video, 
  Search,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Mic,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import ShaderBackground from "../components/bg/ShaderBackground";

const contacts = [
  { id: 1, name: "AI Tutor", status: "online", avatar: "bg-blue-600", type: "bot", lastMsg: "How can I help you study today?" },
  { id: 2, name: "Study Group A", status: "offline", avatar: "bg-purple-600", type: "group", lastMsg: "Sarah: Let's meet at 5 PM." },
  { id: 3, name: "John Doe", status: "online", avatar: "bg-emerald-600", type: "user", lastMsg: "Did you finish the assignment?" },
];

const initialMessages = [
  { id: 1, text: "Hello! I am your AI study assistant. I can help you summarize notes, generate quizzes, or explain complex topics.", sender: "bot", time: "10:00 AM" },
  { id: 2, text: "That sounds great! Can you explain Quantum Entanglement roughly?", sender: "me", time: "10:02 AM" },
  { id: 3, text: "Certainly! Quantum entanglement is a phenomenon where two particles become linked, so the state of one instantly influences the other, no matter the distance. Einstein called it 'spooky action at a distance'.", sender: "bot", time: "10:02 AM" },
];

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate Bot Response
    if (selectedContact.type === 'bot') {
      setTimeout(() => {
        const botMsg = {
          id: Date.now() + 1,
          text: "I'm processing your request... (This is a demo response)",
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30 flex pt-20">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#3b82f6" alpha={0.1} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-6 flex gap-6 h-[calc(100vh-80px)]">
        
        {/* --- Sidebar (Contacts) --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col w-80 bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Sidebar Header */}
          <div className="p-5 border-b border-white/10 bg-[#111]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Chats</h2>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Search size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Unread', 'Groups', 'Bots'].map(filter => (
                <button key={filter} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs font-medium text-gray-300 transition-colors whitespace-nowrap border border-white/5">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                  selectedContact.id === contact.id 
                    ? "bg-blue-600/10 border border-blue-600/30" 
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className={`relative w-12 h-12 rounded-full ${contact.avatar} flex items-center justify-center text-white font-bold`}>
                  {contact.type === 'bot' ? <Bot size={20} /> : contact.name.charAt(0)}
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#0A0A0A] rounded-full ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className={`font-semibold truncate ${selectedContact.id === contact.id ? 'text-blue-400' : 'text-white'}`}>
                      {contact.name}
                    </h3>
                    <span className="text-[10px] text-gray-500">10:02 AM</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{contact.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* --- Main Chat Area --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex flex-col bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 bg-[#111] flex justify-between items-center z-20">
            <div className="flex items-center gap-4">
              <Link to="/" className="md:hidden p-2 hover:bg-white/10 rounded-full text-gray-400">
                <ArrowLeft size={20} />
              </Link>
              <div className={`w-10 h-10 rounded-full ${selectedContact.avatar} flex items-center justify-center text-white`}>
                {selectedContact.type === 'bot' ? <Bot size={20} /> : selectedContact.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-white">{selectedContact.name}</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {selectedContact.status === 'online' ? 'Active Now' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Phone size={20} /></button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Video size={20} /></button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/40">
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-4 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'me' ? 'bg-white/10 text-gray-300' : `${selectedContact.avatar} text-white`
                }`}>
                  {msg.sender === 'me' ? <User size={14} /> : (selectedContact.type === 'bot' ? <Bot size={14} /> : selectedContact.name.charAt(0))}
                </div>

                {/* Bubble */}
                <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                  <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                    msg.sender === 'me' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-[#1a1a1a] border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-600 mt-1 px-1">{msg.time}</span>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#111] border-t border-white/10">
            <form 
              onSubmit={handleSendMessage}
              className="flex items-center gap-3 bg-[#0A0A0A] border border-white/10 rounded-2xl px-4 py-2 focus-within:border-blue-500/50 transition-colors"
            >
              <button type="button" className="p-2 text-gray-500 hover:text-blue-400 transition-colors">
                <Paperclip size={20} />
              </button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm py-2 focus:outline-none"
              />

              <div className="flex items-center gap-1 text-gray-500">
                <button type="button" className="p-2 hover:text-white transition-colors"><Mic size={20} /></button>
                <button type="button" className="p-2 hover:text-white transition-colors"><ImageIcon size={20} /></button>
                <button type="button" className="p-2 hover:text-white transition-colors"><Smile size={20} /></button>
              </div>

              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;