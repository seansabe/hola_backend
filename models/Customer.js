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
        enum: ['student', 'staff', 'alumni', 'community', 'admin'],
        required: true
    },
    passwrord: {
        type: String,
        default: '0000',
        required: false
    },
    userId: {
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