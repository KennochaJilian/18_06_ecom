const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const User = sequelize.define('User', {
    // Model attributes are defined here
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
    }
});

const MailingAddress = sequelize.define('MailingAddress', {
  // Model attributes are defined here
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
},
});

User.hasMany(MailingAddress);
MailingAddress.belongsTo(User);

sequelize.sync();

module.exports = { User, MailingAddress };