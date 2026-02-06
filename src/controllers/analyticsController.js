const { Student, Grade, Attendance, Subject, Account } = require('../models');
const { fn, col } = require('sequelize');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student.count();
        const totalAccounts = await Account.count();
        const totalSubjects = await Subject.count();

        // Calculate attendance rate from daysPresent / daysOfSchool
        const attendanceRecords = await Attendance.findAll({
            attributes: [
                [fn('SUM', col('daysOfSchool')), 'totalDays'],
                [fn('SUM', col('daysPresent')), 'totalPresent']
            ],
            raw: true
        });

        const totalDays = parseInt(attendanceRecords[0]?.totalDays) || 0;
        const totalPresent = parseInt(attendanceRecords[0]?.totalPresent) || 0;
        const attendanceRate = totalDays > 0
            ? Math.round((totalPresent / totalDays) * 100)
            : 0;

        // Calculate average grades from finalRating
        const gradeStats = await Grade.findAll({
            attributes: [[fn('AVG', col('finalRating')), 'average']],
            raw: true
        });
        const averageGrades = Math.round(parseFloat(gradeStats[0]?.average)) || 0;

        res.status(200).json({
            totalStudents,
            totalAccounts,
            totalSubjects,
            studentGrowth: 12, // Placeholder - would need historical data
            attendanceRate,
            averageGrades
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get student distribution by grade level
exports.getStudentDistribution = async (req, res) => {
    try {
        const distribution = await Student.findAll({
            attributes: [
                'gradeLevel',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['gradeLevel'],
            order: [['gradeLevel', 'ASC']],
            raw: true
        });

        // Convert count to number
        const result = distribution.map(d => ({
            gradeLevel: d.gradeLevel,
            count: parseInt(d.count) || 0
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Student Distribution Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get grade performance by subject
exports.getGradePerformance = async (req, res) => {
    try {
        // Group by subjectName since that's what the Grade model uses
        const performance = await Grade.findAll({
            attributes: [
                'subjectName',
                [fn('AVG', col('finalRating')), 'average']
            ],
            group: ['subjectName'],
            raw: true
        });

        const result = performance.map(p => ({
            subject: p.subjectName || 'Unknown',
            average: Math.round(parseFloat(p.average)) || 0
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Grade Performance Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get attendance trend by month
exports.getAttendanceTrend = async (req, res) => {
    try {
        // Attendance model uses 'month' (string) field, not date
        const trend = await Attendance.findAll({
            attributes: [
                'month',
                [fn('SUM', col('daysPresent')), 'present'],
                [fn('SUM', col('daysAbsent')), 'absent'],
                [fn('SUM', col('timesTardy')), 'tardy']
            ],
            group: ['month'],
            raw: true
        });

        const result = trend.map(t => ({
            month: t.month,
            present: parseInt(t.present) || 0,
            absent: parseInt(t.absent) || 0,
            tardy: parseInt(t.tardy) || 0
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Attendance Trend Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get grade distribution
exports.getGradeDistribution = async (req, res) => {
    try {
        // Get all finalRating values
        const grades = await Grade.findAll({
            attributes: ['finalRating'],
            where: {
                finalRating: {
                    [require('sequelize').Op.ne]: null
                }
            },
            raw: true
        });

        const distribution = {
            'Outstanding (90-100)': 0,
            'Very Satisfactory (85-89)': 0,
            'Satisfactory (80-84)': 0,
            'Fairly Satisfactory (75-79)': 0,
            'Did Not Meet (Below 75)': 0
        };

        grades.forEach(g => {
            const grade = parseFloat(g.finalRating);
            if (isNaN(grade)) return;

            if (grade >= 90) distribution['Outstanding (90-100)']++;
            else if (grade >= 85) distribution['Very Satisfactory (85-89)']++;
            else if (grade >= 80) distribution['Satisfactory (80-84)']++;
            else if (grade >= 75) distribution['Fairly Satisfactory (75-79)']++;
            else distribution['Did Not Meet (Below 75)']++;
        });

        const result = Object.entries(distribution).map(([grade, count]) => ({
            grade,
            count
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Grade Distribution Error:', error);
        res.status(500).json({ error: error.message });
    }
};
