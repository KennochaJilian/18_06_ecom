const role_ctrl = require('../controllers/role_ctrl');
const adminMiddleware = require('../middlewares/admin');

module.exports = [

    {
        url: '/api/roles',
        method: 'get',
        func: role_ctrl.get_all  // Authenticated users can view roles
    },
    {
        url: '/api/roles/:role_id',
        method: 'get',
        func: role_ctrl.get  // Authenticated users can view role
    },
    {
        url: '/api/roles',
        method: 'post',
        func: [adminMiddleware.isAdmin, role_ctrl.create]  // Admin only
    },
    {
        url: '/api/roles/:role_id',
        method: 'put',
        func: [adminMiddleware.isAdmin, role_ctrl.update]  // Admin only
    },
    {
        url: '/api/roles/:role_id',
        method: 'delete',
        func: [adminMiddleware.isAdmin, role_ctrl.delete]  // Admin only
    },
    {
        url: '/api/roles/:role_id/users',
        method: 'get',
        func: [adminMiddleware.isAdmin, role_ctrl.getUsers]  // Admin only - see all users with role
    },

];
