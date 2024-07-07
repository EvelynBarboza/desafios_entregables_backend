const { Router } = require('express'); 
const productController = require('../../controllers/products.controller.js');


const router = Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = new productController();

//obtener todos los productos
router.get('/productos', getProducts);
  
//obtener producto por id
router.get('/productos/:pid', getProduct);

//crear prdoucto
router.post('/', createProduct);

//actualizar producto 
router.put('/productos/:pid', updateProduct);

//ENDPOINT ELIMINAR PRODUCTO
router.delete('/productos/:pid', deleteProduct);
  

module.exports = router;
   