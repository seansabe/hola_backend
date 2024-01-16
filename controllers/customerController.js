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

exports.getCustomerByIdOrBarcode = async (req, res) => {
    try {
        const { code } = req.params;
        const customer = await Customer.findOne({
            $or: [
                { customerId: code },
                { barcode: code }
            ]
        });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all customers with pagination that contain a search query in their name, last name or customerId
exports.getCustomers = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const query = {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { customerId: { $regex: search, $options: 'i' } },
                { barcode: { $regex: search, $options: 'i' } }
            ]
        };
        const customers = await Customer.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Customer.countDocuments(query);

        res.status(200).json({
            customers,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCustomerPolicy = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findOneAndUpdate(
            { customerId: req.params.customerId },
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
            { customerId: req.params.customerId },
            { $set: req.body },
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
        const deletedCustomer = await Customer.findOneAndDelete({ customerId: req.params.customerId });

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
        const deletedCustomers = await Customer.deleteMany({ customerId: { $in: idsToDelete } });

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