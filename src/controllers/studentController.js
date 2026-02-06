const { Student, Grade, Attendance, ObservedValue, Account } = require('../models');

// Helper to get current user from request header
const getCurrentUser = async (req) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return null;
    return await Account.findByPk(userId);
};

exports.createStudent = async (req, res) => {
    try {
        const currentUser = await getCurrentUser(req);
        if (currentUser && currentUser.role === 'user') {
            return res.status(403).json({ error: 'Unauthorized: Students cannot create records' });
        }

        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const currentUser = await getCurrentUser(req);
        let whereClause = {};

        // If user is a student, only return their own record (matched by LRN = username)
        if (currentUser && currentUser.role === 'user') {
            whereClause = { lrn: currentUser.username };
        }

        const students = await Student.findAll({ where: whereClause });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const currentUser = await getCurrentUser(req);
        const student = await Student.findByPk(req.params.id);

        if (!student) return res.status(404).json({ error: 'Student not found' });

        // If user is a student, verify they are viewing their own record
        if (currentUser && currentUser.role === 'user') {
            if (student.lrn !== currentUser.username) {
                return res.status(403).json({ error: 'Unauthorized: You can only view your own profile' });
            }
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReportCard = async (req, res) => {
    try {
        const currentUser = await getCurrentUser(req);

        const student = await Student.findByPk(req.params.id, {
            include: [
                { model: Grade, as: 'grades' },
                { model: Attendance, as: 'attendance' },
                { model: ObservedValue, as: 'observedValues' }
            ]
        });
        if (!student) return res.status(404).json({ error: 'Student not found' });

        // If user is a student, verify they are viewing their own report card
        if (currentUser && currentUser.role === 'user') {
            if (student.lrn !== currentUser.username) {
                return res.status(403).json({ error: 'Unauthorized: You can only view your own report card' });
            }
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const currentUser = await getCurrentUser(req);
        if (currentUser && currentUser.role === 'user') {
            return res.status(403).json({ error: 'Unauthorized: Students cannot update records' });
        }

        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.update(req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const currentUser = await getCurrentUser(req);
        if (currentUser && currentUser.role === 'user') {
            return res.status(403).json({ error: 'Unauthorized: Students cannot delete records' });
        }

        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Delete associated records first (cascade delete)
        await Grade.destroy({ where: { studentId: req.params.id } });
        await Attendance.destroy({ where: { studentId: req.params.id } });
        await ObservedValue.destroy({ where: { studentId: req.params.id } });

        // Delete the student
        await student.destroy();
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
