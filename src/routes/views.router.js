const { Router } = require('express')
const ProductManager = require('../../productManager')

const router = Router()

const productManager = new ProductManager();


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
    try {
        const products =  await productManager.getProducts();
        res.render('realTimeProducts', {
            title: 'Producto en tiempo real',
            products : products,

        })
    } catch (error){
        console.error(error);
        res.status(500).send('Error al obtener los productos en tr');
    }
})

module.exports = router;