const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SchoolRecord extends Model {
        static associate(models) {
            SchoolRecord.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
        }
    }
    SchoolRecord.init({
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gradeLevel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        schoolName: DataTypes.STRING,
        schoolId: DataTypes.STRING,
        district: DataTypes.STRING,
        division: DataTypes.STRING,
        region: DataTypes.STRING,
        schoolYear: DataTypes.STRING,
        adviser: DataTypes.STRING,
        generalAverage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        actionTaken: {
            type: DataTypes.STRING,  // Promoted, Retained, etc.
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'SchoolRecord',
    });
    return SchoolRecord;
};
