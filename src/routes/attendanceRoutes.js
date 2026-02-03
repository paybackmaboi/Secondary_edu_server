const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.addAttendance);
router.get('/student/:studentId', attendanceController.getAttendanceByStudent);
router.put('/:id', attendanceController.updateAttendance);

module.exports = router;
