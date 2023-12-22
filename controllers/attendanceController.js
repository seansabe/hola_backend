const Attendance = require('../models/Attendance');

exports.createAttendance = async (req, res) => {
    try {
        const newAttendance = new Attendance(req.body);
        const result = await newAttendance.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};