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
    },
    hasSignedPolicy: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);