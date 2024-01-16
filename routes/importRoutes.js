const express = require('express');
const router = express.Router();
const csv = require('fast-csv');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

router.post('/', upload.single('file'), async (req, res) => {
    let customers = [];
    fs.createReadStream(req.file.path)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
            console.error(error);
            res.status(500).json({ error: 'Error parsing CSV file' });
        })
        .on('data', function (data) {
            data['_id'] = new mongoose.Types.ObjectId();
            data['customerId'] = data.customerId;
            data['barcode'] = data.barcode;
            data['firstName'] = data.firstName;
            data['lastName'] = data.lastName;
            data['customerType'] = data.customerType;
            data['published'] = Boolean(data.hasSignedPolicy);
            customers.push(data);
        })
        .on('end', async function () {
            // insert customers into db
            for (const customer of customers) {
                try {
                    await Customer.create(customer);
                } catch (err) {
                    if (err.code === 11000) { // this is the error code for a duplicate key error
                        console.log('Duplicate barcode:', customer.barcode);
                    } else {
                        console.log('Error inserting data into the database:', err);
                    }
                }
            }
            console.log(`${customers.length} customers have been processed.`);
            res.status(200).json({ message: `${customers.length} customers have been processed.` });
        });
});

module.exports = router;