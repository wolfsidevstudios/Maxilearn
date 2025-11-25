import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, Save, User, Key, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';

// Images provided by user
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

const Profile: React.FC = () => {
  const { userState, logout, updateAvatars, saveApiKey, hasCustomApiKey } = useApp();
  const [selectedUserAvatar, setSelectedUserAvatar] = useState(userState.userAvatar || AVATAR_OPTIONS[11]);
  const [selectedAiAvatar, setSelectedAiAvatar] = useState(userState.aiAvatar || AVATAR_OPTIONS[0]);
  
  // API Key State
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    // Only set initial avatars, don't reset if user is clicking around
    if (!selectedUserAvatar) setSelectedUserAvatar(userState.userAvatar || AVATAR_OPTIONS[11]);
    if (!selectedAiAvatar) setSelectedAiAvatar(userState.aiAvatar || AVATAR_OPTIONS[0]);
  }, []);

  const handleSaveAvatars = () => {
    updateAvatars(selectedUserAvatar, selectedAiAvatar);
    alert("Profile avatars updated successfully!");
  };

  const handleSaveKey = () => {
    saveApiKey(apiKeyInput);
    setApiKeyInput('');
    alert(apiKeyInput ? "API Key saved successfully!" : "API Key removed.");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pb-20">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      {/* User Info Card */}
      <div className="bg-gray-50 rounded-[2rem] p-8 mb-12 flex flex-col md:flex-row items-center justify-between border border-gray-100 gap-6">
        <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white border-2 border-white shadow-md overflow-hidden shrink-0">
                <img src={selectedUserAvatar} alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">{userState.name || 'Student'}</h2>
                <div className="flex flex-col gap-1 text-sm text-gray-500 mt-1">
                    <span>{userState.email}</span>
                    <span className="flex items-center gap-2">
                        <span>🎓 {userState.studyLevel || 'General'}</span>
                        <span>•</span>
                        <span>📚 {userState.studyGoal || 'Learning'}</span>
                    </span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold border border-gray-200">
                    <span>{userState.isPro || hasCustomApiKey ? 'Pro Access (Active)' : 'Free Plan'}</span>
                </div>
            </div>
        </div>
        <button 
            onClick={logout}
            className="px-6 py-3 rounded-full bg-white border border-gray-200 text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center gap-2"
        >
            <LogOut size={18} />
            Sign Out
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Avatar Selection Section */}
          <div className="lg:col-span-2 space-y-8">
                {/* User Avatar Selection */}
                <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <User size={20} /> Select Your Avatar
                    </h3>
                    <div className="grid grid-cols-5 gap-4 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm max-h-[300px] overflow-y-auto custom-scrollbar">
                        {AVATAR_OPTIONS.map((url, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setSelectedUserAvatar(url)}
                                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${selectedUserAvatar === url ? 'ring-4 ring-black scale-95' : 'hover:opacity-80'}`}
                            >
                                <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Avatar Selection */}
                <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-purple-600">✨</span> Select Maxi's Avatar
                    </h3>
                    <div className="grid grid-cols-5 gap-4 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm max-h-[300px] overflow-y-auto custom-scrollbar">
                        {AVATAR_OPTIONS.map((url, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setSelectedAiAvatar(url)}
                                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${selectedAiAvatar === url ? 'ring-4 ring-purple-600 scale-95' : 'hover:opacity-80'}`}
                            >
                                <img src={url} alt={`AI Avatar ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                            </button>
                        ))}
                    </div>
                </div>

                 <div className="flex justify-end">
                    <button 
                        onClick={handleSaveAvatars}
                        className="px-6 py-3 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center gap-2"
                    >
                        <Save size={18} />
                        Save Avatars
                    </button>
                </div>
          </div>

          {/* API Key Configuration - Sidebar/Column */}
          <div className="lg:col-span-1">
             <div className="bg-gray-900 text-white rounded-[2rem] p-6 sticky top-8">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gray-800 rounded-xl"><Key size={20} className="text-yellow-400"/></div>
                    <h3 className="font-bold text-lg">API Configuration</h3>
                 </div>
                 
                 <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Add your own Gemini API Key to bypass credit limits and ensure uninterrupted access.
                    Your key is saved locally on your device.
                 </p>

                 {hasCustomApiKey && (
                     <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wide mb-4 bg-green-400/10 p-3 rounded-xl border border-green-400/20">
                         <ShieldCheck size={14} /> Custom Key Active
                     </div>
                 )}

                 <div className="space-y-4">
                     <div className="relative">
                         <input 
                            type={showKey ? "text" : "password"} 
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            placeholder="Paste AI Studio Key"
                            className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 text-white text-sm outline-none focus:border-gray-500 pr-10"
                         />
                         <button 
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                         >
                             {showKey ? <EyeOff size={16}/> : <Eye size={16} />}
                         </button>
                     </div>
                     
                     <button 
                        onClick={handleSaveKey}
                        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                     >
                        {apiKeyInput ? "Save API Key" : (hasCustomApiKey ? "Remove API Key" : "Save API Key")}
                     </button>
                 </div>

                 <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex items-start gap-2 text-xs text-gray-500">
                        <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                        We recommend using a paid API key for faster speeds and no rate limits.
                    </div>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;