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

            db.MailingAddress.findAll({
                where: whereClause
            }).then(x => {
                if(x.length === 0){
                    res.status(404).send('No mailling address found');
                }else{
                    res.status(200).json(x);
                }
            })
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async get(req, res) {
            if(!req.user){
                res.status(404).send('User not found');
            }
            const addresses = await req.requestedUser.getMailingAddresses({
                where : {id: req.params.mailing_address_id}
            });
            res.status(200).send(addresses)

    },

    async create(req, res) {
        try {
            if(!req.requestedUser){
                res.status(404).json('User not found');
            }
            const addr = await db.MailingAddress.create(req.body)
            await req.requestedUser.addMailingAddresses(addr);

            res.status(201).json(addr);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            const [updated] = await db.MailingAddress.update(req.body, {
                where: {
                    UserId: req.requestedUser.id,
                    id: req.params.mailing_address_id,
                }
            });
            if (updated) {
                const addr = await db.MailingAddress.findByPk(req.requestedUser.id);
                res.status(200).json(addr);
            } else {
                res.status(404).send('Address not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            const deleted = await db.MailingAddress.destroy({
                where: {
                    UserId: req.requestedUser.id,
                    id: req.params.mailing_address_id,
                }
            });
            if (deleted) {
                res.status(200).send(`Adress ${req.requestedUser.id} successfully deleted`);
            } else {
                res.status(404).send('Address not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
};
