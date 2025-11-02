const { Sequelize, DataTypes } = require('sequelize');
const PROTECTED_ATTRIBUTES = ['password']

module.exports = sequelize => {

    class User extends Sequelize.Model {
        static associate(db) {
            User.hasMany(db.MailingAddress, {onDelete: 'CASCADE'});
            User.hasMany(db.PaymentMethod, {onDelete: 'CASCADE'});
            User.hasMany(db.Phone, {onDelete: 'CASCADE'});
            User.belongsToMany(db.Role, {through: 'Users_Roles'})
            User.hasOne(db.Cart);
        };
        toJSON () {
            // hide protected fields
            let attributes = Object.assign({}, this.get())
            for (let a of PROTECTED_ATTRIBUTES) {
                delete attributes[a]
            }
            return attributes
        }
    }

    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue('password', value);
            }
        }}
        ,
    {
        sequelize,
        modelName: 'User'
    });

    return User;
};