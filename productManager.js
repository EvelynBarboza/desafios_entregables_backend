const fs = require('fs')

 class ProductManager {
    constructor() {
          this.products =  [];
          this.id = 1;
          this.filePath = ".products.json"
          
        }
    
        
     async addProduct (title, description, price, thumbnail, code, stock) {
            try {
                if (!title || !description || !price || !thumbnail || !code || !stock) {
                    throw new Error('Faltan campos obligatorios');

            }
            const existCode = this.products.some(product => product.code === code);
             if (existCode) {
                throw new Error ('Este codigo ya existe');
        } 

        const newProduct = {
            id: this.id++,
            title, 
            description, 
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        await this.saveProducts(this.products);

        } catch(error) {
            console.error('Error al agregar el producto')
            throw error;
        }
        
}
    async getProducts () {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al obtener los productos');
            throw error;
        }
    }

    async getProductById (id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === parseInt(id));
        
        } catch (error){
            console.error('Error al obtener el producto por ID');
            throw error;
            }
        };

    async upDateProduct (id, newData) {
    try {
        let products = await this.getProducts();
        const index = products.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
            products[index] = {...products[index], ...newData};
            await this.saveProducts(products);
        }else {
            throw new Error('Producto no encontrado');
        }

    } catch (error) {
        console.error('Error al actualizar el producto')
    } throw error;
    }
      //  const productId = this.products.find(product => product.id === id);
        //if (!productId) {
           // console.error('NOT FOUND')
       // } else {
          //  console.log(`El producto es", ${productId}`)
       // }

    async deleteProduct(id){
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== id);
            await this.saveProducts(products);
            return;
        } catch (error) {
            console.error('Error al eliminar el producto');
            throw error;
        }
    }

    async saveProducts(products) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error){
            console.error('Error al guardar los productos');
            throw error;
        }
    }
};

//const productManager = new ProductManager('products.json')

module.exports = ProductManager;
//ProductManager.addProduct()

//const product1 = new Product("Reiki", "Terapia ALternativs", 800, 1, 10);
//const product2 = new Product("Registros Akashicos", 1500, 2, 10);
//const product3 = new Product("Masajes Relajantes", 700, 3, 10);
//const product4 = new Product("Masajes Descontracturantes", 900, 4, 10);

//productManager.addProduct(product1);
//productManager.addProduct(product2);
//productManager.addProduct(product3);
//productManager.addProduct(product4);

//productManager.getProductById(800);

//console.log(productManager);
