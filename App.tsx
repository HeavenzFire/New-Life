import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import HijackPanel from './components/HijackPanel';
import GeminiReport from './components/GeminiReport';
import RealTimeDataStream from './components/RealTimeDataStream';
import Memorial from './components/Memorial';
import Transcendence from './components/Transcendence';
import { HIJACK_STEPS, FULL_TAKEOVER_CONTEXT } from './constants';
import { generateSystemReport } from './services/geminiService';
import type { HijackStep } from './types';

const App: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<HijackStep[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [geminiReport, setGeminiReport] = useState<string>('');
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [isSequenceComplete, setIsSequenceComplete] = useState<boolean>(false);
  const [isTranscended, setIsTranscended] = useState<boolean>(false);

  const startSequence = useCallback(() => {
    setActiveStepIndex(0);
    setVisibleSteps([HIJACK_STEPS[0]]);
  }, []);

  const handleStepComplete = useCallback((stepId: number) => {
    setCompletedSteps(prev => new Set(prev).add(stepId));

    const nextStepIndex = activeStepIndex + 1;
    if (nextStepIndex < HIJACK_STEPS.length) {
      setTimeout(() => {
        setActiveStepIndex(nextStepIndex);
        setVisibleSteps(prev => [...prev, HIJACK_STEPS[nextStepIndex]]);
      }, 1000); // Wait 1 second before starting the next step
    } else {
        // All steps code blocks are finished, now fetch gemini report
        setIsGeneratingReport(true);
        generateSystemReport(FULL_TAKEOVER_CONTEXT).then(report => {
            setGeminiReport(report);
            setIsGeneratingReport(false);
            setTimeout(() => {
              setIsSequenceComplete(true);
              // After memorial is visible, trigger the final transcendence
              setTimeout(() => setIsTranscended(true), 5000);
            }, 1000); 
        });
    }
  }, [activeStepIndex]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      startSequence();
    }, 1500); // Initial delay before sequence starts
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTranscended) {
    return <Transcendence />;
  }

  const progress = (completedSteps.size / HIJACK_STEPS.length) * 100;

  return (
    <div 
        className="min-h-screen bg-black bg-opacity-80 backdrop-blur-sm"
        style={{
            backgroundImage: 'radial-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }}
    >
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <Header />
        <ProgressBar progress={progress} />
        <RealTimeDataStream isActive={activeStepIndex > -1} isStable={isSequenceComplete} />

        <main className="mt-6">
          {visibleSteps.map((step, index) => (
            <HijackPanel
              key={step.id}
              step={step}
              isActive={index === activeStepIndex}
              isComplete={completedSteps.has(step.id)}
              onComplete={() => handleStepComplete(step.id)}
            />
          ))}
          
          {completedSteps.size === HIJACK_STEPS.length && (
              <GeminiReport report={geminiReport} isLoading={isGeneratingReport} />
          )}

          <Memorial isVisible={isSequenceComplete} theme="cyan" />

        </main>
      </div>
    </div>
  );
};

export default App;