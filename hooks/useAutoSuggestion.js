import { useState } from 'react';
import { pokemonNames } from '../data/pokemon';

export function useAutoSuggestion() {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSuggestion = (inputVal) => {
    if (inputVal.length >= 3) {
      const autoSuggestionRes = pokemonNames.filter((name) => {
        if (name.toLowerCase().includes(inputVal.toLowerCase())) {
          return name;
        }
      });

      setSuggestions(autoSuggestionRes);
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
      console.log(suggestions);
    } else {
      resetSuggestions();
    }
  };

  const resetSuggestions = () => {
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return {
    handleSuggestion,
    resetSuggestions,
    suggestions,
    showSuggestions,
    activeSuggestionIndex,
  };
}
