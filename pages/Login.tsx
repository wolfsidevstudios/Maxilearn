import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const { login, signup } = useApp();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return;
    }
    if (isSignUp && !formData.name) {
        setError("Please enter your name.");
        return;
    }

    setLoading(true);
    try {
        if (isSignUp) {
            await signup(formData.email, formData.password, formData.name);
        } else {
            await login(formData.email, formData.password);
        }
        navigate('/app');
    } catch (err: any) {
        console.error(err);
        let msg = "Authentication failed.";
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
             msg = "Invalid email or password.";
        }
        if (err.code === 'auth/email-already-in-use') msg = "Email already in use.";
        if (err.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
        setError(msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-black text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="z-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black font-bold text-xl mb-8">M</div>
            <h1 className="text-6xl font-bold leading-tight mb-6">Master your studies with Maxi.</h1>
            <p className="text-gray-400 text-lg max-w-md">Join thousands of students utilizing the world's most advanced AI study suite.</p>
        </div>
        
        <div className="z-10 flex flex-col gap-4">
             <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs text-gray-500">U{i}</div>
                 ))}
             </div>
             <div className="flex items-center gap-2 text-sm text-gray-300">
                <Sparkles size={14} className="text-yellow-400" />
                Trusted by 10,000+ students worldwide.
             </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-gray-800 to-black rounded-full blur-3xl -z-0 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl z-0"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
            <div className="lg:hidden mb-8">
                 <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold mb-4">M</div>
                 <h2 className="text-3xl font-bold">Maxi Learn</h2>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
                {isSignUp ? "Create Account" : "Welcome back"}
            </h2>
            <p className="text-gray-500 mb-8">
                {isSignUp ? "Start your learning journey today." : "Enter your details to access your workspace."}
            </p>

            <div className="space-y-4">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {isSignUp && (
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black/5 border-transparent transition-all placeholder-gray-400" 
                    />
                )}
                
                <input 
                    type="email" 
                    placeholder="Email address" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black/5 border-transparent transition-all placeholder-gray-400" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black/5 border-transparent transition-all placeholder-gray-400" 
                />
                
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                            {isSignUp ? "Sign Up" : "Sign In"} <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-6">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <span 
                    onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                    className="text-black font-bold cursor-pointer hover:underline ml-1"
                >
                    {isSignUp ? "Sign In" : "Sign up for free"}
                </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;