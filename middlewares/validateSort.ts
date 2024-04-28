import { Request, Response, NextFunction } from 'express';

const validateFilter = (req: Request, res: Response, next: NextFunction) => {
  const sortField = (req.query.sort ?? 'id') as string;

  const validSortingFields: string[] = ['id', 'name', 'weight', 'height', 'spawn_chance', 'avg_spawns', 'spawn_time'];
  if (!validSortingFields.includes(sortField)) {
    return res.status(400).send({
      error: `Invalid sorting field '${sortField}'. Valid fields are: ${validSortingFields.join(', ')}`,
    });
  }
  next();
};
export default validateFilter;
