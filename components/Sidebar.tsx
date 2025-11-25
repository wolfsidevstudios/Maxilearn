import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bot, 
  LayoutGrid,
  Crown,
  CreditCard,
  UserCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const { userState } = useApp();

  return (
    <div className="w-20 h-full flex flex-col items-center py-6 gap-6 bg-transparent shrink-0">
      {/* Logo Placeholder */}
      <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xs mb-2 shadow-lg">
        M
      </div>

      <nav className="flex-1 flex flex-col gap-4 w-full items-center">
        
        {/* Maxi Tutor (Home) */}
        <NavLink
            to="/app/tutor"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition-all duration-300 group relative flex items-center justify-center
               ${isActive 
                 ? 'bg-black text-white shadow-lg scale-110' 
                 : 'text-gray-400 hover:text-black hover:bg-gray-50'
               }`
            }
        >
            <Bot size={22} strokeWidth={2} />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
              Maxi Tutor
            </span>
        </NavLink>

        {/* AI Tools Hub */}
        <NavLink
            to="/app/tools"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition-all duration-300 group relative flex items-center justify-center
               ${isActive 
                 ? 'bg-black text-white shadow-lg scale-110' 
                 : 'text-gray-400 hover:text-black hover:bg-gray-50'
               }`
            }
        >
            <LayoutGrid size={22} strokeWidth={2} />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
              AI Tools Hub
            </span>
        </NavLink>

        {/* Profile */}
        <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition-all duration-300 group relative flex items-center justify-center
               ${isActive 
                 ? 'bg-black text-white shadow-lg scale-110' 
                 : 'text-gray-400 hover:text-black hover:bg-gray-50'
               }`
            }
        >
            {({ isActive }) => (
              <>
                {userState.userAvatar ? (
                  <img src={userState.userAvatar} alt="Profile" className={`w-6 h-6 rounded-full object-cover ${!isActive && 'opacity-70 group-hover:opacity-100'}`} />
                ) : (
                  <UserCircle size={22} strokeWidth={2} />
                )}
                <span className="absolute left-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
                  Profile
                </span>
              </>
            )}
        </NavLink>

      </nav>

      <div className="mt-auto flex flex-col gap-4 items-center pb-2">
        {/* Credits / XP Page */}
        <NavLink 
          to="/app/credits" 
          className={({ isActive }) => `p-3 rounded-2xl transition-all duration-300 group relative ${isActive ? 'bg-gray-200 text-black' : 'text-gray-400 hover:bg-gray-100 hover:text-black'}`}
        >
          <CreditCard size={20} strokeWidth={2} />
          <span className="absolute left-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
             Credits & XP
          </span>
        </NavLink>

        {/* Pro Plan */}
        <NavLink 
            to="/app/pricing" 
            className={({ isActive }) => `p-3 rounded-2xl transition-all duration-300 group relative ${isActive ? 'bg-amber-400 text-black shadow-amber-200 shadow-lg' : 'bg-amber-100 text-amber-600 hover:bg-amber-200'}`}
        >
            <Crown size={20} strokeWidth={2} />
            <span className="absolute left-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
            Upgrade
            </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;