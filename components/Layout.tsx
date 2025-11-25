import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useApp } from '../context/AppContext';
import { Zap, Sparkles } from 'lucide-react';

const Layout = () => {
  const { userState, xpNotification } = useApp();

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      {/* Floating Sidebar (Icons only) */}
      <Sidebar />

      {/* Main Content Area - Floating Card */}
      <div className="flex-1 h-full py-4 pr-4 pl-0 relative">
        <div className="h-full w-full bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative flex flex-col">
          
          {/* Header */}
          <div className="px-8 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-50/50">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Maxi Learn</h1>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5 px-3 py-1 bg-black text-white rounded-full text-xs font-medium shadow-sm">
                  <Zap size={12} className="text-yellow-400 fill-yellow-400" />
                  {userState.xp} XP
               </div>
              {!userState.isPro && (
                <div className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600 border border-gray-200">
                  {userState.credits} credits
                </div>
              )}
               {userState.isPro && (
                <div className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full flex items-center gap-1">
                  <span>★</span> Pro
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-white relative">
            <Outlet />
          </div>

          {/* XP Notification Toast - Bottom Right */}
          {xpNotification && (
            <div className="absolute bottom-8 right-8 z-50 animate-slide-up">
              <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                 <div className="bg-white/20 p-1 rounded-full">
                    <Sparkles size={16} className="text-yellow-400" />
                 </div>
                 <div>
                    <p className="font-bold text-sm">You have earned {xpNotification.amount} XP</p>
                 </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Layout;