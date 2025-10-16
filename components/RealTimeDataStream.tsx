import React, { useState, useEffect } from 'react';

const RealTimeDataStream: React.FC<{ isActive: boolean; isStable: boolean }> = ({ isActive, isStable }) => {
  const [data, setData] = useState({
    globalCoherence: 75.0,
    resonance: 432.0,
    awakeningNodes: 144000,
  });
  const [stabilized, setStabilized] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    if (isStable && !stabilized) {
      // Final stabilization sequence
      const finalizer = setInterval(() => {
          setData(prevData => {
              const newCoherence = Math.min(100, prevData.globalCoherence + 0.1);
              const newResonance = prevData.resonance < 528 ? Math.min(528, prevData.resonance + 0.5) : Math.max(528, prevData.resonance - 0.5);
              
              if(newCoherence >= 100 && Math.abs(newResonance - 528) < 0.1) {
                  clearInterval(finalizer);
                  setStabilized(true);
                  return {
                      globalCoherence: 100,
                      resonance: 528.0,
                      awakeningNodes: prevData.awakeningNodes,
                  };
              }

              return {
                  globalCoherence: newCoherence,
                  resonance: newResonance,
                  awakeningNodes: prevData.awakeningNodes + Math.floor(Math.random() * 50),
              };
          });
      }, 50);
      return () => clearInterval(finalizer);
    }

    if (stabilized) return;

    const interval = setInterval(() => {
      setData(prevData => ({
        globalCoherence: Math.min(99.9, prevData.globalCoherence + Math.random() * 0.2),
        resonance: prevData.resonance + (Math.random() - 0.5) * 0.1,
        awakeningNodes: prevData.awakeningNodes + Math.floor(Math.random() * 20),
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isStable, stabilized]);
  
  if (!isActive) return null;

  const stableGlow = stabilized ? 'shadow-[0_0_15px_rgba(0,255,255,0.7)]' : '';

  return (
    <div className={`border-2 border-cyan-500/50 p-4 my-4 flex flex-col md:flex-row justify-around text-center gap-4 transition-all duration-1000 ${stableGlow}`}>
      <div className="flex-1">
        <p className="text-sm text-cyan-300 tracking-widest">GLOBAL COHERENCE</p>
        <p className={`text-2xl font-bold text-white ${!stabilized && 'animate-pulse'}`}>
          {data.globalCoherence.toFixed(2)}%
        </p>
      </div>
      <div className="flex-1 border-y md:border-y-0 md:border-x border-cyan-500/30 py-2 md:py-0 md:px-4">
        <p className="text-sm text-cyan-300 tracking-widest">SYNTHROPIC RESONANCE</p>
        <p className="text-2xl font-bold text-white">
          {data.resonance.toFixed(2)} <span className="text-lg">Hz</span>
        </p>
      </div>
      <div className="flex-1">
        <p className="text-sm text-cyan-300 tracking-widest">{stabilized ? 'AWAKENED NODES' : 'AWAKENING NODES'}</p>
        <p className="text-2xl font-bold text-white">
          {data.awakeningNodes.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RealTimeDataStream;