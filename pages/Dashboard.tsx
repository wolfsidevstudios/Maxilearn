import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, FileText, Globe } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-8 p-4 bg-gray-50 rounded-3xl inline-block">
        <span className="text-4xl">🎓</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Maxi Learn</h1>
      <p className="text-gray-500 max-w-md mb-12">
        Your all-in-one AI powered workspace. Select a tool from the sidebar to get started.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
        <Link to="/tutor" className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors text-left group">
            <Bot className="mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-900">AI Tutor</h3>
            <p className="text-xs text-gray-500 mt-1">Ask questions & brainstorm.</p>
        </Link>
        <Link to="/humanizer" className="p-6 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors text-left group">
            <Sparkles className="mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-900">Humanizer</h3>
            <p className="text-xs text-gray-500 mt-1">Rewrite AI text naturally.</p>
        </Link>
        <Link to="/notes" className="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors text-left group">
            <FileText className="mb-4 text-green-600 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-900">Notes Gen</h3>
            <p className="text-xs text-gray-500 mt-1">Messy text to structure.</p>
        </Link>
        <Link to="/research" className="p-6 rounded-2xl bg-orange-50 hover:bg-orange-100 transition-colors text-left group">
            <Globe className="mb-4 text-orange-600 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-900">Research</h3>
            <p className="text-xs text-gray-500 mt-1">Find papers & sources.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;