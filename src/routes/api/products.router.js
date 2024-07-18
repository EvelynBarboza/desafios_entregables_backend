const { Router } = require('express'); 
const productController = require('../../controllers/products.controller.js');
const passport = require('passport')

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
router.post('/', passport.authenticate('jwt', {session: false}), createProduct);

//actualizar producto 
router.put('/productos/:pid', passport.authenticate('jwt', {session: false}), updateProduct);

//ELIMINAR PRODUCTO
router.delete('/productos/:pid', passport.authenticate('jwt', {session: false}), deleteProduct);
  

module.exports = router;
   