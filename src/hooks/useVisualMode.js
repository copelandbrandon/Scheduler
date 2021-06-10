import React, {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory(prev => [...prev, newMode]);
    setMode(newMode);
    if (replace) {
      const historyCopy = [...history];
      historyCopy.splice(historyCopy.length-1, 1, newMode)
      setHistory(historyCopy);
      setMode(newMode);
    }
  };

  function back() {
    if (history.length > 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setMode(historyCopy[historyCopy.length-1]);
      setHistory(historyCopy);
    }
  };

  return {mode, transition, back, history};
};