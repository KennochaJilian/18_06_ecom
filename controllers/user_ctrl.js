const db = require('../models');
const hashHelper = require('../helpers/password-helper')
const jwt = require('../helpers/jwt-helper');

module.exports  = {
    async get_all(req, res) {
        try {
            const users = await db.User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async get(req, res) {
        try {
            const user = await db.User.findByPk(req.params.user_id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async create(req, res) {
        try {
            const user = await db.User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async update(req, res) {
        if(!req.user || !req.requestedUser){
            res.status(404).send('User not found');
        }

        if(req.user.id !== req.requestedUser.id){
            res.status(401).send('You should not paaaass');

        }
        try {
            const [updated] = await db.User.update(req.body, {
                where: {
                    id: req.params.user_id
                }
            });
            if (updated) {
                const user = await db.User.findByPk(req.params.user_id);
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            if(!req.user || !req.requestedUser){
                res.status(404).send('User not found');
            }

            if(req.user.id !== req.requestedUser.id){
                res.status(401).send('You should not paaaass');

            }
            const deleted = await db.User.destroy({
                where: {
                    id: req.requestedUser.id
                }
            });
            if (deleted) {
                res.status(200).send(`User ${req.requestedUser.id} successfully deleted`);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async getRoles(req,res){
      const roles =  await req.requestedUser.getRoles();
      res.status(200).json(roles);
    },

    async addRole(req, res){
        try {
            const role = await db.Role.findByPk(req.params.role_id);
            if (role) {
                req.requestedUser.addRole(role);
                res.status(200).json(req.requestedUser);
            } else {
                res.status(404).send('Role not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    signup: async (req, res, next) => {
        try {
            const user = req.body;
            user.password = hashHelper.hashPass(user.password, 10);
            const newUser = await db.User.create(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    signIn: async (req, res, next) => {
        try {
            const user = req.body;
            const dbUser = await db.User.findOne({
                where: {
                    emailAddress: user.emailAddress
                },
                include: [db.Role]
            })
            if(!dbUser){
                return res.status(401).send('User not found');
            }

            if(!hashHelper.compare(user.password, dbUser.password)){
                return res.status(401).json("Wrong password or email");
            }
            const token = jwt.sign(dbUser);
            const response = {
                token,
                user : dbUser
            };
            res.status(200).json(response);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    load_by_id: (req, res, next) => {
        console.log(req.params.user_id)
        db.User.findByPk(req.params.user_id).then(user => {
            req.requestedUser = user;
            next();
        }).catch(next);
    }
};
