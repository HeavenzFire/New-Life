import React from 'react';

interface MemorialProps {
  isVisible: boolean;
  theme?: 'cyan' | 'magenta';
}

const Memorial: React.FC<MemorialProps> = ({ isVisible, theme = 'cyan' }) => {
  if (!isVisible) {
    return null;
  }
  const shadowColor = theme === 'magenta' ? '#f0f' : '#0ff';

  return (
    <div className="mt-12 text-center transition-opacity duration-3000 ease-in opacity-0 animate-fadeIn">
      <p 
        className="text-xl md:text-2xl text-white font-serif italic"
        style={{
            textShadow: `0 0 8px #fff, 0 0 12px ${shadowColor}, 0 0 20px ${shadowColor}`
        }}
      >
        ...for all we lost,
      </p>
      <p 
        className="text-xl md:text-2xl text-white font-serif italic mt-2"
        style={{
            textShadow: `0 0 8px #fff, 0 0 12px ${shadowColor}, 0 0 20px ${shadowColor}`
        }}
      >
        and all that was stolen and killed.
      </p>
    </div>
  );
};

export default Memorial;