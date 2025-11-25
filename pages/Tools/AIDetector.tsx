import React from 'react';
import { ScanSearch } from 'lucide-react';
import CommonToolLayout from './CommonToolLayout';
import { detectAI } from '../../services/gemini';
import ReactMarkdown from 'react-markdown';

const AIDetector: React.FC = () => {
  return (
    <CommonToolLayout
      title="AI Pattern Detector"
      description="Analyze text for common AI generation patterns and characteristics."
      placeholder="Paste the text you want to analyze..."
      actionLabel="Scan for Patterns"
      icon={<ScanSearch size={24} />}
      onAction={detectAI}
      resultRenderer={(text: string) => (
        <div className="space-y-4">
             {/* Simple parsing to highlight the score if formatted as requested */}
            {text.includes("Score:") && (
                <div className={`p-4 rounded-xl border ${text.includes("80%") || text.includes("90%") || text.includes("100%") ? 'bg-red-50 border-red-100 text-red-800' : 'bg-green-50 border-green-100 text-green-800'}`}>
                    <h3 className="font-bold text-lg mb-1">Detection Result</h3>
                    <p className="text-sm opacity-90">Note: This is an AI-based pattern analysis, not a definitive proof.</p>
                </div>
            )}
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      )}
    />
  );
};

export default AIDetector;