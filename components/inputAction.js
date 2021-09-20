import { usePokemon } from '../hooks/usePokemon';
import { useState } from 'react';
import Loader from 'react-loader-spinner';

export const InputActions = () => {
  const { addPokemon, isLoading } = usePokemon();
  const [pokemonInput, setpokemonInput] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleClick = () => {
    if (pokemonInput) {
      addPokemon(pokemonInput);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <div className='flex flex-col w-1/2 lg:w-1/3 space-y-3'>
      <input
        type='text'
        name='pokemon'
        value={pokemonInput}
        onChange={(e) => setpokemonInput(e.target.value)}
        placeholder='Choose Your Favorite Pokemon?'
        className={`text-center text-black shadow-sm pt-0.5 mt-12 border-2 border-black rounded-lg focus:ring-blue-500 focus:border-blue-900 block w-full sm:text-md border-gray-300 rounded-lg`}
      />
      <button
        type='button'
        onClick={handleClick}
        className='inline-flex justify-center px-3 py-1.5 border border-transparent text-base font-semibold rounded shadow-sm text-white text-center tracking-wider bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        Put Them On The Blockchain
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
        <div className='text-red-500'>You forgot to add a Pokmon!</div>
      ) : null}
    </div>
  );
};
