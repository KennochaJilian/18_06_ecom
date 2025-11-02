const db = require("../models");

// Helper function to check if user is admin
const isUserAdmin = async (userId) => {
    try {
        const userWithRoles = await db.User.findByPk(userId, {
            include: [db.Role]
        });
        if (!userWithRoles) return false;
        return userWithRoles.Roles.some(role => 
            role.name.toLowerCase() === 'admin'
        );
    } catch (error) {
        return false;
    }
};

// Middleware to check if user owns the resource
const checkOwnership = (userIdParam = 'user_id') => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Authentication required' });
            }

            // Admin can access any user's resources
            const userIsAdmin = await isUserAdmin(req.user.id);
            if (userIsAdmin) {
                return next();
            }

            const requestedUserId = parseInt(req.params[userIdParam]);
            const currentUserId = req.user.id;
            
            if (currentUserId !== requestedUserId) {
                return res.status(403).json({ error: 'You can only access your own resources' });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Error checking ownership' });
        }
    };
};

// Middleware to check cart ownership
const checkCartOwnership = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Admin can access any cart
        const userIsAdmin = await isUserAdmin(req.user.id);
        
        const cart = await db.Cart.findByPk(req.params.cart_id);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        if (!userIsAdmin && cart.UserId !== req.user.id) {
            return res.status(403).json({ error: 'You can only access your own cart' });
        }

        req.cart = cart;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error checking cart ownership' });
    }
};

module.exports = {
    checkOwnership,
    checkCartOwnership
};

