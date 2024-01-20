import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express-serve-static-core';

export const validateCustomerCreate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: { message: 'Name and Email is mandatory!' } });
  }

  next();
};