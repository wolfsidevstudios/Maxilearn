import React from 'react';
import { Minimize2 } from 'lucide-react';
import CommonToolLayout from './CommonToolLayout';
import { summarizeContent } from '../../services/gemini';

const Summarizer: React.FC = () => {
  return (
    <CommonToolLayout
      title="Content Summarizer"
      description="Condense long articles, PDFs, or papers into key bullet points."
      placeholder="Paste the long text content here..."
      actionLabel="Summarize"
      icon={<Minimize2 size={24} />}
      onAction={summarizeContent}
    />
  );
};

export default Summarizer;