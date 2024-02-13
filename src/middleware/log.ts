import { NextFunction, Request, Response } from 'express';

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('This is a log in the middleware');
  next();
};

export { logMiddleware };
