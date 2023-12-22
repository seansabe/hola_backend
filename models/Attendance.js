const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Attendance schema
const AttendanceSchema = new Schema({
    customerId: {
        type: String,
        required: true,
        ref: 'Customer'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);