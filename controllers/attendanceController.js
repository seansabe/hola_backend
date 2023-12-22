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

exports.validateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
        attendance.validated = true;
        const result = await attendance.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};