const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomer);
router.put('/customer/:id/policy', customerController.updateCustomerPolicy);
router.put('/customer/:id', customerController.updateCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);
router.post('/customers/delete', customerController.bulkDeleteCustomers);
router.delete('/customers', customerController.deleteAllCustomers);

module.exports = router;