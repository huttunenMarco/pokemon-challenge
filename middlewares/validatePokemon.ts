import { Request, Response, NextFunction } from 'express';
import { pokemonJsonSchema } from '../models/pokemon.js';

import _Ajv from 'ajv';

const Ajv = _Ajv as unknown as typeof _Ajv.default;

const ajv = new Ajv();

const validatePokemon = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.pokemon) {
    return res.status(400).json({ message: 'Pokemon data is missing in the request body' });
  }
  const validate = ajv.compile(pokemonJsonSchema);
  const valid = validate(req.body.pokemon);

  if (!valid) {
    return res.status(400).json({ message: `Invalid Pokemon data` });
  }

  next();
};

export { validatePokemon };
