const express = require('express');
const router = express.Router();
const csv = require('fast-csv');
const fs = require('fs');
const Customer = require('../models/Customer');

router.post('/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let customersFile = req.files.file;

    let customers = [];

    csv.parseString(customersFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();

            customers.push(data);
        })
        .on("end", function () {
            Customer.create(customers, (err, documents) => {
                if (err) throw err;
                res.send(documents);
            });
        });
});

module.exports = router;