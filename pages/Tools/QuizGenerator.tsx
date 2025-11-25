
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrainCircuit, Loader2, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateQuiz } from '../../services/gemini';
import { QuizItem } from '../../types';

const QuizGenerator: React.FC = () => {
    const { useCredit } = useApp();
    const [input, setInput] = useState('');
    const [cards, setCards] = useState<QuizItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleGenerate = async () => {
        if (!input.trim() || loading) return;
        if (!useCredit()) {
            alert("No credits left!");
            return;
        }

        setLoading(true);
        setCards([]);
        setCurrentCardIndex(0);
        setIsFlipped(false);

        try {
            const quizData = await generateQuiz(input);
            if (Array.isArray(quizData) && quizData.length > 0) {
                setCards(quizData);
            } else {
                alert("Could not generate quiz. Please try again with different text.");
            }
        } catch (e) {
            console.error(e);
            alert("Error generating quiz.");
        } finally {
            setLoading(false);
        }
    };

    const nextCard = () => {
        if (currentCardIndex < cards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentCardIndex(curr => curr + 1), 150);
        }
    };

    const prevCard = () => {
        if (currentCardIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentCardIndex(curr => curr - 1), 150);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col gap-6 p-4">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <BrainCircuit size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Quiz & Flashcard Generator</h2>
                    <p className="text-gray-500 text-sm">Paste notes, articles, or text content to generate study cards.</p>
                </div>
            </div>

            {cards.length === 0 ? (
                // Input State
                <div className="flex-1 flex flex-col gap-4">
                     <textarea
                        className="flex-1 w-full p-6 bg-gray-50 rounded-[2rem] border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all resize-none text-gray-800 placeholder-gray-400"
                        placeholder="Paste your study material here (text from PDFs, notes, or articles)..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !input.trim()}
                        className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Generate Flashcards"}
                    </button>
                </div>
            ) : (
                // Quiz State
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="w-full flex justify-between items-center mb-6 px-4">
                         <button onClick={() => setCards([])} className="text-sm font-bold text-gray-400 hover:text-black">
                            &larr; New Quiz
                         </button>
                         <span className="text-sm font-bold text-gray-500">
                            {currentCardIndex + 1} / {cards.length}
                         </span>
                    </div>

                    {/* Card Container */}
                    <div 
                        className="w-full max-w-xl aspect-[3/2] perspective-1000 cursor-pointer group"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                            {/* Front */}
                            <div className="absolute w-full h-full bg-white rounded-[2rem] border-2 border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex items-center justify-center p-8 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                                <div className="text-center">
                                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-4 block">Question</span>
                                    <p className="text-2xl font-bold text-gray-900">{cards[currentCardIndex].question}</p>
                                    <p className="text-xs text-gray-400 mt-6 font-medium">(Click to flip)</p>
                                </div>
                            </div>

                            {/* Back */}
                            <div className="absolute w-full h-full bg-indigo-600 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.3)] flex items-center justify-center p-8 backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                <div className="text-center text-white">
                                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-4 block">Answer</span>
                                    <p className="text-xl font-medium leading-relaxed">{cards[currentCardIndex].answer}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6 mt-12">
                         <button 
                            onClick={prevCard} 
                            disabled={currentCardIndex === 0}
                            className="p-4 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
                         >
                            <ChevronLeft size={24} />
                         </button>
                         
                         <button 
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full font-bold text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                         >
                            <RotateCw size={16} /> Flip
                         </button>

                         <button 
                            onClick={nextCard} 
                            disabled={currentCardIndex === cards.length - 1}
                            className="p-4 rounded-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-lg"
                         >
                            <ChevronRight size={24} />
                         </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizGenerator;
