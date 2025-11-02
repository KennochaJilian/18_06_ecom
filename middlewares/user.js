const db = require("../models");

module.exports = {
    load_user: (req,res, next) => {
        if(!req.auth){
            next();
        }else {
            console.log('je suis ici')
            db.User.findByPk(req.auth.id).then(user => {
                req.user = user;
                next();
            }).catch(next);
        }
    }
}