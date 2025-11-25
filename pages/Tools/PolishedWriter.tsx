import React from 'react';
import { PenTool } from 'lucide-react';
import CommonToolLayout from './CommonToolLayout';
import { polishWriting } from '../../services/gemini';

const PolishedWriter: React.FC = () => {
  return (
    <CommonToolLayout
      title="Polished Writer"
      description="Fix grammar, improve flow, and elevate your writing style."
      placeholder="Paste your draft essay or paragraph here..."
      actionLabel="Polish My Writing"
      icon={<PenTool size={24} />}
      onAction={polishWriting}
    />
  );
};

export default PolishedWriter;