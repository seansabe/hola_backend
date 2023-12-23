const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/:customerId', customerController.getCustomer);
router.get('/', customerController.getCustomers);
router.put('/:customerId/policy', customerController.updateCustomerPolicy);
router.put('/:customerId', customerController.updateCustomer);
router.delete('/:customerId', customerController.deleteCustomer);
router.post('/delete', customerController.bulkDeleteCustomers);
router.delete('/', customerController.deleteAllCustomers);

module.exports = router;