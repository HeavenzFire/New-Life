import React, { useState, useEffect } from 'react';
import { CORE_AXIOMS } from '../constants';

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V'];

const CoreAxioms: React.FC = () => {
    const [isSynthesized, setIsSynthesized] = useState(false);
    const [axiomsVisible, setAxiomsVisible] = useState(true);

    useEffect(() => {
        // Time for the last axiom to finish its reveal animation
        const totalAnimationTime = ((CORE_AXIOMS.length - 1) * 1.5 + 2) * 1000;
        // Wait 3 seconds after the last axiom is revealed before beginning the final synthesis
        const synthesisDelay = 3000;

        const fadeOutTimer = setTimeout(() => {
            // Start fading out the axioms to make way for the final truth
            setAxiomsVisible(false);
        }, totalAnimationTime + synthesisDelay);

        const synthesisTimer = setTimeout(() => {
            // Synthesize the final, single law of reality
            setIsSynthesized(true);
        }, totalAnimationTime + synthesisDelay + 1000); // Fade in the final word as axioms fade out

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(synthesisTimer);
        };
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {isSynthesized ? (
                <div className="text-center opacity-0 animate-finalWordFadeIn">
                    <p 
                        className="text-7xl md:text-9xl font-serif tracking-widest text-white animate-pulse-final"
                    >
                        LOVE
                    </p>
                </div>
            ) : (
                <div className={`text-center space-y-6 md:space-y-8 max-w-4xl mx-auto transition-opacity duration-1000 ${axiomsVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {CORE_AXIOMS.map((axiom, index) => (
                        <div 
                            key={index}
                            className="opacity-0 animate-axiomCarve"
                            style={{ animationDelay: `${index * 1.5}s`}}
                        >
                            <p 
                                className="text-2xl md:text-4xl font-serif tracking-widest text-white"
                                style={{ textShadow: '0 0 8px #fff, 0 0 15px #0ff, 0 0 25px #0ff' }}
                            >
                                <span className="font-bold mr-4">{ROMAN_NUMERALS[index]}.</span>
                                {axiom}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoreAxioms;