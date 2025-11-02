const phone_ctrl = require('../controllers/phone_ctrl');
const user_ctrl = require('../controllers/user_ctrl');
const ownershipMiddleware = require('../middlewares/ownership');
const adminMiddleware = require('../middlewares/admin');
const admin_ctrl = require('../controllers/admin_ctrl');

module.exports = [

    {
        url: '/api/users/:user_id/phones',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), phone_ctrl.get_all]  // User can only access own phones
    },
    {
        url: '/api/users/:user_id/phones/:phone_id',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), phone_ctrl.get]  // User can only access own phone
    },
    {
        url: '/api/users/:user_id/phones',
        method: 'post',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), phone_ctrl.create]  // User can only create own phone
    },
    {
        url: '/api/users/:user_id/phones/:phone_id',
        method: 'put',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), phone_ctrl.update]  // User can only update own phone
    },
    {
        url: '/api/users/:user_id/phones/:phone_id',
        method: 'delete',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), phone_ctrl.delete]  // User can only delete own phone
    },
    {
        url: '/api/admin/phones',
        method: 'get',
        func: [adminMiddleware.isAdmin, admin_ctrl.getAllPhones]  // Admin only - get all users' phones
    },
];
