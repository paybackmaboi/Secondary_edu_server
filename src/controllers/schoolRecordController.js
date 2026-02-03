const { SchoolRecord } = require('../models');

exports.createSchoolRecord = async (req, res) => {
    try {
        const record = await SchoolRecord.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSchoolRecordsByStudent = async (req, res) => {
    try {
        const records = await SchoolRecord.findAll({
            where: { studentId: req.params.studentId },
            order: [['gradeLevel', 'ASC']]
        });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSchoolRecord = async (req, res) => {
    try {
        const [updated] = await SchoolRecord.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedRecord = await SchoolRecord.findByPk(req.params.id);
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({ error: 'School record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
