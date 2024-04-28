import mongoose from 'mongoose';
import { IEvolution, IPokemon } from '../interfaces/Pokemon.js';

const evolutionSchema = new mongoose.Schema<IEvolution>({
  num: { type: String, required: true },
  name: { type: String, required: true },
});

const pokemonSchema = new mongoose.Schema<IPokemon>({
  id: { type: Number, required: true, unique: true },
  num: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  type: { type: [String], required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  candy: { type: String, required: true },
  egg: { type: String, required: true },
  spawn_chance: { type: Number, required: true },
  avg_spawns: { type: Number, required: true },
  spawn_time: { type: String, required: true },
  multipliers: { type: [Number], required: false },
  weaknesses: { type: [String], required: true },
  prev_evolution: { type: [evolutionSchema], required: false },
  next_evolution: { type: [evolutionSchema], required: false },
});

const PokemonModel = mongoose.model<IPokemon>('Pokemon', pokemonSchema);

export const pokemonJsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    num: { type: 'string' },
    name: { type: 'string' },
    img: { type: 'string' },
    type: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
    },
    height: { type: 'string' },
    weight: { type: 'string' },
    candy: { type: 'string' },
    egg: { type: 'string' },
    spawn_chance: { type: 'number' },
    avg_spawns: { type: 'number' },
    spawn_time: { type: 'string', nullable: true },
    multipliers: {
      anyOf: [{ type: 'array', items: { type: 'number' } }, { type: 'null' }],
    },
    weaknesses: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
    },
    prev_evolution: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          num: { type: 'string' },
          name: { type: 'string' },
        },
        required: ['num', 'name'],
      },
    },
    next_evolution: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          num: { type: 'string' },
          name: { type: 'string' },
        },
        required: ['num', 'name'],
      },
    },
  },
  required: ['id', 'num', 'name', 'img', 'type', 'height', 'weight', 'candy', 'egg', 'spawn_chance', 'avg_spawns', 'multipliers', 'weaknesses'],
};

export default PokemonModel;
