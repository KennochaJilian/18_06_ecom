const db = require('../models');

module.exports = {
    get_all(req, res) {
        try {
            let whereClause = {
                userId: req.requestedUser.id
            };
            if (req.query.label) {
                whereClause.label = req.query.label;
            }
            db.Phone.findAll({
                where: whereClause
            }).then(x => {
                if(x.length === 0){
                    res.status(404).send('No phone found');
                }else{
                    res.status(200).json(x);
                }
            })
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async get(req, res) {
            if(!req.requestedUser){
                res.status(404).send('User not found');
            }
            const addresses = await req.requestedUser.getPhones();
            res.status(200).send(addresses)

    },

    async create(req, res) {
        try {
            if(!req.user){
                res.status(404).json('User not found');
            }
            const phone = await db.Phone.create(req.body)
            await req.requestedUser.addPhones(phone);

            res.status(201).json(phone);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            const [updated] = await db.Phone.update(req.body, {
                where: {
                    UserId: req.requestedUser.id,
                    id: req.params.phone_id,
                }
            });
            if (updated) {
                const phone = await db.Phone.findByPk(req.requestedUser.id);
                res.status(200).json(phone);
            } else {
                res.status(404).send('Phone not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            const deleted = await db.Phone.destroy({
                where: {
                    UserId: req.requestedUser.id,
                    id: req.params.phone_id,
                }
            });
            if (deleted) {
                res.status(200).send(`Phone ${req.params.phone_id} successfully deleted`);
            } else {
                res.status(404).send('Phone not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
