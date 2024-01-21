import express from 'express';
import { customerController } from "../controllers/customerController"
import { validateCustomerCreateUpdate } from "../middleware/validateCustomer" 

const router = express.Router();

router.post('/', validateCustomerCreateUpdate ,customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);
router.delete('/:id', customerController.deleteCustomer);
router.get('/', customerController.getAllCustomers);
router.put('/:id',validateCustomerCreateUpdate ,customerController.updateCustomer);

export default router;