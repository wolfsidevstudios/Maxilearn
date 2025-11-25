import React, { useState, useRef, useEffect } from 'react';
import { generateTutorResponse } from '../../services/gemini';
import { useApp } from '../../context/AppContext';
import { Send, Bot, Paperclip } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTIONS = [
  "Explain quantum entanglement simply ⚛️",
  "Generate a creative app name 📱",
  "Translate 'Better late than never' into Latin 🏛️",
  "Write a short riddle with the answer 'time' ⏳"
];

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { useCredit, userState } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;

    if (!useCredit()) {
      alert("You've run out of credits for today! Earn XP or Upgrade.");
      return;
    }

    const newMessages = [...messages, { role: 'user' as const, text: textToSend }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Format history
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await generateTutorResponse(history, textToSend);
      setMessages([...newMessages, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  // Home View (Empty State)
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 relative">
        <div className="w-full max-w-2xl text-center flex flex-col items-center">
            
            {/* AI Avatar Large */}
            <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white">
                <img src={userState.aiAvatar} alt="Maxi" className="w-full h-full object-cover" />
            </div>

            <h1 className="text-3xl font-bold mb-8 text-gray-900">What can I help with?</h1>
            
            {/* Input Box */}
            <div className="relative group w-full mb-8 z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-[1.5rem] opacity-20 group-hover:opacity-40 blur-xl transition-opacity"></div>
                <div className="relative bg-white border border-gray-100 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center p-2 focus-within:ring-2 focus-within:ring-black/5 transition-all">
                    <div className="pl-4 pr-3 py-3 border-r border-gray-100 flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-l-xl transition-colors">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                             <img src={userState.aiAvatar} alt="Mini Maxi" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-gray-600">Maxi</span>
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask AI anything..."
                        className="flex-1 py-3 px-4 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-base outline-none"
                    />
                    <div className="flex items-center gap-2 pr-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                            <Paperclip size={18} />
                        </button>
                        <button 
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            className="p-3 bg-black text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="w-full text-left mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Examples of queries:</div>
            <div className="flex flex-col items-start gap-3 w-full">
                {SUGGESTIONS.map((s) => (
                    <button 
                        key={s}
                        onClick={() => handleSend(s)}
                        className="px-5 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-600 transition-all flex items-center justify-between w-auto gap-4 shadow-sm hover:shadow-md"
                    >
                        {s} <span className="text-gray-300">›</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    );
  }

  // Chat View
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto relative">
      <div className="flex-1 overflow-y-auto pb-48 pt-6 px-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-6 mb-8 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            
            <div className={`w-10 h-10 rounded-2xl overflow-hidden shrink-0 shadow-md ${msg.role === 'user' ? 'border-2 border-white' : 'border border-gray-100'}`}>
               <img 
                 src={msg.role === 'user' ? userState.userAvatar : userState.aiAvatar} 
                 alt={msg.role} 
                 className="w-full h-full object-cover"
               />
            </div>
            
            <div className={`flex-1 max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.role === 'user' ? (
                     <div className="inline-block px-6 py-4 rounded-[1.5rem] bg-gray-50 text-gray-900 font-medium text-lg border border-gray-100 shadow-sm text-left">
                        {msg.text}
                     </div>
                ) : (
                    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-black">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-6 mb-8">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shrink-0 shadow-md border border-gray-100">
               <img src={userState.aiAvatar} alt="Loading..." className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 h-10">
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75" />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Area with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
         {/* Gradient Fade to mask scrolling text */}
         <div className="h-40 bg-gradient-to-t from-white via-white to-transparent pointer-events-none absolute bottom-0 left-0 right-0" />
         
         <div className="relative p-6 max-w-3xl mx-auto">
            <div className="relative bg-white border border-gray-200 rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.08)] flex items-center p-2 focus-within:border-gray-300 transition-all">
                <div className="pl-4 pr-3 py-2 border-r border-gray-100 flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img src={userState.aiAvatar} alt="Maxi" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-sm font-semibold text-gray-600">Maxi</span>
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask AI anything..."
                    className="flex-1 py-3 px-4 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 outline-none"
                />
                <div className="flex items-center gap-2 pr-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <Paperclip size={18} />
                    </button>
                    <button 
                        onClick={() => handleSend()}
                        disabled={loading || !input.trim()}
                        className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
            <div className="text-center mt-3">
                <p className="text-[10px] text-gray-400 font-medium">Maxi can make mistakes. Check important info.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AITutor;