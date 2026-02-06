const { ObservedValue } = require('../models');

exports.addValue = async (req, res) => {
    try {
        const value = await ObservedValue.create(req.body);
        res.status(201).json(value);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getValuesByStudent = async (req, res) => {
    try {
        const values = await ObservedValue.findAll({ where: { studentId: req.params.studentId } });
        res.status(200).json(values);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateValue = async (req, res) => {
    try {
        const [updated] = await ObservedValue.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedValue = await ObservedValue.findByPk(req.params.id);
            res.status(200).json(updatedValue);
        } else {
            res.status(404).json({ error: 'Observed Value not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteValue = async (req, res) => {
    try {
        const deleted = await ObservedValue.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ success: true, message: 'Observed Value deleted successfully' });
        } else {
            res.status(404).json({ error: 'Observed Value not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
