const { expressjwt: jwt } = require("express-jwt");

// JWT authentication middleware
// Excludes signup, signin, and public product/category viewing routes from authentication
const authenticate = jwt({ 
    secret: 'private_key', 
    algorithms: ["HS256"],
    requestProperty: 'auth'
}).unless({ 
    path: [
        /^\/api\/users\/signin/, 
        /^\/api\/users\/signup/,
        /^\/api\/products$/,                    // GET /api/products
        /^\/api\/products\/\d+$/,              // GET /api/products/:product_id
        /^\/api\/categories$/,                  // GET /api/categories
        /^\/api\/categories\/\d+$/,             // GET /api/categories/:category_id
        /^\/api\/categories\/\d+\/products$/,   // GET /api/categories/:category_id/products
        /^\/api-docs/,
        /^\/$/
    ] 
});

module.exports = {
    authenticate
};

