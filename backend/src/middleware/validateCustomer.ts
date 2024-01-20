import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { CustomerRepository } from '../repositories/customerRepository';

export const validateCustomerCreate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: { message: 'Name and Email is mandatory!' } });
  }

  try {
    const existingCustomer = await CustomerRepository.getCustomerByEmail( email);

    if (existingCustomer) {
      return res.status(400).json({ error: { message: 'Email already exists!' }});
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ error: { message: 'Internal Server Error' } });
  }
  
};