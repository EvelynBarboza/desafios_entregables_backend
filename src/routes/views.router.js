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
router.post('/realtimeproducts', async (req, res) =>{
    try {
        const {title, description, price, thumbnail, code, stock} = req.body;
        //if (!title || description || price|| thumbnail|| code || stock)
        const newProduct = new products({
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });

        await newProduct.save();
        socket.emit('Productos actualizados', newProduct);
        const products = await productManager.getProducts();
        res.render('realTimeProducts', {
            title: 'Producto en tiempo real',
            products : products,

        })
    } catch (error){
        console.error(error);
        res.status(500).send('Error al obtener los productos en tr');
    }
});


//ENDPOINT ELIMINAR PRODUCTO
router.post('/rea')






//chat websocket 

router.get('/chat', (req, res) =>{
    res.render('chat', {
        style: 'homestyle.css'

    })
})

module.exports = router;