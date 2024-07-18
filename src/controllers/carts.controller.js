const CartManagerMongo = require('../dao/cartsDaoMongo.js');
//const cartManager = require('../dao/cartsDaoMongo.js');

class CartController {
    constructor(){
        this.cartService = new CartManagerMongo();
    }

//TRAER TODOS LOS CARRTS
    getCarts = async (req, res)=>{
        try {
            const carts = await this.cartService.getCarts();
            res.status(200).json(carts);
        } catch (error){
            console.error('error al obtener los carritos', error);
            res.status(500).send('errorr añ obtener los carritos');
        }
    }

//TRAER CARRITO POR ID
    getCartById = async (req, res) =>{
        const {cid} = req.params;
        const cart = await this.cartService.getCartById(cid);
        if(cart) {

        }

    }

//TRAER CARRITO DE COMPRA POR ID
getCartById = async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await this.cartService.getCartById(cid);

        if (!cart) {
            return res.status(404).json({error: 'No se encuentra el carrito'});
        }
        res.status(200).json(cart);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

//CREAR NUEVO CARRITO
createCart = async  (req, res) => {
    try {
        const newCart = await this.cartService.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//ACTUALIZAR EL CARRITO
updateCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const updateCart = await this.cartService.updateCart(cid, req.body);

        if(!updateCart) {
            return res.status(404).json({error: 'Nose encuentra el carrito'});
        }
        res.status(200).json(updateCart);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//ELIMINAR CARRITO POR ID
deleteCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const deleteCart = await this.cartService.deleteCart(cid);

        if (!deleteCart) {
            return res.status(404).json({ error: 'No se encuentra el carrito'});

        }
        res.status(200).json({ message:'Carrito elimiadod'});
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

}

module.exports = CartController;