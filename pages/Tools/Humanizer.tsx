import React from 'react';
import { Sparkles } from 'lucide-react';
import CommonToolLayout from './CommonToolLayout';
import { humanizeText } from '../../services/gemini';

const Humanizer: React.FC = () => {
  return (
    <CommonToolLayout
      title="The Humanizer"
      description="Rewrite AI-generated text to sound more natural and less robotic."
      placeholder="Paste your AI-generated text here..."
      actionLabel="Humanize Text"
      icon={<Sparkles size={24} />}
      onAction={humanizeText}
    />
  );
};

export default Humanizer;