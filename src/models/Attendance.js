const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        static associate(models) {
            Attendance.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
        }
    }
    Attendance.init({
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false
        },
        daysOfSchool: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        daysPresent: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        daysAbsent: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        timesTardy: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Attendance',
    });
    return Attendance;
};
