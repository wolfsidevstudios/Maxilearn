import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, CreditCard, Crown, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Credits: React.FC = () => {
  const { userState, redeemXpForCredit } = useApp();

  const handleRedeem = () => {
    const success = redeemXpForCredit(100); // 100 XP = 1 Credit
    if (success) {
      alert("Successfully redeemed 100 XP for 1 Credit!");
    } else {
      alert("Not enough XP! You need 100 XP to get a credit.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h2 className="text-3xl font-bold mb-8">Your Progress</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Credits Card */}
        <div className="bg-black text-white rounded-[2rem] p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-gray-800 rounded-2xl"><CreditCard size={24} /></div>
               {userState.isPro && <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold">UNLIMITED</span>}
            </div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Available Credits</h3>
            <div className="text-5xl font-bold mt-2">{userState.isPro ? '∞' : userState.credits}</div>
            <p className="text-gray-400 text-sm mt-4">Resets daily. Use credits to access AI tools.</p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gray-800 rounded-full opacity-50 blur-2xl group-hover:bg-gray-700 transition-colors"></div>
        </div>

        {/* XP Card */}
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-black rounded-[2rem] p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
           <div className="relative z-10">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/30 backdrop-blur-md rounded-2xl"><Zap size={24} /></div>
             </div>
             <h3 className="text-yellow-900/60 text-sm font-bold uppercase tracking-wide">Experience Points</h3>
             <div className="text-5xl font-bold mt-2">{userState.xp} <span className="text-2xl opacity-60">XP</span></div>
             <p className="text-yellow-900/70 text-sm mt-4">Earn 10 XP for every AI interaction.</p>
           </div>
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
         <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gray-100 rounded-full"><Trophy size={20}/></div>
            <h3 className="text-xl font-bold">Rewards Shop</h3>
         </div>
         
         <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-200">
            <div>
                <h4 className="font-bold text-lg">1 Free AI Credit</h4>
                <p className="text-gray-500 text-sm">Exchange your hard-earned XP for more credits.</p>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-bold text-gray-400 text-sm">Cost: 100 XP</span>
                <button 
                    onClick={handleRedeem}
                    className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 active:scale-95 transition-all shadow-lg hover:shadow-xl"
                >
                    Redeem Reward
                </button>
            </div>
         </div>
         
         {!userState.isPro && (
             <div className="mt-8 text-center bg-amber-50 rounded-2xl p-6 border border-amber-100">
                 <p className="text-sm text-gray-500 mb-2">Want to stop counting credits?</p>
                 <Link to="/app/pricing" className="text-base font-bold text-amber-600 hover:text-amber-700 underline decoration-2 underline-offset-4">Upgrade to Kyndra Circle &rarr;</Link>
             </div>
         )}
      </div>
    </div>
  );
};

export default Credits;