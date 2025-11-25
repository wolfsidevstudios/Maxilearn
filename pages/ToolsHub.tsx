
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  PenTool, 
  ScanSearch, 
  Mic, 
  Globe, 
  Minimize2,
  BrainCircuit
} from 'lucide-react';

const ToolsHub: React.FC = () => {
  const tools = [
    { to: '/app/humanizer', icon: Sparkles, label: 'The Humanizer', desc: 'Rewrite AI text to sound human', color: 'text-purple-600', bg: 'bg-purple-50' },
    { to: '/app/quiz', icon: BrainCircuit, label: 'Quiz Generator', desc: 'Create flashcards from any text', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { to: '/app/notes', icon: FileText, label: 'Notes Generator', desc: 'Convert messy notes to guides', color: 'text-green-600', bg: 'bg-green-50' },
    { to: '/app/writer', icon: PenTool, label: 'Polished Writer', desc: 'Fix grammar and style', color: 'text-blue-600', bg: 'bg-blue-50' },
    { to: '/app/detector', icon: ScanSearch, label: 'AI Detector', desc: 'Check text for AI patterns', color: 'text-red-600', bg: 'bg-red-50' },
    { to: '/app/lecture', icon: Mic, label: 'Lecture Notes', desc: 'Summarize audio transcripts', color: 'text-orange-600', bg: 'bg-orange-50' },
    { to: '/app/research', icon: Globe, label: 'Research Assistant', desc: 'Find papers and citations', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { to: '/app/summarizer', icon: Minimize2, label: 'Summarizer', desc: 'Condense long articles', color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Tools Hub</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Select a specialized tool to enhance your study workflow. 
          Everything you need in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
            <Link 
                key={tool.label}
                to={tool.to} 
                className="group p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
            >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
                    <tool.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.label}</h3>
                <p className="text-sm text-gray-500">{tool.desc}</p>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsHub;
