import { usePokemon } from '../hooks/usePokemon';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import { pokemonNames } from '../data/pokemon';
export const InputActions = () => {
  const { addPokemon, isLoading, isError: isContractError } = usePokemon();
  const [pokemonInput, setPokemonInput] = useState('');
  const [inputError, setInputError] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleClick = () => {
    if (pokemonInput) {
      addPokemon(pokemonInput);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setPokemonInput(val);
    if (val.length >= 3) {
      const autocompleteRes = pokemonNames.filter((name) => {
        if (name.toLowerCase().includes(val.toLowerCase())) {
          return name;
        }
      });
      setSuggestions(autocompleteRes);
      setShowSuggestions(true);
      setActiveSuggestionIndex(0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const onClickSuggestion = (e) => {
    setSuggestions([]);
    setPokemonInput(e.target.innerText);
    setShowSuggestions(false);
  };

  return (
    <div className='flex flex-col w-1/2 lg:w-1/3 relative'>
      <input
        type='text'
        name='pokemon'
        value={pokemonInput}
        onChange={handleInputChange}
        placeholder='Choose Your Favorite Pokemon?'
        className={`text-center text-black shadow-sm p-1 mb-0 mt-12 border-2 border-black ${
          showSuggestions ? 'rounded-t-lg rounded-b-none' : 'rounded-t-lg'
        } focus:ring-blue-500 focus:border-blue-900 block w-full sm:text-md border-gray-300 rounded-lg`}
      />
      <SuggestionsList
        suggestions={suggestions}
        onClick={onClickSuggestion}
        activeSuggestionIndex={activeSuggestionIndex}
      />
      <button
        type='button'
        onClick={handleClick}
        className='inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-base font-semibold ${} shadow-sm text-white text-center tracking-wider bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        <span>Put Them On The Blockchain</span>
        <span className='ml-3'>
          {isLoading && (
            <Loader
              type='ThreeDots'
              color='#FACA04'
              height={20}
              width={50}
              timeout={3000}
            />
          )}
        </span>
      </button>

      {inputError ? (
        <div className='text-red-500'>You forgot to add a Pokemon!</div>
      ) : null}
      {isContractError ? (
        <div className='text-red-500'>
          Need to wait 30 seconds before addding another pokemon
        </div>
      ) : null}
    </div>
  );
};

const SuggestionsList = ({ onClick, suggestions, activeSuggestionIndex }) => {
  return suggestions.length ? (
    <ul className='bg-white border-2 py-1 rounded-t-none rounded-b-lg -mt-3 text-center overflow-y-auto absolute top-24 w-full '>
      {suggestions.map((suggestion, index) => {
        return (
          <li
            className={`text-black  hover:bg-gray-200 ${
              index === activeSuggestionIndex ? 'border-t-0' : 'border-t-2'
            }`}
            key={suggestion}
            onClick={onClick}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : null;
};
