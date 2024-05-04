const express = require('express');
const fs = require('fs');
const userRouter =require('./routes/users.router.js');
const productsRouter = require('./routes/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');


const app = express();

//guardamos en una constante el app.listen
const httpServer = app.listen(8080, error => {
  console.log('Servidor escuchando en el puerto 8080 ♥')
});
//creamos socketserver para el servidor
const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname +'/public'));

//inicializamos y indicamos el motor de hdb que tiene que usar
app.engine('handlebars', handlebars.engine()),
app.set('views', __dirname+'/views'); //ruta de las plantillas
app.set('view engine', 'handlebars'); //uso del motor de hdb



//app.get('/', (req, res) =>{
  //res.render('home')
//})


//app.use(express.static('public')); //carpeta public sea estatica
//app.use('/static', express.static(__dirname +'/public'));

//usando middleware clase router multer
//app.use((req, res, next) =>{
//  console.log('Tiempo: ', Date());
//  console.log('saludos');
//  next()
//})

app.use('/', viewsRouter)
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter)


socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')
})
// socket.emit('Todos_los_productos', await productManager.getProducts()) => {
// {
//   try {    
//   }
///eliminacion de un producto
//socket.on('eliminarProducto', (productoId) => {
// console.log('Eliminar producto:', productoId);

//);
// const message = []

// socket.on('message_cliente', data =>{
//   console.log(data)
//   message.push({id: socket.id, message: data})
//
//   socketServer.emit('message-server', message)
// })
//)

///socket.on('message', data => {
///  console.log(data)
///})
///socket.emit('socket_individual', 'Este mensaje solo lo debe recibir este socket')
///
///socket.broadcast.emit('Para_todos_menos_el_que_lo_manda', 'Lo ven todos los socket conectados menos el que lo manda ')
///
///socketServer.emit('Eventos_para_todes_incluyendo_el_que_manda', 'Este lo ven todos')
///