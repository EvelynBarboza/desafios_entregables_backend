const express = require ('express');
const fs = require('fs');
//const http = require ('http');
const ProductManager = require('../productManager.js');

const app = express();

const productManager = new ProductManager('products.json');


//ENDPOINT -- obtener todos los productos
app.get('/productos', async (req, res) => {
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
    res.status(500).send('Error')
   }
  
  //fs.readFile('../products.json', 'utf8', (err, data) => {
    //if (err) {
      //console.error('Error al leer el archivo');
      //return res.status(500).send('Error')
    //}
   //res.send('Mi primer "Hola Mundo" desde el backend con Express');
  });


//ENDPOINT -- obtemner producto por id
app.get('/productos/:pid', async (req, res) => {
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
      res.status(500).send('EEROR');
  }
    //const product = products.find(p => p.id === parseInt(pid));
    //if (product) {
      //res.send(product);
      //} else {
       // res.status(404).send('Producto no encontrado');
    //}
   });
   



//const server = https.createServer(app);

app.listen(8080, error => {
  console.log('Servidor escuchando en el puerto 8080 ♥')
});
//localhost:8080
///server.listen(8080, err => {
   // if (err) console.log("err")
   // console.log('server escuchando en el puerto 8080')
//})
