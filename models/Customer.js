const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    customerType: {
        type: String,
        enum: ['student', 'staff', 'alumni', 'community'],
        required: true
    },
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    hasSignedPolicy: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);