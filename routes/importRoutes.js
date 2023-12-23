const express = require('express');
const router = express.Router();
const csv = require('fast-csv');
const fs = require('fs');
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let customersFile = req.files.file;

    let customers = [];

    const dataHandler = async (data) => {
        data['_id'] = new mongoose.Types.ObjectId();

        // Check if the customer already exists
        const existingCustomer = await Customer.findOne({ customerId: data['customerId'] });
        if (!existingCustomer) {
            customers.push(data);
        }
    };

    await new Promise((resolve, reject) => {
        csv.parseString(customersFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
            .on("data", dataHandler)
            .on("end", resolve)
            .on("error", reject);
    });

    Customer.create(customers, (err, documents) => {
        if (err) throw err;
        res.send(documents);
    });
});

module.exports = router;