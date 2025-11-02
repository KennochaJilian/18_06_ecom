const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class MailingAddress extends Sequelize.Model {
        static associate(db) {
            MailingAddress.belongsTo(db.User, {foreignKey: 'UserId'});
        };
    }

    MailingAddress.init({
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['home', 'work']]
            }
        }},
        {
        sequelize,
        modelName: 'MailingAddress'
    });

    return MailingAddress;

};