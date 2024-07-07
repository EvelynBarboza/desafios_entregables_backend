const { productsModel } = require('../models/products.models')
const { cartModel } = require('../models/cart.models')

class ProductManagerMongo {
    constructor() {
        this.products = productsModel
    }

//traer todos los productos
async getAllProducts() {
    try {
        const product = await this.products.find();
        return this.products;
    } catch (error) {
        console.error('Error al obtener los productos', error);
        throw error;
    }
}


//ENDPOINT traer producto por su id
    async getProductById(pid) {
        try {
        // Buscar el producto por su Id en la base de datos
            const product = await this.products.findById(pid);

        // Retornar el producto encontrado
            return product;
        } catch (error) {
            console.error('Error al obtener el producto por su Id:', error);
            throw error;
        }
    }

//ENDPOINT crear un producto
async createProduct(productData) {
    try {
        const newProduct = new this.products(productData);
        await newProduct.save();
        return newProduct;

    } catch (error) {
        console.error('Erros al crear el producto', error);
        throw error;

        }
    }

//ENDPOINT actualizar un producto por id 
    async updateProduct (pid, productData) {
        try {
            const updateProduct = await this.products.findByAndUpdate(pid, productData, { new: true });
            return updateProduct;

        }catch(error) {
            console.error('Error al actualizar el producto', error);
            throw error;
        }
    }

    async addProductToCart (cid, pid) {
      try {
            const cart = await cartModel.findById(cid)
            const index = cart.products.findIndex(product => pid === product.product.toString())
            if (index !== -1) {
                cart.products[index].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }await cart.save();
        return cart;
      
        }catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            throw error;
        }
      
      }
      
      //devuelve los productos ddel carrito
     async getProductsToCarts() {
        try {
            const products = await this.products.find();
            return products;
        } catch (error) {
            console.error('Error al obtener productos');
            throw error;
        }
      }
      
      //eliminar productos del carrito
   async deleteProductForCart(cid, pid) {
        try {
            const cart = await cartModel.findById({_id: cid});
            const index = cart.products.findIndex(product => pid === product.product.toString());
            if(index !== -1) {
                const product = cart.products[index];
                if (product.quantity > 1) {
                    product.quantity--;
                } else{
                    cart.products.splice(index, 1);
                }
                await cart.save();
                return cart;
            } else {
                console.log ('El producto no esta en el carrito');
                return cart;
            }
        } catch (error){
            console.error('Error al eliminar el producto del carrito');
            throw error;
        }
      }
      

//ENDPOINT eliminar un producto por id
    async deleteProduct(pid){
        try {
            const result = await this.products.findByAndDelete(pid);
            return result !== null;
        } catch (error) {
            console.error('Error al eliminar el productos', error);
            throw error;
        }
    }

}
module.exports = ProductManagerMongo;