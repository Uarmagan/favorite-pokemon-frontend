import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import abi from '../utils/pokemonPortal.json';

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getAllPokemon = async () => {
    const pokemonPortalContract = await pokemonPortalSetup();
    const pokemonRes = await pokemonPortalContract.getAllPokemon();
    const pokemon = pokemonRes.map((_pokemon) => ({
      address: _pokemon.user,
      timestamp: new Date(_pokemon.timestamp * 1000),
      pokemonName: _pokemon.pokemonName,
    }));

    setAllPokemon(pokemon);
  };

  const addPokemon = useCallback(
    async (message) => {
      setIsLoading(true);
      const pokemonPortalContract = await pokemonPortalSetup();
      const pokemonTxn = await pokemonPortalContract.addPokemon(message);
      console.log('Mining....', pokemonTxn.hash);
      await pokemonTxn.wait();
      console.log('Mined -- ', pokemonTxn.hash);

      const updatedPokemon = await pokemonPortalContract.getAllPokemon();
      setAllPokemon(updatedPokemon);
      setIsLoading(false);
    },
    [setAllPokemon]
  );

  useEffect(() => {
    const fetchAllPokemon = async () => {
      getAllPokemon();
    };
    fetchAllPokemon();
  }, [allPokemon]);

  return { isLoading, allPokemon, addPokemon };
}

const pokemonPortalSetup = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = '0xD2B82738F5fd50f675Bb156Fd3b045C08B9C0ec1';
  const contractABI = abi.abi;
  return new ethers.Contract(contractAddress, contractABI, signer);
};
