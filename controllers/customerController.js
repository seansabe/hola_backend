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

exports.updateCustomerPolicy = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findOneAndUpdate(
            { id: req.params.id },
            { hasSignedPolicy: true },
            { new: true, upsert: true }
        );

        if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findOneAndDelete({ id: req.params.id });

        if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Bulk delete customers
exports.bulkDeleteCustomers = async (req, res) => {
    try {
        const idsToDelete = req.body.ids;
        const deletedCustomers = await Customer.deleteMany({ id: { $in: idsToDelete } });

        res.status(200).json({ message: `${deletedCustomers.deletedCount} customers deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all customers
exports.deleteAllCustomers = async (req, res) => {
    try {
        const deletedCustomers = await Customer.deleteMany({});

        res.status(200).json({ message: `${deletedCustomers.deletedCount} customers deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};