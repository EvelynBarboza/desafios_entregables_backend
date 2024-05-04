//Mensajes que recibe el cliente en frontend

const socket = io()

const product = document.getElementById('products')
const agregarProductId = document.getElementById('add_product_list')
const eliminarProductId = document.getElementById('delete_product_id')

socket.on('connection', ()=> {
    console.log('Conectado a Socket')
});


//input.addEventListener('keyup', evt =>{
//    if (evt.key === 'Enter'){
//        socket.emit('productoCreado', input.value)
//        input.value = ''
//    }
//})
//
//
//
////emitir el id del producto a clientes
//socket.emit('productoEliminado', pid);
  