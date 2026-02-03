const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        static associate(models) {
            // associations can be defined here
        }
    }
    Subject.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Subject',
    });
    return Subject;
};
