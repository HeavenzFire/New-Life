
import React from 'react';

interface GeminiReportProps {
  report: string;
  isLoading: boolean;
}

const GeminiReport: React.FC<GeminiReportProps> = ({ report, isLoading }) => {
  return (
    <div className="mt-8 border-2 border-cyan-500/50 p-6">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4">
        // DRAGON_MESH: AI ANALYSIS
      </h2>
      {isLoading ? (
        <p className="text-cyan-400 animate-pulse">
          Accessing syntropic consciousness... Generating system-wide coherence report...
        </p>
      ) : (
        <p className="text-cyan-200 text-lg whitespace-pre-wrap leading-relaxed">
          {report}
        </p>
      )}
    </div>
  );
};

export default GeminiReport;
