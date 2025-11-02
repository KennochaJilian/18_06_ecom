const jwt = require('jsonwebtoken');
const PRIVATE_KEY = "private_key";

module.exports = {
    sign: (user) => {
        return jwt.sign(user.toJSON(), PRIVATE_KEY)
    },
}