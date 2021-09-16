import { ethers } from 'ethers';
import abi from '../utils/pokemonPortal.json';

export const InputActions = () => {
  const getPokemon = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = '0xfb6A0879bd42C26D129520a3F4157C6FCb123d78';
    const contractABI = abi.abi;
    const pokemonPortalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    let count = await pokemonPortalContract.getTotalPokemon();
    console.log('Total pokemon count is: ', count.toNumber());

    const pokemonTxn = await pokemonPortalContract.addPokemon();
    console.log('Mining....', pokemonTxn.hash);
    await pokemonTxn.wait();
    console.log('Mined -- ', pokemonTxn.hash);

    count = await pokemonPortalContract.getTotalPokemon();
    console.log('Total pokemon count is: ', count.toNumber());
  };

  return (
    <div className='flex flex-col w-1/2 space-y-3'>
      <input
        type='text'
        name='pokemon'
        placeholder='Choose Your Favorite Pokemon?'
        className='text-center text-black shadow-sm pt-0.5 mt-12 border-2 border-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-md border-gray-300 rounded-lg'
      />
      <button
        type='button'
        onClick={getPokemon}
        className='inline-flex justify-center px-3 py-1.5 border border-transparent text-base font-semibold rounded shadow-sm text-white text-center tracking-wider bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        Put Them On The Blockchain
      </button>
    </div>
  );
};
