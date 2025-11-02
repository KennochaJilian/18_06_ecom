const user_ctrl = require('../controllers/user_ctrl');
const adminMiddleware = require('../middlewares/admin');
const ownershipMiddleware = require('../middlewares/ownership');

module.exports = [

    {
        url: '/api/users',
        method: 'get',
        func: [adminMiddleware.isAdmin, user_ctrl.get_all]  // Admin only
    },
    {
        url: '/api/users/:user_id',
        method: 'get',
        func: user_ctrl.get  // Authenticated users can view any user
    },
    {
        url: '/api/users',
        method: 'post',
        func: user_ctrl.create  // Public - for admin user creation
    },
    {
        url: '/api/users/signup',
        method: 'post',
        func: user_ctrl.signup  // Public - no auth required
    },
    {
        url: '/api/users/signin',
        method: 'post',
        func: user_ctrl.signIn  // Public - no auth required
    },
    {
        url: '/api/users/:user_id',
        method: 'put',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), user_ctrl.update]  // User can only update own profile
    },
    {
        url: '/api/users/:user_id',
        method: 'delete',
        func: [user_ctrl.load_by_id, adminMiddleware.isAdmin, user_ctrl.delete]  // Admin only
    },
    {
        url: '/api/users/:user_id/roles',
        method: 'get',
        func: [user_ctrl.load_by_id, ownershipMiddleware.checkOwnership(), user_ctrl.getRoles]  // User can only see own roles, admin can see all
    },
    {
        url: '/api/users/:user_id/roles/:role_id',
        method: 'post',
        func: [user_ctrl.load_by_id, adminMiddleware.isAdmin, user_ctrl.addRole]  // Admin only
    }


];
