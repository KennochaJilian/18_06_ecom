const paymentMethodCtrl = require('../controllers/payment_mode_ctrl');
const user_ctrl = require('../controllers/user_ctrl');
const ownershipMiddleware = require('../middlewares/ownership');
const adminMiddleware = require('../middlewares/admin');
const admin_ctrl = require('../controllers/admin_ctrl');

module.exports = [

    {
        url: '/api/users/:user_id/payment_methods',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), paymentMethodCtrl.get_all]  // User can only access own payment methods
    },
    {
        url: '/api/users/:user_id/payment_methods/:payment_method',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), paymentMethodCtrl.get]  // User can only access own payment method
    },
    {
        url: '/api/users/:user_id/payment_methods',
        method: 'post',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), paymentMethodCtrl.create]  // User can only create own payment method
    },
    {
        url: '/api/users/:user_id/payment_methods/:payment_method',
        method: 'put',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), paymentMethodCtrl.update]  // User can only update own payment method
    },
    {
        url: '/api/users/:user_id/payment_methods/:payment_method',
        method: 'delete',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), paymentMethodCtrl.delete]  // User can only delete own payment method
    },
    {
        url: '/api/admin/payment_methods',
        method: 'get',
        func: [adminMiddleware.isAdmin, admin_ctrl.getAllPaymentMethods]  // Admin only - get all users' payment methods
    },

];
