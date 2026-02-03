const { Student, Grade, Attendance, ObservedValue } = require('../models');

exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReportCard = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: [
                { model: Grade, as: 'grades' },
                { model: Attendance, as: 'attendance' },
                { model: ObservedValue, as: 'observedValues' }
            ]
        });
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
