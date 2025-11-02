const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class PaymentMethod extends Sequelize.Model {
        static associate(db) {
            PaymentMethod.belongsTo(db.User, {foreignKey: 'UserId'});
        };
    }

    PaymentMethod.init({
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cardNumber: {
                type: DataTypes.NUMBER(16),
                allowNull: false,
            },
            expirationDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            securityCode: {
                type: DataTypes.NUMBER(3),
                allowNull: false,
            },

            },
        {
            sequelize,
            modelName: 'PaymentMethod'
        });

    return PaymentMethod;

};