const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RemedialClass extends Model {
        static associate(models) {
            RemedialClass.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
        }
    }
    RemedialClass.init({
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subjectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        finalRating: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        remedialClassMark: {
            type: DataTypes.STRING,
            allowNull: true
        },
        recomputedFinalGrade: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        remarks: DataTypes.STRING,
        conductedFrom: DataTypes.DATEONLY,
        conductedTo: DataTypes.DATEONLY,
        school: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RemedialClass',
    });
    return RemedialClass;
};
