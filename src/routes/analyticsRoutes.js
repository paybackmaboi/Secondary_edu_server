const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/dashboard-stats', analyticsController.getDashboardStats);
router.get('/student-distribution', analyticsController.getStudentDistribution);
router.get('/grade-performance', analyticsController.getGradePerformance);
router.get('/attendance-trend', analyticsController.getAttendanceTrend);
router.get('/grade-distribution', analyticsController.getGradeDistribution);

module.exports = router;
