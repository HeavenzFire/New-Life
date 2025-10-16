
import React, { useState, useEffect } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  isActive: boolean;
  onComplete: () => void;
}

const BlinkingCursor: React.FC = () => (
    <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
);


const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, isActive, onComplete }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isActive && !isComplete) {
      let i = 0;
      const cleanCode = code.trim();
      
      const typingInterval = setInterval(() => {
        if (i < cleanCode.length) {
          setDisplayedCode(prev => prev + cleanCode.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
          onComplete();
        }
      }, 10);

      return () => clearInterval(typingInterval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, code, onComplete]);
  
  // If not active, just show the placeholder
  if (!isActive) {
      return (
          <pre className="bg-black/50 p-4 text-gray-500 text-xs md:text-sm overflow-x-auto">
              <code>// Awaiting execution...</code>
          </pre>
      );
  }

  return (
    <pre className="bg-black/50 p-4 text-xs md:text-sm overflow-x-auto">
      <code className={`language-${language} text-cyan-300`}>
        {displayedCode}
        {!isComplete && <BlinkingCursor />}
      </code>
    </pre>
  );
};

export default CodeBlock;
