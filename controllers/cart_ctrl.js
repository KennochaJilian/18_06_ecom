const db = require('../models');

module.exports  = {
    async getOrCreate(req, res) {
        try {
            let cart = await req.requestedUser.getCart({include: [{
                model : db.Product,
                    include : [db.Category, db.Image]
                }]});
            if(!cart){
                cart = await db.Cart.create({UserId: req.requestedUser.id, expirationDate: new Date()})
            }
            cart.dataValues.total = cart.Products.reduce((total, product) => total + product.price, 0);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async count(req, res) {
        try {
            let cart = await req.requestedUser.getCart({include: [{
                    model : db.Product
                }]});
            if(!cart){
                cart = await db.Cart.create({UserId: req.requestedUser.id, expirationDate: new Date()})
            }
            res.status(200).json(cart.Products.length);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addProductToCart(req, res) {
        try {
            const product = await db.Product.findByPk(req.params.product_id);
            const cart = await db.Cart.findByPk(req.params.cart_id);

            if (cart && product) {
                await cart.addProduct(product)
                res.status(200).json(cart);
            } else {
                res.status(404).send('Cart not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async removeProductFromCart(req, res) {
        try {
            const product = await db.Product.findByPk(req.params.product_id);
            const cart = await db.Cart.findByPk(req.params.cart_id);

            if (cart && product) {
                console.log("remove")
                await cart.removeProduct(product)
                res.status(200).json(cart);
            } else {
                res.status(404).send('Cart not found');
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
};
