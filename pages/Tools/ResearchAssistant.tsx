import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import CommonToolLayout from './CommonToolLayout';
import { researchTopic } from '../../services/gemini';
import ReactMarkdown from 'react-markdown';

const ResearchAssistant: React.FC = () => {
  return (
    <CommonToolLayout
      title="Research Assistant"
      description="Find papers, generate literature reviews, and get cited answers."
      placeholder="Enter your research topic or question (e.g., 'Impact of AI on education systems')..."
      actionLabel="Start Research"
      icon={<Globe size={24} />}
      onAction={researchTopic}
      resultRenderer={(result: { text: string; sources: string[] }) => (
        <div>
          <div className="prose prose-sm max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-a:text-blue-600">
             <ReactMarkdown>{result.text}</ReactMarkdown>
          </div>
          
          {result.sources && result.sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Sources Found</h4>
              <ul className="space-y-2">
                {result.sources.map((source, index) => (
                  <li key={index}>
                    <a 
                        href={source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-blue-600 hover:underline truncate"
                    >
                        <ExternalLink size={10} />
                        {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ResearchAssistant;