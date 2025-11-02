const db = require('../models');

module.exports  = {
    async get_all(req, res) {
        try {
            const roles = await db.Role.findAll();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async get(req, res) {
        try {
            const role = await db.Role.findByPk(req.params.role_id);
            if (role) {
                res.status(200).json(role);
            } else {
                res.status(404).send('Role not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async create(req, res) {
        try {
            const role = await db.Role.create(req.body);
            res.status(201).json(role);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            const [updated] = await db.Role.update(req.body, {
                where: {
                    id: req.params.role_id
                }
            });
            if (updated) {
                const role = await db.Role.findByPk(req.params.role_id);
                res.status(200).json(role);
            } else {
                res.status(404).send('Role not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            const deleted = await db.Role.destroy({
                where: {
                    id: req.params.role_id
                }
            });
            if (deleted) {
                res.status(200).send(`Rol ${req.params.role_id} successfully deleted`);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async getUsers(req,res){
        try {
            const role = await db.Role.findByPk(req.params.role_id);
            if (role) {

                const users = await role.getUsers();
                res.status(200).json(users);
            } else {
                res.status(404).send('role not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }

    }
};
