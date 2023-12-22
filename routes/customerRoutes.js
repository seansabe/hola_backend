const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomer);

module.exports = router;