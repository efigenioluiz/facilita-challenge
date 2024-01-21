import { Request, Response } from 'express';
import { CustomerService } from '../models/services/customerService';

export const customerController = {
  getAllCustomers: async (_req: Request, res: Response) => {
    const customers = await CustomerService.getAll();

    if ( customers.length === 0 ){
      return res.status(400).json({ error: { message: 'Customers is empty' } });
    }
    res.json(customers);
  },

  getCustomerById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await CustomerService.getById(Number(id));
    
    if (!customer) {
      return res.status(400).json({ error: { message: 'Customer not found' } });
    }
    res.json(customer);
  },

  createCustomer: async (req: Request, res: Response) => {
    const { name, email, phone, coordinateX, coordinateY } = req.body;
    const newCustomer = await CustomerService.create(name, email, phone, coordinateX, coordinateY);
    res.json(newCustomer);
  },
  
  updateCustomer: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, phone, coordinateX, coordinateY } = req.body;

    const customer = await CustomerService.getById(Number(id));
    
    if (!customer) {
      return res.status(400).json({ error: { message: 'Customer not found' } });
    }
    
    const updatedCustomer = await CustomerService.update(Number(id), name, email, phone, coordinateX, coordinateY);
    res.json(updatedCustomer);
  },

  deleteCustomer: async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCustomer = await CustomerService.delete(Number(id));

    if (!deletedCustomer) {
      return res.status(400).json({ error: { message: 'Customer not found' } });
    }
    
    res.json(deletedCustomer);
  },
};