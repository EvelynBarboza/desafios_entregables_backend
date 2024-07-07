const productManager = require ('../dao/productDaoMongo.js')

class productController {
    constructor (){
        this.productService = productManager;

    }
//traer todos los productos
getProducts = async (req, res) => {
    try{
      const limit = req.query.limit;
      let products = await this.productService.getProducts();
      if (limit) {
        products = products.slice(0, parseInt(limit));
      }
      const objProducts = { products };
  
      res.render('products', objProducts);
     } catch (error) {
      console.error('Error al obtener los productos', error);
      res.status(500).send('ups! ah ocurrido un error...')
     }
    }

//traer un producto por id
getProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.productService.getProductById(pid);
  
      if (product) {
        res.render(product);
        } else {
          res.status(404).send('Producto no encontrado');
      }
    } catch (error) {
        console.error('Error al obtener el producto');
        res.status(500).send('ups! ah ocurrido un error...');
        }
      
    }

//crear un nuevo producto
    createProduct = async (req, res) => {
      try {
        const productData = req.body;
        const newProduct = await this.productService.createProduct(productData);
        res.status(201).json(newProduct);

      } catch (error) {
        console.error('Error al crear el producto', error);
        res.status(500).send('Ups! ah ocurrido un error inesperado');
      }
    }

//actualizar un producto por id 
    updateProduct = async (req, res) =>{
      try {
        const { pid } = req.params;
        const productData = req.body;
        const updateProduct = await this.productService.updateProduct(pid, productData);
        if(updateProduct) {
          res.status(200).send('Producto actualizado correctsmente');
        } else {
          res.status(404).send('Porducto no encontrado');
        }
      } catch (error) {
          console.error('Error al actualizar el producto', error);
          res.status(500).send('Ups! ah un ocurrido un error inesperado !')
      }
    }
    
//añadir producto al carrito
addProductToCart = async (req, res) =>{
  try {
    const { cid, pid } = req.body;
    const updateCart = await thid.productService.addProductToCart(cid,pid);
    res.status(200).json(updateCart);
  } catch (error) {
    console.error('Error al aañadir el producto al carrito', error);
    res.status(500).send('Ups! ha ocurrido un error', error);
  }
}

//eliminar producto del carrito
deleteProductForCart = async (req, res) =>{
  try {
    const {pid, cid } = req.body;
    const updateCart = await this.productService.deleteProductForCart(cid, pid);
    res.status(200).json(updateCart);
    } catch (error){
      console.error('Error al eliminar tu productpo del carrito', error);
      res.status(500).send('Ups ! ah ocurrido otro error JJ');
    }
}


  //eliminar un producto por id
  deleteProduct= async (req, res) => {
    try {
      const { pid } = req.params;
      const result = await this.productService.deleteProduct(pid);
      if (result) {
        res.status(200).send('Producto no encontrado');

      }else {
        res.status(404).send('producto no encontrado');
      }
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        res.status(500).send('ups! ah ocurrido un error !');
    }
  }
}


module.exports = new productController();