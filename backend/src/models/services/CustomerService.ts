// models/CustomerService.ts
import { Customer } from '../Customer';
import { CustomerRepository } from '../../repositories/CustomerRepository';

export class CustomerService {
  static getAll(): Promise<Customer[]> {
    return CustomerRepository.getAllCustomers();
  }

  static getById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.getCustomerById(id);
  }

  static create(name: string, email: string, coordinateX: string, coordinateY: string): Promise<Customer> {
    return CustomerRepository.createCustomer(name, email, coordinateX, coordinateY);
  }

  // static update(id: number, name: string, description: string): Promise<Customer> {
  //   return CustomerRepository.updateCutomer(id, name, description);
  // }

  static delete(id: number): Promise<Customer> {
    return CustomerRepository.deleteCustomer(id);
  }
}