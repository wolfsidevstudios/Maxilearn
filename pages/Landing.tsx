import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Check, ArrowRight, Zap, MessageCircle, FileText, Globe } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-50 relative">
        <div className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-sm shadow-lg">M</div>
            Maxi
        </div>
        <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium hover:text-gray-600 transition-colors">Log in</Link>
            <Link to="/login" className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg active:scale-95">
                Get Started
            </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-32 px-6 text-center max-w-6xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium mb-8 animate-fade-in shadow-sm">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-gray-600">The new standard for AI learning</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1] text-gray-900">
            Your all-in-one <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">study superpower.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Maxi replaces 10+ disconnected tools. Chat, write, cite, and research in one beautiful workspace designed specifically for students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
            <Link to="/login" className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95 flex items-center gap-2 justify-center shadow-xl">
                Start Learning Free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-sm">
                View Demo
            </Link>
        </div>

        {/* Code-Based Mockup (No Images) */}
        <div className="relative mx-auto max-w-5xl h-[600px] bg-gray-100 rounded-[2.5rem] p-4 shadow-2xl border border-gray-200 overflow-hidden">
            {/* Mockup Screen */}
            <div className="w-full h-full bg-white rounded-[2rem] shadow-inner flex overflow-hidden border border-gray-200 relative">
                
                {/* Mockup Sidebar */}
                <div className="w-20 bg-white border-r border-gray-50 flex flex-col items-center py-6 gap-6 z-10">
                    <div className="w-10 h-10 bg-black rounded-xl text-white flex items-center justify-center font-bold">M</div>
                    <div className="flex-1 flex flex-col gap-4 mt-4">
                        <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center shadow-lg"><Bot size={20}/></div>
                        <div className="w-10 h-10 text-gray-300 flex items-center justify-center"><Sparkles size={20}/></div>
                        <div className="w-10 h-10 text-gray-300 flex items-center justify-center"><FileText size={20}/></div>
                    </div>
                </div>

                {/* Mockup Main Content */}
                <div className="flex-1 bg-gray-50/50 p-6 flex flex-col relative">
                     {/* Floating Card */}
                     <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex-1 p-8 relative overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="font-bold text-lg">Maxi Tutor</div>
                            <div className="flex gap-2">
                                <div className="px-3 py-1 bg-black text-white text-xs rounded-full flex items-center gap-1"><Zap size={10}/> 150 XP</div>
                            </div>
                        </div>

                        {/* Chat Bubbles */}
                        <div className="flex-1">
                            <div className="flex gap-4 mb-6">
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-lg"><Bot size={14}/></div>
                                <div>
                                    <div className="prose prose-sm">
                                        <h3 className="font-bold text-lg text-black mb-2">Here is an explanation of Quantum Entanglement ⚛️</h3>
                                        <p className="text-gray-600">Imagine two magical dice. No matter how far apart they are—even across the galaxy—if you roll a 6 on one, the other instantly shows a 6 too.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 mb-6 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-lg"><ArrowRight size={14}/></div>
                                <div className="bg-gray-100 px-5 py-3 rounded-[1.5rem] text-sm font-medium">
                                    Can you give me another example?
                                </div>
                            </div>
                        </div>

                        {/* Floating Input Bar */}
                        <div className="absolute bottom-6 left-6 right-6">
                             <div className="bg-white border border-gray-200 rounded-full p-2 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                                 <div className="pl-4 text-gray-400 text-sm">Ask anything...</div>
                                 <div className="ml-auto w-10 h-10 bg-black rounded-full flex items-center justify-center text-white"><ArrowRight size={16}/></div>
                             </div>
                        </div>
                     </div>
                </div>
            </div>
            
            {/* Decorative Blurred Blobs behind mockup */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 -z-10"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20 -z-10"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 border border-blue-100"><Bot /></div>
                <h3 className="text-xl font-bold mb-3">AI Tutor (Maxi)</h3>
                <p className="text-gray-500 leading-relaxed">More than just a chatbot. Maxi uses emojis, structured formatting, and deep logic to explain concepts simply.</p>
             </div>
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100"><Sparkles /></div>
                <h3 className="text-xl font-bold mb-3">The Humanizer</h3>
                <p className="text-gray-500 leading-relaxed">Transform robotic AI text into natural, flowing essays that read like a human wrote them.</p>
             </div>
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 border border-green-100"><Zap /></div>
                <h3 className="text-xl font-bold mb-3">Gamified Learning</h3>
                <p className="text-gray-500 leading-relaxed">Earn XP for every study session. Redeem points for free premium credits. Learning is now a game.</p>
             </div>
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 border border-orange-100"><Globe /></div>
                <h3 className="text-xl font-bold mb-3">Research Assistant</h3>
                <p className="text-gray-500 leading-relaxed">Find real academic papers, generate cited literature reviews, and get facts fast.</p>
             </div>
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 border border-pink-100"><FileText /></div>
                <h3 className="text-xl font-bold mb-3">Notes Generator</h3>
                <p className="text-gray-500 leading-relaxed">Turn messy brain dumps or lecture transcripts into beautifully structured study guides.</p>
             </div>
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center items-center text-center">
                <h3 className="text-3xl font-bold mb-2">+ 5 More Tools</h3>
                <p className="text-gray-500 mb-6">Summarizer, Detector, Writer...</p>
                <Link to="/login" className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold">Try All For Free</Link>
             </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-gray-100 text-center">
        <div className="flex justify-center items-center gap-2 font-bold mb-4">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">M</div>
            Maxi Learn
        </div>
        <p className="text-gray-500 text-sm">© 2024 Wolfsi Studios. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;