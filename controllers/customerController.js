const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const result = await newCustomer.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};