const user_ctrl = require("../controllers/user_ctrl");
const cart_ctrl = require("../controllers/cart_ctrl");
const ownershipMiddleware = require("../middlewares/ownership");
const adminMiddleware = require("../middlewares/admin");
const admin_ctrl = require("../controllers/admin_ctrl");

module.exports = [

    {
        url: '/api/carts/user/:user_id',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), cart_ctrl.getOrCreate]  // User can only access own cart
    },
    {
        url: '/api/carts/user/:user_id/count',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), cart_ctrl.count]  // User can only access own cart count
    },
    {
        url: '/api/carts/:cart_id/products/:product_id',
        method: 'post',
        func: [ownershipMiddleware.checkCartOwnership, cart_ctrl.addProductToCart]  // User can only add to own cart
    },
    {
        url: '/api/carts/:cart_id/products/:product_id',
        method: 'delete',
        func: [ownershipMiddleware.checkCartOwnership, cart_ctrl.removeProductFromCart]  // User can only remove from own cart
    },
    {
        url: '/api/admin/carts',
        method: 'get',
        func: [adminMiddleware.isAdmin, admin_ctrl.getAllCarts]  // Admin only - get all users' carts
    },
];
