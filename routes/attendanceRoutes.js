const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.createAttendance);
router.put('/:id/validate', attendanceController.validateAttendance);

module.exports = router;