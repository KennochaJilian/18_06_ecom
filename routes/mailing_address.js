const mailing_address_ctrl = require('../controllers/mailing_address_ctrl');
const user_ctrl = require('../controllers/user_ctrl');
const ownershipMiddleware = require('../middlewares/ownership');
const adminMiddleware = require('../middlewares/admin');
const admin_ctrl = require('../controllers/admin_ctrl');

module.exports = [

    {
        url: '/api/users/:user_id/mailAddress',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), mailing_address_ctrl.get_all]  // User can only access own addresses
    },
    {
        url: '/api/users/:user_id/mailAddress/:mailing_address_id',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), mailing_address_ctrl.get]  // User can only access own address
    },
    {
        url: '/api/users/:user_id/mailAddress',
        method: 'post',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), mailing_address_ctrl.create]  // User can only create own address
    },
    {
        url: '/api/users/:user_id/mailAddress/:mailing_address_id',
        method: 'put',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), mailing_address_ctrl.update]  // User can only update own address
    },
    {
        url: '/api/users/:user_id/mailAddress/:mailing_address_id',
        method: 'delete',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), mailing_address_ctrl.delete]  // User can only delete own address
    },
    {
        url: '/api/admin/mailAddress',
        method: 'get',
        func: [adminMiddleware.isAdmin, admin_ctrl.getAllMailingAddresses]  // Admin only - get all users' addresses
    },

];
