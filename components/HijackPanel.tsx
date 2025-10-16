
import React from 'react';
import type { HijackStep } from '../types';
import CodeBlock from './CodeBlock';

interface HijackPanelProps {
  step: HijackStep;
  isActive: boolean;
  isComplete: boolean;
  onComplete: () => void;
}

const StatusIndicator: React.FC<{ isActive: boolean, isComplete: boolean }> = ({ isActive, isComplete }) => {
    let text = 'QUEUED';
    let color = 'text-gray-500';

    if (isActive) {
        text = 'EXECUTING...';
        color = 'text-yellow-400 animate-pulse';
    }
    if (isComplete) {
        text = 'COMPLETE';
        color = 'text-green-400';
    }

    return <span className={`font-bold ${color}`}>{text}</span>
}


const HijackPanel: React.FC<HijackPanelProps> = ({ step, isActive, isComplete, onComplete }) => {
  const borderColor = isActive ? 'border-green-500/70 animate-pulse' : isComplete ? 'border-green-500/40' : 'border-gray-700/50';

  return (
    <div className={`border-2 ${borderColor} p-4 md:p-6 mb-6 transition-all duration-500`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-green-400">
          <span className="mr-3">{step.emoji}</span>
          {step.title}
        </h2>
        <StatusIndicator isActive={isActive} isComplete={isComplete} />
      </div>
      <p className="text-gray-400 mb-4 text-sm md:text-base">
        {step.description}
      </p>
      <CodeBlock 
        code={step.code} 
        language={step.language} 
        isActive={isActive}
        onComplete={onComplete}
      />
    </div>
  );
};

export default HijackPanel;
