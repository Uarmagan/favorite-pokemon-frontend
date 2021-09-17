import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../utils/pokemonPortal.json';

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState(null);

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

  const addPokemon = async (message) => {
    const pokemonPortalContract = await pokemonPortalSetup();
    const pokemonTxn = await pokemonPortalContract.addPokemon(message);
    console.log('Mining....', pokemonTxn.hash);
    await pokemonTxn.wait();
    console.log('Mined -- ', pokemonTxn.hash);

    const updatedPokemon = await pokemonPortalContract.getAllPokemon();
    console.log(updatedPokemon);
    setAllPokemon(updatedPokemon);
  };

  useEffect(() => {
    (async () => {
      getAllPokemon();
    })();
  }, [addPokemon]);

  return { allPokemon, getAllPokemon, addPokemon };
}

const pokemonPortalSetup = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = '0xF98A36Aa19E5d360162a7a0fd98a756f85265D3c';
  const contractABI = abi.abi;
  return new ethers.Contract(contractAddress, contractABI, signer);
};
