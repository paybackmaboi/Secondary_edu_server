const { Subject } = require('../models');

exports.createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const [updated] = await Subject.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedSubject = await Subject.findByPk(req.params.id);
            res.status(200).json(updatedSubject);
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        const deleted = await Subject.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ message: 'Subject deleted' });
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
