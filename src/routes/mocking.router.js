const Router = require('express');
const { getMockProducts } = require('../controllers/mocking.controller');


const router = Router();

router.get('/mockingproducts', getMockProducts);

module.exports= router;