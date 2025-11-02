const db = require("../models");

module.exports = {
    // Admin can get all users' mailing addresses
    async getAllMailingAddresses(req, res) {
        try {
            const addresses = await db.MailingAddress.findAll({
                include: [db.User]
            });
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Admin can get all users' phones
    async getAllPhones(req, res) {
        try {
            const phones = await db.Phone.findAll({
                include: [db.User]
            });
            res.status(200).json(phones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Admin can get all users' carts
    async getAllCarts(req, res) {
        try {
            const carts = await db.Cart.findAll({
                include: [
                    {
                        model: db.User
                    },
                    {
                        model: db.Product,
                        include: [db.Category, db.Image]
                    }
                ]
            });
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Admin can get all users' payment methods
    async getAllPaymentMethods(req, res) {
        try {
            const paymentMethods = await db.PaymentMethod.findAll({
                include: [db.User]
            });
            res.status(200).json(paymentMethods);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

