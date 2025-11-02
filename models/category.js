const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Category extends Sequelize.Model {
        static associate(db) {
            Category.hasMany(db.Product)
        };
    }

    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }},
        {
        sequelize,
        modelName: 'Category'
    });

    return Category;

};