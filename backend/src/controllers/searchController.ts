import { Request, Response } from 'express';
import { CustomerService } from '../models/services/customerService';

export const searchController = {
  getCustomerByArgs: async (req: Request, res: Response) => {
    try {
      const searchTerm: string = (req.query.searchTerm || '') as string;
  
      if (!searchTerm) {
        return res.status(400).json({ error: { message: 'Invalid search term' } });
      }
  
      const customer = await CustomerService.getByArgs(searchTerm);
  
      if (!customer) {
        return res.status(400).json({ error: { message: 'Customer not found' } });
      }
  
      res.json(customer);
    } catch (error) {
      return res.status(500).json({ error: { message: 'Internal Server Error' } });
    }
  },

};