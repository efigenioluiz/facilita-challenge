import { Pool } from 'pg';
import { dbConfig } from '../config/database';
import { Customer } from '../models/customer';

const pool = new Pool(dbConfig);

export class CustomerRepository {
  static async getAllCustomers(): Promise<Customer[]> {
    const result = await pool.query('SELECT * FROM customers');
    return result.rows;
  }
  
  static async getCustomersRoutes(): Promise<Customer[]> {
    const result = await pool.query('SELECT * FROM customers');

    const customers: Customer[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      coordinateX: row.coordinate_x,
      coordinateY: row.coordinate_y,
    }));
  
    return customers;
  }

  static async getCustomerById(id: number): Promise<Customer | undefined> {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  static async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    return result.rows[0];
  }
  
  static async getCustomersByArgs(searchTerm: string): Promise<Customer | undefined> {
    const result = await pool.query('SELECT * FROM customers WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1', [searchTerm]);
    return result.rows[0];
  }

  static async createCustomer(name: string, email: string, phone: string, coordinateX: string, coordinateY: string): Promise<Customer> {
    const result = await pool.query('INSERT INTO customers (name, email, phone,coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, phone, coordinateX, coordinateY]);
    return result.rows[0];
  }

  static async updateCutomer(id: number, name: string, email: string, phone: string,coordinateX: string, coordinateY: string): Promise<Customer> {
    const result = await pool.query('UPDATE customers SET name = $2, email = $3, phone = $4 ,coordinate_x = $5, coordinate_y = $6 WHERE id = $1 RETURNING *', [id,name, email, phone,coordinateX, coordinateY]);
    return result.rows[0];
  }

  static async deleteCustomer(id: number): Promise<Customer> {
    const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}