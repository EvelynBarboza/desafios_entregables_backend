const { Router } = require('express');
const viewsRouter = require('../routes/views.router.js');
const userRouter = require('../routes/api/users.router.js');
const productsRouter = require('../routes/api/products.router.js');
const pruebaCookie = require('../routes/api/cookies.router.js');
const {sessionRouter} = require('../routes/api/sessions.router.js');
const {cartsRouter} = require('../routes/api/cart.router.js');

const router = Router();

//const sessionRouterClass = new sessionRouter
router.use('/', viewsRouter);
router.use('/api/users', userRouter);
router.use('/api/products', productsRouter);
router.use('/cookie', pruebaCookie);
router.use('/api/carts', cartsRouter);
//localhost:8080/api/sessions/githubcallback
router.use('/api/sessions', sessionRouter);