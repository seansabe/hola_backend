const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Attendance schema
const AttendanceSchema = new Schema({
    customer: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);