const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Customer schema
const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    userType: {
        type: String,
        enum: ['student', 'staff', 'alumni', 'community'],
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);