const { Router } = require('express'); 
//import { uploader } from '../utils.js';
const router = Router();

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
    
    //fs.readFile('../products.json', 'utf8', (err, data) => {
      //if (err) {
        //console.error('Error al leer el archivo');
        //return res.status(500).send('Error')
      //}
     //res.send('Mi primer "Hola Mundo" desde el backend con Express');
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
  
     module.exports = router;
   