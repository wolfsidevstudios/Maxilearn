
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, User, Sparkles } from 'lucide-react';

const AVATAR_OPTIONS = [
    "https://i.ibb.co/XZ79TJYN/Image-fx-25.jpg",
    "https://i.ibb.co/FbCnNym8/Image-fx-24.jpg",
    "https://i.ibb.co/v4NT58k4/Image-fx-23.jpg",
    "https://i.ibb.co/zHNMxmk5/Image-fx-22.jpg",
    "https://i.ibb.co/27BBrVBS/Image-fx-21.jpg",
    "https://i.ibb.co/PvY65mkS/Image-fx-20.jpg",
    "https://i.ibb.co/Jj8Vt8zj/Image-fx-19.jpg",
    "https://i.ibb.co/N294XqnF/Image-fx-18.jpg",
    "https://i.ibb.co/TBVx4RvT/Image-fx-17.jpg",
    "https://i.ibb.co/9H8TWfCD/Image-fx-15.jpg",
    "https://i.ibb.co/yc8Kh0fP/Image-fx-13.jpg",
    "https://i.ibb.co/Mk4q4wLD/Image-fx-12.jpg",
    "https://i.ibb.co/bRRrzCky/Image-fx-11.jpg",
    "https://i.ibb.co/sJD8C9tt/Image-fx-10.jpg",
    "https://i.ibb.co/G45KSDSt/Image-fx-9.jpg",
    "https://i.ibb.co/ymfywcH9/Image-fx-8.jpg",
    "https://i.ibb.co/Nn2qgfRm/Image-fx-7.jpg",
    "https://i.ibb.co/TVFnj5s/Image-fx-6.jpg",
    "https://i.ibb.co/0pHHxVTS/Image-fx-5.jpg"
];

const STEPS = [
    { title: "Let's get to know you", subtitle: "First, confirm your name." },
    { title: "What are you studying?", subtitle: "This helps Maxi tailor answers to your level." },
    { title: "Choose your look", subtitle: "Pick an avatar that represents you." },
    { title: "Customize Maxi", subtitle: "Choose how your AI Tutor looks." },
];

const Onboarding: React.FC = () => {
    const { userState, completeOnboarding } = useApp();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    // Form State
    const [name, setName] = useState(userState.name || '');
    const [studyLevel, setStudyLevel] = useState('');
    const [studyGoal, setStudyGoal] = useState('');
    const [selectedUserAvatar, setSelectedUserAvatar] = useState(AVATAR_OPTIONS[11]);
    const [selectedAiAvatar, setSelectedAiAvatar] = useState(AVATAR_OPTIONS[0]);

    const handleNext = () => {
        if (step === 0 && !name.trim()) return;
        if (step === 1 && (!studyLevel || !studyGoal)) return;
        
        if (step < STEPS.length - 1) {
            setStep(step + 1);
        } else {
            // Finish
            completeOnboarding(name, studyLevel, studyGoal, selectedUserAvatar, selectedAiAvatar);
            navigate('/app');
        }
    };

    return (
        <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-6 font-sans text-gray-900">
            {/* Progress Bar */}
            <div className="w-full max-w-lg mb-12 flex gap-2">
                {STEPS.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-black' : 'bg-gray-100'}`}></div>
                ))}
            </div>

            <div className="w-full max-w-2xl flex flex-col items-center text-center animate-fade-in">
                <div className="mb-8 p-4 bg-gray-50 rounded-3xl inline-block border border-gray-100">
                    {step === 0 && <User size={32} />}
                    {step === 1 && <span className="text-3xl">🎓</span>}
                    {step === 2 && <span className="text-3xl">👤</span>}
                    {step === 3 && <Sparkles size={32} className="text-purple-600"/>}
                </div>

                <h1 className="text-4xl font-bold mb-4">{STEPS[step].title}</h1>
                <p className="text-gray-500 mb-12 text-lg">{STEPS[step].subtitle}</p>

                {/* Step 1: Name */}
                {step === 0 && (
                    <div className="w-full max-w-md">
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full text-center text-2xl p-4 border-b-2 border-gray-200 focus:border-black outline-none bg-transparent placeholder-gray-300"
                            autoFocus
                        />
                    </div>
                )}

                {/* Step 2: Study Level */}
                {step === 1 && (
                    <div className="w-full max-w-lg flex flex-col gap-6">
                        <div className="grid grid-cols-3 gap-4">
                            {['High School', 'Undergrad', 'Graduate'].map((lvl) => (
                                <button
                                    key={lvl}
                                    onClick={() => setStudyLevel(lvl)}
                                    className={`p-4 rounded-2xl border transition-all ${studyLevel === lvl ? 'bg-black text-white border-black shadow-lg' : 'bg-white border-gray-200 hover:border-black/30'}`}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                        <div className="text-left">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 block">Primary Focus</label>
                            <input 
                                type="text"
                                value={studyGoal}
                                onChange={(e) => setStudyGoal(e.target.value)}
                                placeholder="e.g. Biology, Computer Science, Law..."
                                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black/5"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: User Avatar */}
                {step === 2 && (
                    <div className="grid grid-cols-5 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                        {AVATAR_OPTIONS.map((url, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setSelectedUserAvatar(url)}
                                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${selectedUserAvatar === url ? 'ring-4 ring-black scale-95' : 'hover:opacity-80'}`}
                            >
                                <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 4: AI Avatar */}
                {step === 3 && (
                     <div className="grid grid-cols-5 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                        {AVATAR_OPTIONS.map((url, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setSelectedAiAvatar(url)}
                                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${selectedAiAvatar === url ? 'ring-4 ring-purple-600 scale-95' : 'hover:opacity-80'}`}
                            >
                                <img src={url} alt={`AI Avatar ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-12 w-full max-w-md">
                    <button 
                        onClick={handleNext}
                        className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95 flex items-center justify-center gap-2"
                    >
                        {step === STEPS.length - 1 ? "Complete Setup" : "Continue"} <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
