const { Router } = require('express'); 
//import { uploader } from '../utils.js';
const ProductManager = require('../../../productManager')

const router = Router();

const productManager = new ProductManager();

//ENDPOINT -- obtener todos los productos
router.get('/', async (req, res) => {
    try{
      const limit = req.query.limit;
      let products = await productManager.getProducts();
      if (limit) {
        products = products.slice(0, parseInt(limit));
      }
      const objProducts = { products };
  
      res.json(objProducts);
     } catch (error) {
      console.error('Error al obtener los productos');
      res.status(500).send('ups! ah ocurrido un error...')
     }
    });
  
  
  //ENDPOINT -- obtener producto por id
  router.get('/productos/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(pid);
  
      if (product) {
        res.json(product);
        } else {
          res.status(404).send('Producto no encontrado');
      }
    } catch (error) {
        console.error('Error al obtener el producto');
        res.status(500).send('ups! ah ocurrido un error...');
    }
      //const product = products.find(p => p.id === parseInt(pid));
      //if (product) {
        //res.send(product);
        //} else {
         // res.status(404).send('Producto no encontrado');
      //}
     });

//loque estaba en views.router
     //ENDPOINT en ruta raiz me trae los productos

router.get('/', async (req, res) => {
  try{
      const products = await productManager.getProducts()
      res.render('home', {
          title: 'Listado de productos:',
          products: products,
          style: 'homestyle.css',
          
      });
  } catch (error){
      console.error(error);
      res.status(500).send('Error al obtener los productos')
  }

})

//ENDPOINT me trae los productos en tiempo real
router.get('/realtimeproducts', async (req, res) =>{
  try{
      const products = await productManager.getProducts()
      res.render('realTimeProducts', {
          title: 'Listado de productos:',
          products: products,
          style: 'homestyle.css',
          
      });
  } catch (error){
      console.error(error);
      res.status(500).send('Error al obtener los productos')
  }

});

//ENDPOINT ELIMINAR PRODUCTO
router.post('/rea')
  

module.exports = router;
   