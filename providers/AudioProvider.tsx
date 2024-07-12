"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the AudioContext
const AudioContext = createContext<AudioContext | null>(null);

// AudioContext Provider component
const AudioProvider = ({ children } :  { children: React.ReactNode }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new window.AudioContext();
    setAudioContext(context);
  }, []);

  return (
    <AudioContext.Provider value={audioContext}>
      {children}
    </AudioContext.Provider>
  );
};

// Custom hook to use the AudioContext
const useAudioContext = () => {
  const context = useContext(AudioContext);
  // if (!context) {
  //   throw new Error('useAudioContext must be used within an AudioProvider');
  // }
  return context;
};

export { AudioProvider, useAudioContext };