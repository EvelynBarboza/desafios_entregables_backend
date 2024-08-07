const {faker} = require('@faker-js/faker');

const generateMockProducts = (count = 100) => {

    const products = [];
    for (let i = 0; i < count; i++) {
        const product = {
            _id: faker.database.mongodbObjectId(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            category: faker.commerce.department(),
            image: faker.image.imageUrl(),
            stock: faker.datatype.number({min: 1, max: 100}),
            createdAt: faker.date.past(),
            updateAt: faker.date.recent(),

        };
        products.push(product);
    }
    return products;

};

module.exports = generateMockProducts;