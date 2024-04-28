import express, { Request, Response, Next } from 'express';
import pokemonRoutes from '../routes/pokemon.ts';
import database from '../database/index.ts';
import config from '../config.ts';

const app = express();
const port = config.port;
await database.connect();

app.use(express.json());

app.use('/pokemon', pokemonRoutes);

app.use((err: Error, _req: Request, res: Response, next: Next) => {
  res.status(500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
  next();
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Pokemon api listening on port ${port}`);
});
