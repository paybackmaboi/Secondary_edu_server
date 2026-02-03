const { RemedialClass } = require('../models');

exports.createRemedialClass = async (req, res) => {
    try {
        const remedial = await RemedialClass.create(req.body);
        res.status(201).json(remedial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRemedialsByStudent = async (req, res) => {
    try {
        const records = await RemedialClass.findAll({ where: { studentId: req.params.studentId } });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRemedialClass = async (req, res) => {
    try {
        const [updated] = await RemedialClass.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedRecord = await RemedialClass.findByPk(req.params.id);
            res.status(200).json(updatedRecord);
        } else {
            res.status(404).json({ error: 'Remedial class record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
