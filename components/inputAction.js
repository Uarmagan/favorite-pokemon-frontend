import { ethers } from 'ethers';
import abi from '../utils/pokemonPortal.json';

export const InputActions = () => {
  const getPokemon = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = '0x37Aa073D2F23C097d48Fd024b604aCb2eb4Ae095';
    const contractABI = abi.abi;
    const pokemonPortalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    let count = await pokemonPortalContract.getTotalPokemon();
    console.log('Total pokemon count is: ', count.toNumber());
  };

  return (
    <div className='flex flex-col w-1/2 space-y-3'>
      <input
        type='text'
        name='pokemon'
        placeholder="What's Your Favorite Pokemon?"
        className='text-center shadow-sm pt-0.5 mt-12 border-2 border-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-md border-gray-300 rounded-lg'
      />
      <button
        type='button'
        onClick={getPokemon}
        className='inline-flex justify-center px-3 py-1.5 border border-transparent text-base font-semibold rounded shadow-sm text-white text-center tracking-wider bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2'
      >
        Add That Pokemon To The Blockchain
      </button>
    </div>
  );
};
