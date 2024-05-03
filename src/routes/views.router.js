const { Router } = require('express')
const ProductManager = require('../../productManager')

const router = Router()

const productManager = new ProductManager();
//endpoint en ruta raiz

router.get('/products', async (req, res) => {
    try{
        const products = await ProductManager.getProducts()
        res.render('home', {
            title: 'Listado de productos:',
            products: productManager,
            
        });
    } catch (error){
        console.error(error);
        res.status(500).send('Error al obtener los productos')
    }

})

router.get('/realtimeproducts', async (req, res) =>{
    try {
        const products =  await ProductManager.getProducts();
        res.render('realTimeProducts', {
            title: 'Producto en tiempo real',
            products : productManager,

        })
    } catch (error){
        console.error(error);
        res.status(500).send('Error al obtener los productos en tr');
    }
})

module.exports = router;