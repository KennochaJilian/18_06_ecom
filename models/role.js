const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

    class Role extends Sequelize.Model {
        static associate(db) {
            Role.belongsToMany(db.User, {through: 'Users_Roles'})
        };
    }

    Role.init({
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }},
        {
        sequelize,
        modelName: 'Role'
    });

    return Role;

};