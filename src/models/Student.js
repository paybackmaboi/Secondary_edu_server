const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.hasMany(models.Grade, { foreignKey: 'studentId', as: 'grades' });
            Student.hasMany(models.Attendance, { foreignKey: 'studentId', as: 'attendance' });
            Student.hasMany(models.ObservedValue, { foreignKey: 'studentId', as: 'observedValues' });
            Student.hasMany(models.RemedialClass, { foreignKey: 'studentId', as: 'remedialClasses' });
            Student.hasMany(models.SchoolRecord, { foreignKey: 'studentId', as: 'schoolRecords' });
        }
    }   
    Student.init({
        lrn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        middleName: DataTypes.STRING,
        birthdate: DataTypes.DATEONLY,
        sex: DataTypes.STRING,
        age: DataTypes.INTEGER,
        gradeLevel: DataTypes.INTEGER,
        section: DataTypes.STRING,
        schoolYear: DataTypes.STRING,
        track: {
            type: DataTypes.STRING,
            defaultValue: 'N/A'
        },
        educationLevel: {
            type: DataTypes.ENUM('kindergarten', 'elementary', 'junior_high', 'senior_high'),
            defaultValue: 'elementary'
        },
        strand: {
            type: DataTypes.STRING,
            allowNull: true  // Only used for Senior High (HUMSS, STEM, ABM, etc.)
        }
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};
