const
    fs = require('fs'),
    { Sequelize } = require('sequelize');

// create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

const db = {};

// read the files of the current directory
fs.readdirSync(__dirname)
    .filter(filename => filename !== 'index.js')
    .forEach(filename => {
        const model = require('./' + filename)(sequelize);
        db[model.name] = model;
    });

// go through each entry of the db object
Object.keys(db).forEach(modelName => {
    db[modelName].associate(db);
});

// sync the DB
sequelize.sync();

// expose the db object and sequelize instance
db.sequelize = sequelize;
module.exports = db;