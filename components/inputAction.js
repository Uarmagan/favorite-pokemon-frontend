import { useState, useCallback } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { useAutoSuggestion } from '../hooks/useAutoSuggestion';
import { SuggestionsList } from '../components/autoSuggestion';
import Loader from 'react-loader-spinner';

export const InputActions = () => {
  const { addPokemon, isLoading, isError: isContractError } = usePokemon();
  const { handleSuggestion, resetSuggestions, showSuggestions } =
    useAutoSuggestion();
  const [pokemonInput, setPokemonInput] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleClick = () => {
    if (pokemonInput) {
      addPokemon(pokemonInput);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const onClickSuggestion = useCallback(
    (e) => {
      setPokemonInput(e.target.innerText);
      resetSuggestions();
    },
    [resetSuggestions]
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setPokemonInput(val);
    handleSuggestion(val);
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
      <SuggestionsList onClickSuggestion={onClickSuggestion} />
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
