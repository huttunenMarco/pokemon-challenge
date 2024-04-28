/* eslint-disable complexity */
import PokemonModel from '../models/pokemon.js';
import { IPokemon, IEvolution, EvolutionType } from '../interfaces/Pokemon.js';

export const getEvolutionChain = async (evolutions: IEvolution[], evolutionType: EvolutionType, chain: IPokemon[] = [], visited = new Set()) => {
  if (evolutions.length === 0) {
    return chain;
  }

  for (const evolution of evolutions) {
    if (!visited.has(evolution.num)) {
      const evolvedPokemon = await getPokemon(evolution.num, 'num');
      if (evolvedPokemon) {
        chain.push(evolvedPokemon);
        visited.add(evolution.num);
        await getEvolutionChain(evolvedPokemon[evolutionType] || [], evolutionType, chain, visited);
      }
    }
  }

  return chain;
};

export const addNewPokemonToEvolutionTree = async (existingPokemon: IPokemon, evolutionType: EvolutionType, newPokemon: IPokemon) => {
  const evolutionTree = existingPokemon[evolutionType] ?? [];
  evolutionTree.push(newPokemon);
  await PokemonModel.findOneAndUpdate({ id: existingPokemon.id }, existingPokemon, { upsert: true });
};

export const getPokemon = async (value: string | number, attr: 'num' | 'id' = 'id') => {
  return await PokemonModel.findOne({ [attr]: value });
};
