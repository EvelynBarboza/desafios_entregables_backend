const { Router } = require('express');
const CartController = require('../../controllers/carts.controller.js');
const passport = require('passport');

const cartRouter = Router();
const cartController = new CartController();
//{
 // getCarts,
//  getCart,
//  createCart,
//  updateCart,
//  deleteCart
//} = new CartController();

// TRAER TODOS LOS CARRITOS
cartRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) =>{
    await cartController.getCarts(req, res);
});

// TRAER UN CARRITO POR ID
cartRouter.get('/:cid', passport.authenticate('jwt', { session: false }), async (req, res) =>{
    await cartController.getCartById(req, res);
});

// CREAR UN CARRITO
cartRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res)=>{
    await cartController.createCart(req, res);
});

// ACTUALIZAR UN CARRITO
cartRouter.put('/:cid', passport.authenticate('jwt', { session: false }), async (req, res)=>{
    await cartController.updateCart(req, res);
});

// ELIMINAR UN CARRITO
cartRouter.delete('/:cid', passport.authenticate('jwt', { session: false }), async (req, res)=>{
    await cartController.deleteCart(req, res);
});

module.exports = cartRouter;