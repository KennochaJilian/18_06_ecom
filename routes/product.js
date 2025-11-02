const product_ctrl = require('../controllers/product_ctrl');
const adminMiddleware = require('../middlewares/admin');

module.exports = [

    {
        url: '/api/products',
        method: 'get',
        func: product_ctrl.get_all  // Public - anyone can view products
    },
    {
        url: '/api/products/:product_id',
        method: 'get',
        func: product_ctrl.get  // Public - anyone can view product
    },
    {
        url: '/api/products',
        method: 'post',
        func: [adminMiddleware.isAdmin, product_ctrl.create]  // Admin only
    },
    {
        url: '/api/products/:product_id',
        method: 'put',
        func: [adminMiddleware.isAdmin, product_ctrl.update]  // Admin only
    },
    {
        url: '/api/products/:product_id',
        method: 'delete',
        func: [adminMiddleware.isAdmin, product_ctrl.delete]  // Admin only
    },

];
