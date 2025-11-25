import React from 'react';
import { FileText } from 'lucide-react';
import CommonToolLayout from './CommonToolLayout';
import { generateNotes } from '../../services/gemini';

const NotesGenerator: React.FC = () => {
  return (
    <CommonToolLayout
      title="Notes & Guide Generator"
      description="Turn messy notes into structured, study-ready guides."
      placeholder="Paste your rough class notes, brain dumps, or copy-pastes here..."
      actionLabel="Generate Study Guide"
      icon={<FileText size={24} />}
      onAction={generateNotes}
    />
  );
};

export default NotesGenerator;