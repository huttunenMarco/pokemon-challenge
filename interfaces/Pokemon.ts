export interface IPokemon {
  id: number;
  num: string;
  name: string;
  img: string;
  type: string[];
  height: string;
  weight: string;
  candy: string;
  egg: string;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time?: string;
  multipliers: number[] | null;
  weaknesses: string[];
  prev_evolution?: IEvolution[];
  next_evolution?: IEvolution[];
}

export interface IEvolution {
  num: string;
  name: string;
}

export type EvolutionType = 'next_evolution' | 'prev_evolution';
