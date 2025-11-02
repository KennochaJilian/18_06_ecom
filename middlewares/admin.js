const db = require("../models");

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Get user roles
        const userWithRoles = await db.User.findByPk(req.user.id, {
            include: [db.Role]
        });

        // Check if user has admin role
        const hasAdminRole = userWithRoles.Roles.some(role => 
            role.name.toLowerCase() === 'admin'
        );

        if (!hasAdminRole) {
            return res.status(403).json({ error: 'Admin access required' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Error checking admin status' });
    }
};

module.exports = {
    isAdmin
};

