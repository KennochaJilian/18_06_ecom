const {hashSync, compareSync} = require("bcrypt");
module.exports = {
    compare: (passwordToCheck, userPassword) => {
        return compareSync(passwordToCheck, userPassword)
    },
    hashPass: (password) => {
        return hashSync(password, 10)
    }
}