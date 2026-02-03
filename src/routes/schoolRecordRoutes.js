const express = require('express');
const router = express.Router();
const schoolRecordController = require('../controllers/schoolRecordController');

router.post('/', schoolRecordController.createSchoolRecord);
router.get('/student/:studentId', schoolRecordController.getSchoolRecordsByStudent);
router.put('/:id', schoolRecordController.updateSchoolRecord);

module.exports = router;
