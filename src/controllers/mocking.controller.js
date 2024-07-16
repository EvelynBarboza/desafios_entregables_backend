const generateMockProducts = require('../mocking/mocking.js');

exports.getMockProducts = (req, res) => {
    const products = generateMockProducts();
    res.status(200).json(products);
};