const { Student, Grade, Attendance } = require('../models');
const { fn, col } = require('sequelize');

// Get class summary report
exports.getClassSummary = async (req, res) => {
    try {
        const { gradeLevel, section } = req.query;

        let whereClause = {};
        if (gradeLevel) whereClause.gradeLevel = gradeLevel;
        if (section) whereClause.section = section;

        const students = await Student.findAll({
            where: whereClause,
            include: [
                { model: Grade, as: 'grades' },
                { model: Attendance, as: 'attendance' }
            ]
        });

        const className = gradeLevel && section
            ? `Grade ${gradeLevel} - Section ${section}`
            : 'All Students';

        // Calculate per-student statistics
        const studentStats = students.map(student => {
            const grades = student.grades || [];
            const attendance = student.attendance || [];

            // Calculate average from finalRating
            const validGrades = grades.filter(g => g.finalRating != null);
            const avgGrade = validGrades.length > 0
                ? validGrades.reduce((sum, g) => sum + parseFloat(g.finalRating), 0) / validGrades.length
                : 0;

            // Calculate attendance from daysPresent / daysOfSchool
            const totalDays = attendance.reduce((sum, a) => sum + (a.daysOfSchool || 0), 0);
            const presentDays = attendance.reduce((sum, a) => sum + (a.daysPresent || 0), 0);
            const attendanceRate = totalDays > 0
                ? Math.round((presentDays / totalDays) * 100)
                : 0;

            return {
                id: student.id,
                name: `${student.firstName} ${student.lastName}`,
                averageGrade: Math.round(avgGrade),
                attendanceRate
            };
        });

        // Calculate overall statistics
        const totalStudents = studentStats.length;
        const overallAverage = totalStudents > 0
            ? Math.round(studentStats.reduce((sum, s) => sum + s.averageGrade, 0) / totalStudents)
            : 0;
        const overallAttendance = totalStudents > 0
            ? Math.round(studentStats.reduce((sum, s) => sum + s.attendanceRate, 0) / totalStudents)
            : 0;

        // Top performers (top 5 by average grade)
        const topPerformers = [...studentStats]
            .sort((a, b) => b.averageGrade - a.averageGrade)
            .slice(0, 5);

        // Struggling students (below 75% average)
        const strugglingStudents = studentStats.filter(s => s.averageGrade < 75 && s.averageGrade > 0);

        res.status(200).json({
            className,
            totalStudents,
            averageGrade: overallAverage,
            attendanceRate: overallAttendance,
            topPerformers,
            strugglingStudents,
            students: studentStats
        });
    } catch (error) {
        console.error('Class Summary Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get grade analytics report
exports.getGradeAnalytics = async (req, res) => {
    try {
        const { gradeLevel } = req.query;

        // Build student filter
        let studentWhereClause = {};
        if (gradeLevel) studentWhereClause.gradeLevel = parseInt(gradeLevel);

        // Get grades with student info (using subjectName since there's no Subject relation)
        const grades = await Grade.findAll({
            include: [
                {
                    model: Student,
                    as: 'student',
                    where: Object.keys(studentWhereClause).length > 0 ? studentWhereClause : undefined,
                    attributes: ['id', 'gradeLevel']
                }
            ]
        });

        // Group by subjectName
        const subjectMap = {};
        grades.forEach(g => {
            const subjectName = g.subjectName || 'Unknown';
            if (!subjectMap[subjectName]) {
                subjectMap[subjectName] = [];
            }
            // Use finalRating
            if (g.finalRating != null) {
                subjectMap[subjectName].push(parseFloat(g.finalRating));
            }
        });

        // Calculate subject statistics
        const subjects = Object.entries(subjectMap).map(([name, gradeList]) => {
            if (gradeList.length === 0) {
                return { name, average: 0, highest: 0, lowest: 0, passRate: 0 };
            }
            const average = gradeList.reduce((sum, g) => sum + g, 0) / gradeList.length;
            const highest = Math.max(...gradeList);
            const lowest = Math.min(...gradeList);
            const passRate = (gradeList.filter(g => g >= 75).length / gradeList.length) * 100;

            return {
                name,
                average: Math.round(average),
                highest: Math.round(highest),
                lowest: Math.round(lowest),
                passRate: Math.round(passRate)
            };
        });

        // Overall statistics
        const allGrades = Object.values(subjectMap).flat();
        const overallAverage = allGrades.length > 0
            ? Math.round(allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length)
            : 0;
        const passingRate = allGrades.length > 0
            ? Math.round((allGrades.filter(g => g >= 75).length / allGrades.length) * 100)
            : 0;

        res.status(200).json({
            subjects,
            overallAverage,
            passingRate,
            failureRate: 100 - passingRate,
            totalGradesRecorded: allGrades.length
        });
    } catch (error) {
        console.error('Grade Analytics Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get attendance summary report
exports.getAttendanceSummary = async (req, res) => {
    try {
        // Attendance model uses month (string), daysOfSchool, daysPresent, daysAbsent, timesTardy
        const attendance = await Attendance.findAll({
            include: [{
                model: Student,
                as: 'student',
                attributes: ['id', 'firstName', 'lastName']
            }]
        });

        // Calculate totals
        let totalDays = 0;
        let totalPresent = 0;
        let totalAbsent = 0;
        let totalTardy = 0;

        // Group by month
        const monthlyGroup = {};

        attendance.forEach(a => {
            const month = a.month || 'Unknown';
            totalDays += a.daysOfSchool || 0;
            totalPresent += a.daysPresent || 0;
            totalAbsent += a.daysAbsent || 0;
            totalTardy += a.timesTardy || 0;

            if (!monthlyGroup[month]) {
                monthlyGroup[month] = { daysOfSchool: 0, present: 0, absent: 0, tardy: 0 };
            }
            monthlyGroup[month].daysOfSchool += a.daysOfSchool || 0;
            monthlyGroup[month].present += a.daysPresent || 0;
            monthlyGroup[month].absent += a.daysAbsent || 0;
            monthlyGroup[month].tardy += a.timesTardy || 0;
        });

        const monthlyBreakdown = Object.entries(monthlyGroup).map(([month, data]) => ({
            month,
            ...data,
            presentRate: data.daysOfSchool > 0 ? Math.round((data.present / data.daysOfSchool) * 100) : 0
        }));

        // Find students with perfect attendance (no absences)
        const studentAttendance = {};
        attendance.forEach(a => {
            const studentId = a.studentId;
            if (!studentAttendance[studentId]) {
                studentAttendance[studentId] = {
                    student: a.student,
                    totalAbsent: 0
                };
            }
            studentAttendance[studentId].totalAbsent += a.daysAbsent || 0;
        });

        const perfectAttendanceStudents = Object.values(studentAttendance)
            .filter(s => s.totalAbsent === 0 && s.student)
            .map(s => ({
                id: s.student.id,
                name: `${s.student.firstName} ${s.student.lastName}`
            }));

        res.status(200).json({
            schoolYear: 'All Time',
            totalDays,
            presentRate: totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0,
            absentRate: totalDays > 0 ? Math.round((totalAbsent / totalDays) * 100) : 0,
            tardyRate: totalDays > 0 ? Math.round((totalTardy / totalDays) * 100) : 0,
            monthlyBreakdown,
            perfectAttendanceStudents
        });
    } catch (error) {
        console.error('Attendance Summary Error:', error);
        res.status(500).json({ error: error.message });
    }
};
