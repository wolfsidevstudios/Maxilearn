import React from 'react';
import { Mic } from 'lucide-react';
import CommonToolLayout from './CommonToolLayout';
import { processLecture } from '../../services/gemini';

const LectureNotes: React.FC = () => {
  return (
    <CommonToolLayout
      title="Lecture Notes"
      description="Summarize lecture transcripts into key topics and action items."
      placeholder="Paste the transcript from your lecture recording here..."
      actionLabel="Summarize Lecture"
      icon={<Mic size={24} />}
      onAction={processLecture}
    />
  );
};

export default LectureNotes;