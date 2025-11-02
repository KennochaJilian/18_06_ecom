const db = require('../models');

module.exports = {
    add: async (productPayload) => {
        const newProduct = {
            name: productPayload.name,
            description: productPayload.description,
            price: productPayload.price,
            stock: productPayload.stock
        }
        const category = await db.Category.findByPk(productPayload.category);
        const images = [];
        if(productPayload.images){

            for (const image of productPayload.images) {
                images.push(await db.Image.create(image))
            }
        }
        const product = await db.Product.create(newProduct);
        category.addProduct(product);
        product.addImages(images);
        return product

    }
}