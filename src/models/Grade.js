const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Grade extends Model {
        static associate(models) {
            Grade.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
        }
    }
    Grade.init({
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subjectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        q1: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        q2: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        q3: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        q4: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        finalRating: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        remarks: DataTypes.STRING,
        semester: {
            type: DataTypes.ENUM('1', '2', 'N/A'),
            defaultValue: 'N/A'  // N/A for non-SHS
        },
        subjectType: {
            type: DataTypes.ENUM('core', 'applied', 'specialized', 'standard'),
            defaultValue: 'standard'  // standard for K-10
        },
        semFinalGrade: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true  // Only for SHS
        }
    }, {
        sequelize,
        modelName: 'Grade',
    });
    return Grade;
};
