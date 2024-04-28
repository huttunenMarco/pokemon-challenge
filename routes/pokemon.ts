import express, { Router, Request, Response } from 'express';
import PokemonModel from '../models/pokemon.ts';
import { validatePokemon } from '../middlewares/validatePokemon.ts';
import fuzzy from '../utils/fuzzy.ts';
import { addNewPokemonToEvolutionTree, getEvolutionChain, getPokemon } from '../utils/pokemon.ts';
import { IPokemon } from '../interfaces/Pokemon.ts';
import validateFilter from '../middlewares/validateFilter.ts';
import validateSort from '../middlewares/validateSort.ts';

const router: Router = express.Router();

router.get('/', async function (_req: Request, res: Response) {
  try {
    const pokemons = await PokemonModel.find();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Pokemon' });
  }
});

router.post('/', validatePokemon, async (req: Request, res: Response) => {
  const pokemon: IPokemon = req.body.pokemon;
  const existingPokemonId = req.body.existingPokemonId;
  const evolutionType = req.body.evolutionType;

  try {
    const newPokemon = await PokemonModel.create(pokemon);

    if (existingPokemonId && evolutionType) {
      try {
        const existingPokemon = await getPokemon(existingPokemonId);
        if (existingPokemon) {
          await addNewPokemonToEvolutionTree(existingPokemon, evolutionType, newPokemon);
        }
      } catch (e) {
        res.status(500).send(`Could not save the new pokemon as ${evolutionType} in pokemon with id ${existingPokemonId}: ${e.message}`);
      }
    }

    res.send(newPokemon);
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const name = req.query.name;

    if (!name || name.length < 3) {
      return res.status(400).json({
        error: 'Name parameter must be provided and have a minimum length of three characters',
      });
    }

    const pokemons = await PokemonModel.find();
    const matchingPokemons = fuzzy.search(pokemons, name);

    if (matchingPokemons.length === 0) {
      return res.status(404).json({ error: `No Pokémon found matching the name '${name}'` });
    }

    res.json(matchingPokemons);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/filter/:filterType', validateFilter, validateSort, async (req: Request, res: Response): Promise<void> => {
  try {
    const sortField = req.query.sort ?? 'id';
    const sortOrder: -1 | 1 = req.query.order === 'desc' ? -1 : 1;
    const filterQuery = req.query.query;
    const filterType = req.params.filterType;

    const filterQueryCI: RegExp = new RegExp(`^${filterQuery}$`, 'i');
    const pokemons = await PokemonModel.find({
      [filterType]: { $regex: filterQueryCI },
    }).sort({ [sortField]: sortOrder });

    res.json(pokemons);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.get('/suggest/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const providedPokemon = await PokemonModel.findOne({ id });

    if (!providedPokemon) {
      return res.status(404).json({ message: 'Provided Pokémon not found' });
    }

    const weaknesses = providedPokemon.weaknesses;

    const pokemon = await PokemonModel.findOne({
      weaknesses: { $nin: weaknesses },
      type: { $in: weaknesses },
    });

    if (!pokemon) {
      return res.status(404).json({ message: 'No suggested Pokémon found' });
    }

    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async function (req: Request, res: Response) {
  try {
    const pokemon = await getPokemon(req.params.id);
    if (pokemon) {
      const nextEvolutions = await getEvolutionChain(pokemon.next_evolution || [], 'next_evolution');
      const prevEvolutions = await getEvolutionChain(pokemon.prev_evolution || [], 'prev_evolution');
      res.json({
        pokemon,
        nextEvolutions,
        prevEvolutions,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Pokemon' });
  }
});

export default router;
