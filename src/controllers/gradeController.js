const { Grade } = require('../models');

exports.addGrade = async (req, res) => {
    try {
        const grade = await Grade.create(req.body);
        res.status(201).json(grade);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getGradesByStudent = async (req, res) => {
    try {
        const grades = await Grade.findAll({ where: { studentId: req.params.studentId } });
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGrade = async (req, res) => {
    try {
        const [updated] = await Grade.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedGrade = await Grade.findByPk(req.params.id);
            res.status(200).json(updatedGrade);
        } else {
            res.status(404).json({ error: 'Grade not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGrade = async (req, res) => {
    try {
        const deleted = await Grade.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ success: true, message: 'Grade deleted successfully' });
        } else {
            res.status(404).json({ error: 'Grade not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
