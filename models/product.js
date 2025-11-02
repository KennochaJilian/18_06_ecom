const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Product extends Sequelize.Model {
        static associate(db) {
            Product.hasMany(db.Image, {onDelete: 'CASCADE'});
            Product.belongsTo(db.Category, {foreignKey: 'CategoryId'});
            Product.belongsToMany(db.Cart, {through: 'Product_Cart'})
        };
    }
    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.NUMBER,
            allowNull: false
        }},
        {
        sequelize,
        modelName: 'Product'
    });

    return Product;

};