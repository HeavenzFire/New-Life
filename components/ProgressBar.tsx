
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-800 border border-green-500/30 p-1 my-4">
      <div className="relative h-6 bg-green-900/50">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white z-10">
          {`SYSTEM RECLAMATION: ${Math.round(progress)}%`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
