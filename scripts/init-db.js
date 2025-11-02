const db = require('../models/index');
const hashHelper = require('../helpers/password-helper');

async function initDatabase() {
    try {
        console.log('Starting database initialization...');

        // Sync database (create tables if they don't exist)
        await db.sequelize.sync({ force: false }); // Set to true to drop all tables and recreate
        console.log('Database synced');

        // Check if admin role already exists
        let adminRole = await db.Role.findOne({ where: { name: 'admin' } });
        if (!adminRole) {
            adminRole = await db.Role.create({ name: 'admin' });
            console.log('Admin role created');
        } else {
            console.log('Admin role already exists');
        }

        // Check if admin user already exists
        let adminUser = await db.User.findOne({ 
            where: { emailAddress: 'admin@example.com' } 
        });
        
        if (!adminUser) {
            adminUser = await db.User.create({
                firstName: 'Admin',
                lastName: 'User',
                emailAddress: 'admin@example.com',
                password: hashHelper.hashPass('admin123')
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        // Assign admin role to admin user
        await adminUser.addRole(adminRole);
        console.log('Admin role assigned to admin user');

        // Create categories
        const categories = [
            { name: 'Electronics' },
            { name: 'Clothing' },
            { name: 'Books' },
            { name: 'Home & Garden' },
            { name: 'Sports & Outdoors' }
        ];

        const createdCategories = [];
        for (const categoryData of categories) {
            let category = await db.Category.findOne({ where: { name: categoryData.name } });
            if (!category) {
                category = await db.Category.create(categoryData);
                console.log(`Category created: ${category.name}`);
            } else {
                console.log(`Category already exists: ${category.name}`);
            }
            createdCategories.push(category);
        }

        // Create products
        const products = [
            {
                name: 'Laptop Pro 15"',
                description: 'High-performance laptop with 16GB RAM and 512GB SSD. Perfect for professionals and developers.',
                price: 1299.99,
                stock: 50,
                CategoryId: createdCategories[0].id, // Electronics
                images: [
                    { link: 'https://example.com/images/laptop-1.jpg' },
                    { link: 'https://example.com/images/laptop-2.jpg' }
                ]
            },
            {
                name: 'Wireless Headphones',
                description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
                price: 299.99,
                stock: 100,
                CategoryId: createdCategories[0].id, // Electronics
                images: [
                    { link: 'https://example.com/images/headphones-1.jpg' }
                ]
            },
            {
                name: 'Smartphone X',
                description: 'Latest smartphone with advanced camera system and 5G connectivity.',
                price: 899.99,
                stock: 75,
                CategoryId: createdCategories[0].id, // Electronics
                images: [
                    { link: 'https://example.com/images/phone-1.jpg' }
                ]
            },
            {
                name: 'Cotton T-Shirt',
                description: 'Comfortable 100% cotton t-shirt, available in multiple colors.',
                price: 24.99,
                stock: 200,
                CategoryId: createdCategories[1].id, // Clothing
                images: [
                    { link: 'https://example.com/images/tshirt-1.jpg' }
                ]
            },
            {
                name: 'Denim Jeans',
                description: 'Classic fit denim jeans, durable and stylish.',
                price: 79.99,
                stock: 150,
                CategoryId: createdCategories[1].id, // Clothing
                images: [
                    { link: 'https://example.com/images/jeans-1.jpg' }
                ]
            },
            {
                name: 'JavaScript: The Definitive Guide',
                description: 'Comprehensive guide to JavaScript programming for beginners and experts.',
                price: 49.99,
                stock: 80,
                CategoryId: createdCategories[2].id, // Books
                images: [
                    { link: 'https://example.com/images/book-js.jpg' }
                ]
            },
            {
                name: 'The Complete Node.js Guide',
                description: 'Learn Node.js from scratch with practical examples and projects.',
                price: 39.99,
                stock: 60,
                CategoryId: createdCategories[2].id, // Books
                images: [
                    { link: 'https://example.com/images/book-node.jpg' }
                ]
            },
            {
                name: 'Coffee Maker Deluxe',
                description: 'Programmable coffee maker with 12-cup capacity and automatic shut-off.',
                price: 89.99,
                stock: 40,
                CategoryId: createdCategories[3].id, // Home & Garden
                images: [
                    { link: 'https://example.com/images/coffeemaker-1.jpg' }
                ]
            },
            {
                name: 'Yoga Mat',
                description: 'Non-slip yoga mat with carrying strap, perfect for home workouts.',
                price: 34.99,
                stock: 90,
                CategoryId: createdCategories[4].id, // Sports & Outdoors
                images: [
                    { link: 'https://example.com/images/yogamat-1.jpg' }
                ]
            },
            {
                name: 'Running Shoes',
                description: 'Lightweight running shoes with cushioned sole for maximum comfort.',
                price: 119.99,
                stock: 70,
                CategoryId: createdCategories[4].id, // Sports & Outdoors
                images: [
                    { link: 'https://example.com/images/runningshoes-1.jpg' }
                ]
            }
        ];

        for (const productData of products) {
            // Check if product already exists
            let product = await db.Product.findOne({ 
                where: { name: productData.name } 
            });

            if (!product) {
                // Extract images before creating product
                const { images, ...productInfo } = productData;
                
                // Create product
                product = await db.Product.create(productInfo);
                console.log(`Product created: ${product.name}`);

                // Create images for the product
                if (images && images.length > 0) {
                    for (const imageData of images) {
                        await db.Image.create({
                            ...imageData,
                            ProductId: product.id
                        });
                    }
                    console.log(`  - Added ${images.length} image(s)`);
                }
            } else {
                console.log(`Product already exists: ${product.name}`);
            }
        }

        console.log('\n✅ Database initialization completed successfully!');
        console.log('\n📋 Summary:');
        console.log('   - Admin user: admin@example.com');
        console.log('   - Admin password: admin123');
        console.log(`   - Categories: ${createdCategories.length}`);
        console.log(`   - Products: ${products.length}`);

        // Close the database connection
        await db.sequelize.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error initializing database:', error);
        await db.sequelize.close();
        process.exit(1);
    }
}

// Run the initialization
initDatabase();

