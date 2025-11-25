import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserState } from '../types';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User 
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface AppContextType {
  userState: UserState;
  firebaseUser: User | null;
  loading: boolean;
  upgradeToPro: () => void;
  useCredit: () => boolean;
  addXp: (amount: number) => void;
  redeemXpForCredit: (xpCost: number) => boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateAvatars: (userUrl: string, aiUrl: string) => void;
  completeOnboarding: (name: string, level: string, goal: string, userAvatar: string, aiAvatar: string) => void;
  xpNotification: { show: boolean; amount: number } | null;
  saveApiKey: (key: string) => void;
  hasCustomApiKey: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USER_STATE: UserState = {
  credits: 10,
  xp: 0,
  isPro: false,
  isAuthenticated: false,
  isOnboarded: false,
  lastReset: new Date().toISOString(),
  userAvatar: "https://i.ibb.co/Mk4q4wLD/Image-fx-12.jpg", // Default User
  aiAvatar: "https://i.ibb.co/XZ79TJYN/Image-fx-25.jpg", // Default AI
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // App specific state (XP, Credits)
  const [userState, setUserState] = useState<UserState>(INITIAL_USER_STATE);
  const [xpNotification, setXpNotification] = useState<{ show: boolean; amount: number } | null>(null);
  const [hasCustomApiKey, setHasCustomApiKey] = useState(false);

  // 1. Listen for Firebase Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      
      if (user) {
        // Load user specific data from local storage (mock DB)
        const savedData = localStorage.getItem(`maxi_user_${user.uid}`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setUserState({ 
             ...parsed, 
             isAuthenticated: true, 
             name: user.displayName || 'Student',
             email: user.email || '',
             // Ensure avatars exist if loading from old state
             userAvatar: parsed.userAvatar || INITIAL_USER_STATE.userAvatar,
             aiAvatar: parsed.aiAvatar || INITIAL_USER_STATE.aiAvatar,
          });
        } else {
          // New user default state
          const newState = { 
              ...INITIAL_USER_STATE, 
              isAuthenticated: true, 
              name: user.displayName || 'Student',
              email: user.email || '' 
          };
          setUserState(newState);
          localStorage.setItem(`maxi_user_${user.uid}`, JSON.stringify(newState));
        }
      } else {
        setUserState(INITIAL_USER_STATE);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Check for API key on mount
  useEffect(() => {
      const key = localStorage.getItem('maxi_custom_api_key');
      setHasCustomApiKey(!!key);
  }, []);

  // 2. Persist State Changes
  useEffect(() => {
    if (firebaseUser) {
      localStorage.setItem(`maxi_user_${firebaseUser.uid}`, JSON.stringify(userState));
    }
  }, [userState, firebaseUser]);

  // 3. Daily Reset Logic
  useEffect(() => {
    const lastReset = new Date(userState.lastReset);
    const now = new Date();
    if (now.getTime() - lastReset.getTime() > 24 * 60 * 60 * 1000) {
      setUserState(prev => ({
        ...prev,
        credits: 10,
        lastReset: now.toISOString()
      }));
    }
  }, [userState.lastReset]);

  // Auth Functions
  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: name });
    // Force state update to include name immediately
    setUserState(prev => ({ ...prev, name }));
  };

  const logout = async () => {
    await signOut(auth);
  };

  // App Logic
  const upgradeToPro = () => {
    setUserState(prev => ({ ...prev, isPro: true }));
  };

  const addXp = (amount: number) => {
    setUserState(prev => ({ ...prev, xp: prev.xp + amount }));
    setXpNotification({ show: true, amount });
    setTimeout(() => setXpNotification(null), 3000);
  };

  const redeemXpForCredit = (xpCost: number) => {
    if (userState.xp >= xpCost) {
      setUserState(prev => ({
        ...prev,
        xp: prev.xp - xpCost,
        credits: prev.credits + 1
      }));
      return true;
    }
    return false;
  };

  const useCredit = (): boolean => {
    // If using custom key, we don't deduct credits, or we treat them as Pro
    if (hasCustomApiKey || userState.isPro) {
      addXp(10);
      return true;
    }
    if (userState.credits > 0) {
      setUserState(prev => ({ ...prev, credits: prev.credits - 1 }));
      addXp(10);
      return true;
    }
    return false;
  };

  const updateAvatars = (userUrl: string, aiUrl: string) => {
    setUserState(prev => ({
        ...prev,
        userAvatar: userUrl,
        aiAvatar: aiUrl
    }));
  };

  const completeOnboarding = (name: string, level: string, goal: string, userAvatar: string, aiAvatar: string) => {
    setUserState(prev => ({
        ...prev,
        name,
        studyLevel: level,
        studyGoal: goal,
        userAvatar,
        aiAvatar,
        isOnboarded: true
    }));
  };

  const saveApiKey = (key: string) => {
    if (key.trim()) {
        localStorage.setItem('maxi_custom_api_key', key.trim());
        setHasCustomApiKey(true);
    } else {
        localStorage.removeItem('maxi_custom_api_key');
        setHasCustomApiKey(false);
    }
  };

  return (
    <AppContext.Provider value={{ 
      userState, 
      firebaseUser,
      loading,
      upgradeToPro, 
      useCredit, 
      addXp, 
      redeemXpForCredit,
      login,
      signup,
      logout,
      xpNotification,
      updateAvatars,
      completeOnboarding,
      saveApiKey,
      hasCustomApiKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};