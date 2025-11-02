const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Image extends Sequelize.Model {
        static associate(db) {
            Image.belongsTo(db.Product, {foreignKey: 'ProductId'});
        };
    }

    Image.init({
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        }},
        {
        sequelize,
        modelName: 'Image'
    });

    return Image;

};