import { Pool } from 'pg';
import { dbConfig } from '../config/database';
import { Customer } from '../models/Customer';

const pool = new Pool(dbConfig);

export class CustomerRepository {
  static async getAllCustomers(): Promise<Customer[]> {
    const result = await pool.query('SELECT * FROM customers');
    return result.rows;
  }

  static async getCustomerById(id: number): Promise<Customer | undefined> {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createCustomer(name: string, email: string, coordinateX: string, coordinateY: string): Promise<Customer> {
    const result = await pool.query('INSERT INTO customers (name, email, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4) RETURNING *', [name, email,coordinateX, coordinateY]);
    return result.rows[0];
  }

  // static async updateCutomer(id: number, name: string, description: string): Promise<Customer> {
  //   const result = await pool.query('UPDATE customers SET name = $2, description = $3 WHERE id = $1 RETURNING *', [id, name, description]);
  //   return result.rows[0];
  // }

  static async deleteCustomer(id: number): Promise<Customer> {
    const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}