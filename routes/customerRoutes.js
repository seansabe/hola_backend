const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomer);
router.get('/', customerController.getCustomers);
router.put('/:id/policy', customerController.updateCustomerPolicy);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.post('/delete', customerController.bulkDeleteCustomers);
router.delete('/', customerController.deleteAllCustomers);

module.exports = router;