const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const userRouter =require('./routes/users.router.js');
const productsRouter = require('./routes/products.router.js');
const viewsRouter = require('./routes/views.router.js');
const pruebaCookie = require('./routes/cookies.router.js');
const ProductManager = require('../productManager.js');
const handlebars = require('express-handlebars');
const { connectDB } = require('../src/config/index.js');
const { sessionRouter } = require('./routes/sessions.router.js')
const { Server } = require('socket.io');
const { sessionRouter } = require('./routes/sessions.router.js');
//const fileStore= require('session-file-store')
const MongoStore = require ('connect-mongo')

const app = express();

//guardamos en una constante el app.listen
const httpServer = app.listen(8080, error => {
  console.log('Servidor escuchando en el puerto 8080 ♥')
});


//creamos socketserver para el servidor
const socketServer = new Server(httpServer);

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(cookieParser('s3cr3t&f1rm4'));
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://Evelyn_barboza:12iarapamela@e-commerce.gt36w0w.mongodb.net/e-commerce_bck?retryWrites=true&w=majority&appName=e-commerce',
    //agregarnombre bd
    mongoOptions: {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    },
    ttl: 60 * 60 * 1000 * 24
  }),
  secret: 's3cr37@c0n7r4s3ña',
  resave: true,
  saveUninitialized: true
}))

connectDB()
//mongoose.connect('mongodb://127.0.0.1:27017/c53145')
//mongoose.connect('mongodb+srv://Evelyn_barboza:12iarapamela@e-commerce.gt36w0w.mongodb.net/e-commerce_bck?retryWrites=true&w=majority&appName=e-commerce')

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

app.use('/', viewsRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/cookie', pruebaCookie);
app.use('/api/sessions', sessionRouter);




socketServer.on('connection', data => {
   console.log('Nuevo cliente conectado')
})


//const prodManager = new ProductManager();

//const products = prodManager.getProducts()
//console.log(products)

function dispara(){
  socketServer.emit('Todos_los_productos', 'products') 
  //console.log('hola')
}


dispara()


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