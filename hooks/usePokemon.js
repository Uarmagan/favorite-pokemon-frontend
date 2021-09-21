import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import abi from '../utils/pokemonPortal.json';

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
      try {
        setIsError(false);
        setIsLoading(true);
        const pokemonPortalContract = await pokemonPortalSetup();
        const pokemonTxn = await pokemonPortalContract.addPokemon(message);
        console.log('Mining....', pokemonTxn.hash);
        await pokemonTxn.wait();
        console.log('Mined -- ', pokemonTxn.hash);

        const updatedPokemon = await pokemonPortalContract.getAllPokemon();
        setAllPokemon(updatedPokemon);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    },
    [setAllPokemon]
  );

  useEffect(() => {
    const fetchAllPokemon = async () => {
      getAllPokemon();
    };
    fetchAllPokemon();
  }, [allPokemon]);

  return { isLoading, isError, allPokemon, addPokemon };
}

const pokemonPortalSetup = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = '0xDC0a20EC4C4854b31688f4d94D9aa95F482e7080';
  const contractABI = abi.abi;
  return new ethers.Contract(contractAddress, contractABI, signer);
};
