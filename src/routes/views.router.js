const { Router } = require('express');
const ProductManager = require('../../productManager')
//require('socket.io/socket.io.js')
const {auth} = require('../middlewares/auth.middleware.js')
const UserManagerMongo = require ('../dao/userDaoMongo.js')
const router = Router()
const { authenticate } = require('../middlewares/authorizarion.middleware.js')


router.get('/', (req, res)=>{
    res.render('main')
})

router.get('/login', auth, (req, res)=>{
    res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/products', (req, res)=>{
    res.render('products')
})

router.get('/users', auth, async (req, res) =>{
    const { numPage, limit } = req.query

    const userService = new UserManagerMongo()
    const { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await userService.getUsers({limit, numPage})

    res.render('users', {
        users: docs,
        page,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage
    })
})

//RUTA PARA PERFIL DEL USUARIO
router.get('/perfil', auth, (req, res)=>{
    res.render('main')
})


//RUTA PARA CARTS
router.get('/carts', authenticate(['users', 'users_premium', 'admin']), (req, res) => {
    res.render('carts', {user: req.user});
})

//router.post('/upload-file', uploader.single('myfile'),(req, res) =>{
//    res.render('succesFile')
//})



   //socket.on('Todos_los_productos', (data)=> {
   //    console.log('Esto son los datos', data)
   //
   //});

   //try {
   //    const {title, description, price, thumbnail, code, stock} = req.body;
   //    //if (!title || description || price|| thumbnail|| code || stock)
   //    const newProduct = new products({
   //        title,
   //        description,
   //        price,
   //        thumbnail,
   //        code,
   //        stock
   //    });

   //    await newProduct.save();
   //    socket.emit('Productos actualizados', newProduct);
   //    const products = await productManager.getProducts();
   //    res.render('realTimeProducts', {
   //        title: 'Producto en tiempo real',
   //        products : products,

   //    })
    //} catch (error){
    //    console.error(error);
    //    res.status(500).send('Error al obtener los productos en tr');
    //}


//chat websocket 

router.get('/chat', (req, res) =>{
    res.render('chat', {
        style: 'homestyle.css'

    })
})

module.exports = router;