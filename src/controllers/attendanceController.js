const { Attendance } = require('../models');

exports.addAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAttendanceByStudent = async (req, res) => {
    try {
        const records = await Attendance.findAll({ where: { studentId: req.params.studentId } });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAttendance = async (req, res) => {
    try {
        const [updated] = await Attendance.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedRecord = await Attendance.findByPk(req.params.id);
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({ error: 'Attendance record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
