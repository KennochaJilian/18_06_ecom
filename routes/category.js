const category_ctrl = require('../controllers/category_ctrl');
const adminMiddleware = require('../middlewares/admin');

module.exports = [

    {
        url: '/api/categories',
        method: 'get',
        func: category_ctrl.get_all  // Public - anyone can view categories
    },
    {
        url: '/api/categories/:category_id',
        method: 'get',
        func: category_ctrl.get  // Public - anyone can view category
    },
    {
        url: '/api/categories',
        method: 'post',
        func: [adminMiddleware.isAdmin, category_ctrl.create]  // Admin only
    },
    {
        url: '/api/categories/:category_id',
        method: 'put',
        func: [adminMiddleware.isAdmin, category_ctrl.update]  // Admin only
    },
    {
        url: '/api/categories/:category_id',
        method: 'delete',
        func: [adminMiddleware.isAdmin, category_ctrl.delete]  // Admin only
    },
    {
        url: '/api/categories/:category_id/products',
        method: 'get',
        func: category_ctrl.getProducts  // Public - anyone can view products by category
    },

];
