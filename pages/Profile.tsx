
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, Save, User } from 'lucide-react';

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
  const { userState, logout, updateAvatars } = useApp();
  const [selectedUserAvatar, setSelectedUserAvatar] = useState(userState.userAvatar || AVATAR_OPTIONS[11]);
  const [selectedAiAvatar, setSelectedAiAvatar] = useState(userState.aiAvatar || AVATAR_OPTIONS[0]);

  const handleSave = () => {
    updateAvatars(selectedUserAvatar, selectedAiAvatar);
    alert("Profile updated successfully!");
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
                    <span>{userState.isPro ? 'Pro Plan 👑' : 'Free Plan'}</span>
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

      {/* Avatar Selection */}
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* User Avatar Selection */}
        <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User size={20} /> Select Your Avatar
            </h3>
            <div className="grid grid-cols-4 gap-4 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
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
             <div className="grid grid-cols-4 gap-4 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
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
      </div>
      
      {/* Save Button */}
      <div className="mt-12 flex justify-end sticky bottom-8">
        <button 
            onClick={handleSave}
            className="px-8 py-4 bg-black text-white rounded-full font-bold shadow-2xl hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
            <Save size={20} />
            Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
