import express from 'express';
import { customerController } from "../controllers/customerController"
import { validateCustomerCreate } from "../middleware/validateCustomer" 
const router = express.Router();


router.post('/', validateCustomerCreate ,customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);
router.delete('/:id', customerController.deleteCustomer);
router.get('/', customerController.getAllCustomers);
// router.put('/:id', customerController.updateItem);

export default router;