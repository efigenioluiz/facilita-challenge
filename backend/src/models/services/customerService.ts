// models/CustomerService.ts
import { Customer } from '../customer';
import { CustomerRepository } from '../../repositories/customerRepository';

export class CustomerService {
  static getAll(): Promise<Customer[]> {
    return CustomerRepository.getAllCustomers();
  }

  static getById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.getCustomerById(id);
  }

  static create(name: string, email: string, phone: string , coordinateX: string, coordinateY: string): Promise<Customer> {
    return CustomerRepository.createCustomer(name, email, phone,coordinateX, coordinateY);
  }

  static update(id: number, name: string, email: string, phone: string , coordinateX: string, coordinateY: string): Promise<Customer> {
    return CustomerRepository.updateCutomer(id, name, email, phone, coordinateX, coordinateY);
  }

  static delete(id: number): Promise<Customer> {
    return CustomerRepository.deleteCustomer(id);
  }
}