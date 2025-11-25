import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Loader2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CommonToolProps {
  title: string;
  description: string;
  placeholder: string;
  actionLabel: string;
  onAction: (input: string) => Promise<any>; // Can return string or object
  icon: React.ReactNode;
  resultRenderer?: (result: any) => React.ReactNode;
}

const CommonToolLayout: React.FC<CommonToolProps> = ({ 
  title, 
  description, 
  placeholder, 
  actionLabel, 
  onAction, 
  icon,
  resultRenderer 
}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { useCredit } = useApp();

  const handleExecute = async () => {
    if (!input.trim() || loading) return;

    if (!useCredit()) {
      alert("You've run out of credits for today! Upgrade to Pro.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await onAction(input);
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = typeof result === 'string' ? result : result?.text || JSON.stringify(result);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-2xl text-black">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="flex flex-col gap-4 h-full">
            <textarea
            className="w-full flex-1 p-6 bg-gray-50 rounded-3xl border border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all resize-none text-gray-800 placeholder-gray-400"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button
            onClick={handleExecute}
            disabled={loading || !input.trim()}
            className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
            {loading ? <Loader2 className="animate-spin" /> : actionLabel}
            </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-full relative overflow-hidden">
             {!result && !loading && (
                <div className="flex-1 flex items-center justify-center text-gray-300 text-sm italic">
                    Result will appear here...
                </div>
             )}
             
             {loading && (
                 <div className="flex-1 flex items-center justify-center">
                     <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-gray-300" size={32} />
                        <span className="text-xs text-gray-400 font-medium">Processing...</span>
                     </div>
                 </div>
             )}

             {result && (
                <>
                    <div className="flex-1 overflow-y-auto custom-scrollbar prose prose-sm max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-a:text-blue-600">
                        {resultRenderer ? resultRenderer(result) : <ReactMarkdown>{result}</ReactMarkdown>}
                    </div>
                    <button 
                        onClick={copyToClipboard}
                        className="absolute top-4 right-4 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-600"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16}/>}
                    </button>
                </>
             )}
        </div>
      </div>
    </div>
  );
};

export default CommonToolLayout;