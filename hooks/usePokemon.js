import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../utils/pokemonPortal.json';

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState(null);

  const getAllPokemon = async () => {
    const pokemonPortalContract = await pokemonPortalSetup();
    const pokemonRes = await pokemonPortalContract.getAllPokemon();
    console.log(pokemonRes);
    const pokemon = pokemonRes.map((_pokemon) => ({
      address: _pokemon.user,
      timestamp: new Date(_pokemon.timestamp * 1000),
      pokemonName: _pokemon.pokemonName,
    }));

    setAllPokemon(pokemon);
  };

  const addPokemon = async (message) => {
    const pokemonPortalContract = await pokemonPortalSetup();
    let count = await pokemonPortalContract.getTotalPokemon();
    console.log('Total pokemon count is: ', count.toNumber());

    const pokemonTxn = await pokemonPortalContract.addPokemon(message);
    console.log('Mining....', pokemonTxn.hash);
    await pokemonTxn.wait();
    console.log('Mined -- ', pokemonTxn.hash);

    count = await pokemonPortalContract.getTotalPokemon();
    console.log('Total pokemon count is: ', count.toNumber());
  };

  useEffect(() => {
    (async () => {
      getAllPokemon();
    })();
  }, []);

  return { allPokemon, getAllPokemon, addPokemon };
}

const pokemonPortalSetup = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = '0xF1ECACA2DAE25Aa11a9Df724d41D6c93865E97EE';
  const contractABI = abi.abi;
  return new ethers.Contract(contractAddress, contractABI, signer);
};
