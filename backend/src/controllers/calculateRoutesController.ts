import { Request, Response } from 'express';
import { CustomerService } from '../models/services/customerService';
import { Customer } from '../models/customer';

export const calculateRoutesController = {
  getAllRoutes: async (_req: Request, res: Response) => {
    try {
      const customers: Customer[] = await CustomerService.getCustomersRoutes();

      if (customers.length === 0) {
        return res.status(400).json({ error: { message: 'Customers is empty' } });
      }

      const coordinates: number[][] = customers.map(customer => [
        parseFloat(customer.coordinateX),
        parseFloat(customer.coordinateY)
      ]);

      const invalidCoordinates = coordinates.filter(coord => isNaN(coord[0]) || isNaN(coord[1]));

      if (invalidCoordinates.length > 0) {
        return res.status(400).json({ error: { message: 'Invalid coordinates' } });
      }

      const visitOrderIndices: number[] = tspBruteforce(coordinates);

      const orderedCustomers: Customer[] = visitOrderIndices.map(index => customers[index]);

      res.json({ visitOrder: orderedCustomers });
    } catch (error) {
      return res.status(500).json({ error: { message: 'Internal Server Error' } });
    }
  }
};

const calculateDistance = (point1: number[], point2: number[]): number => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

// brute force to traveling salesman TSP
const tspBruteforce = (points: number[][]): number[] => {
  let bestWay: number[] | null = null;
  let shortestDistance = Number.POSITIVE_INFINITY;

  const allPermutations = generatePermutations(points);

  for (const permutation of allPermutations) {
    const totalDistance = calculateTotalDistance(permutation);

    if (totalDistance < shortestDistance) {
      shortestDistance = totalDistance;
      bestWay = permutation.map(point => points.findIndex(coord => coord[0] === point[0] && coord[1] === point[1]));
    }
  }

  return bestWay || [];
};

const calculateTotalDistance = (points: number[][]): number => {
  return points.reduce((accumulator, currentPoint, index) => {
    const nextPoint = index < points.length - 1 ? points[index + 1] : points[0];
    return accumulator + calculateDistance(currentPoint, nextPoint);
  }, 0);
};

const generatePermutations = (array: number[][]): number[][][] => {
  const result: number[][][] = [];

  const permute = (arr: number[][], start: number) => {
    if (start === arr.length - 1) {
      result.push(arr.map(a => [...a]));
      return;
    }

    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]]; 
    }
  };

  permute(array, 0);
  return result;
};
