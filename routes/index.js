const fs = require('fs');

module.exports = app => {

    // read the files of the current directory
    fs.readdirSync(__dirname)
        .filter(filename => filename !== 'index.js') // avoid this file
        .forEach(filename => {
            // load routes array and register them
            require('./' + filename).forEach(r => {
                app[r.method](r.url, r.func);
            });
        });

};