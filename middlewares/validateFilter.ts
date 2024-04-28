import { Request, Response, NextFunction } from 'express';

const validateFilter = (req: Request, res: Response, next: NextFunction) => {
  const filterType = req.params.filterType;

  const validFilterTypes = ['type'];
  if (!validFilterTypes.includes(filterType)) {
    return res.status(400).send({
      error: `Invalid filter field '${filterType}'. Valid fields are: ${validFilterTypes.join(', ')}`,
    });
  }
  next();
};
export default validateFilter;
