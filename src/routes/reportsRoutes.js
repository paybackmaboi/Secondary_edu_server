const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.get('/class-summary', reportsController.getClassSummary);
router.get('/grade-analytics', reportsController.getGradeAnalytics);
router.get('/attendance-summary', reportsController.getAttendanceSummary);

module.exports = router;
