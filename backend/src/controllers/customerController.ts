import { Request, Response } from 'express';
import { CustomerService } from '../models/services/customerService';

export const customerController = {
  getAllCustomers: async (_req: Request, res: Response) => {
    const customers = await CustomerService.getAll();
    res.json(customers);
  },

  getCustomerById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const cutomer = await CustomerService.getById(Number(id));
    res.json(cutomer);
  },

  createCustomer: async (req: Request, res: Response) => {
    const { name, email, coordinateX, coordinateY } = req.body;
    console.log(name, email, coordinateX, coordinateY);
    const newCustomer = await CustomerService.create(name, email, coordinateX, coordinateY);
    res.json(newCustomer);
  },

//   updateItem: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     const updatedCustomer = await CustomerService.update(Number(id), name, description);
//     res.json(updatedCustomer);
//   },

  deleteCustomer: async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCustomer = await CustomerService.delete(Number(id));
    res.json(deletedCustomer);
  },
};