const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Cart extends Sequelize.Model {
        static associate(db) {
            Cart.belongsToMany(db.Product, {through: 'Product_Cart'});
            Cart.belongsTo(db.User)
        };
    }

    Cart.init({
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }},
        {
        sequelize,
        modelName: 'Cart'
    });

    return Cart;

};