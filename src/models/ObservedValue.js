const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ObservedValue extends Model {
        static associate(models) {
            ObservedValue.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
        }
    }
    ObservedValue.init({
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coreValue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        behaviorStatement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        q1: DataTypes.STRING, // Values like AO, SO, RO, NO
        q2: DataTypes.STRING,
        q3: DataTypes.STRING,
        q4: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ObservedValue',
    });
    return ObservedValue;
};
