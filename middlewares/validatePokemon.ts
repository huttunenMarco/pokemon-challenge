import { Request, Response, NextFunction } from 'express';
import _Ajv from 'ajv';
import { pokemonJsonSchema } from '../models/pokemon.ts';

const Ajv = _Ajv as unknown as typeof _Ajv.default; // https://github.com/ajv-validator/ajv/issues/2132#issuecomment-1290409907
const ajv = new Ajv();

const validatePokemon = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.pokemon) {
    return res.status(400).json({ message: 'Pokemon data is missing in the request body' });
  }
  const validate = ajv.compile(pokemonJsonSchema);
  const valid = validate(req.body.pokemon);

  if (!valid) {
    const errors = validate.errors?.map((error) => error.message).join(', ');
    return res.status(400).json({ message: `Invalid Pokemon data: ${errors}` });
  }

  next();
};

export { validatePokemon };
