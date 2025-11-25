import React from 'react';
import { Check, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Pricing: React.FC = () => {
  const { upgradeToPro, userState } = useApp();

  const handleSubscribe = () => {
    // In a real app, this would check payment status. 
    // For this demo, clicking the button simulates a successful redirect flow
    window.open('https://buy.stripe.com/test_00weV77xQgAS1zzak49ws00', '_blank');
    // We'll simulate upgrade for demo purposes
    // upgradeToPro(); 
  };

  return (
    <div className="max-w-4xl mx-auto text-center py-10">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">Upgrade your learning.</h2>
      <p className="text-gray-500 mb-12 text-lg">Choose the plan that fits your study habits.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="border border-gray-200 rounded-3xl p-8 flex flex-col items-start text-left bg-gray-50 hover:bg-gray-100 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Free Student</h3>
          <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
          <p className="text-gray-500 mb-8 text-sm">Perfect for occasional help and quick questions.</p>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"><Check size={12} /></div>
              10 AI Credits per day
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"><Check size={12} /></div>
              Access to all basic tools
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"><Check size={12} /></div>
              Standard processing speed
            </li>
          </ul>

          <button disabled className="w-full py-3 rounded-full border border-gray-300 text-gray-500 font-medium cursor-default">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="border-2 border-amber-400 rounded-3xl p-8 flex flex-col items-start text-left bg-white relative shadow-2xl shadow-amber-100">
          <div className="absolute top-0 right-0 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
            MOST POPULAR
          </div>
          <div className="flex items-center gap-2 mb-2 text-amber-600">
            <Star size={20} fill="currentColor" />
            <h3 className="text-xl font-bold text-gray-900">Kyndra Circle</h3>
          </div>
          <div className="text-4xl font-bold mb-6">$20<span className="text-lg text-gray-400 font-normal">/mo</span></div>
          <p className="text-gray-500 mb-8 text-sm">Unlimited power for serious students and researchers.</p>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-900 font-medium">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Check size={12} /></div>
              Unlimited AI Credits
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-900 font-medium">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Check size={12} /></div>
              Advanced Logic Models (Gemini Pro)
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-900 font-medium">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Check size={12} /></div>
              Priority Support
            </li>
          </ul>

          <div className="flex gap-2 w-full">
            <button 
                onClick={handleSubscribe}
                className="flex-1 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-transform active:scale-95"
            >
                Subscribe Monthly ($20)
            </button>
             <button 
                onClick={handleSubscribe}
                className="flex-1 py-3 rounded-full border-2 border-black text-black font-medium hover:bg-gray-50 transition-transform active:scale-95"
            >
                Yearly ($15/mo)
            </button>
          </div>
          {/* Demo helper */}
          {!userState.isPro && (
            <button onClick={upgradeToPro} className="mt-4 text-xs text-gray-400 underline w-full text-center hover:text-gray-600">
                (Demo: Enable Pro Mode instantly)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;