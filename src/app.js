const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const MongoStore = require ('connect-mongo');
const routerApp = require('../src/routes/index.js')
const { connectDB } = require('../src/config/index.js');
const { Server } = require('socket.io');
//const { sessionRouter } = require('./routes/sessions.router.js');
const passport = require('passport')
const  { initPassport } = require('../src/config/passport.confi.js')
const ProductManager = require('../src/dao/productDaoMongo.js');

const app = express();

//CONFIG DEL SERVIDOR HTTP
const httpServer = app.listen(8080, error => {
  if (error) {
    console.error('Error al iniciar el servidor', error);
  } else {
    console.log('Servidor escuchando en el puerto 8080 ♥');
  }
});


//CONFIG DEL SERVIDOR WEBSOCKET
const socketServer = new Server(httpServer);


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(cookieParser('s3cr3t&f1rm4'));


//CONFIG DE SESIONES CON MONGODB
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://Evelyn_barboza:12iarapamela@e-commerce.gt36w0w.mongodb.net/e-commerce_bck?retryWrites=true&w=majority&appName=e-commerce',
    mongoOptions: {},
    ttl: 60 * 60 * 1000 * 24
  }),
  secret: 's3cr37@c0n7r4s3ña',
  resave: false,
  saveUninitialized: false
}))


//INICIALIZACION DE PASSPORT
initPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(routerApp)

//CONEXION A LA BASE DE DATOS
connectDB();
//mongoose.connect('mongodb://127.0.0.1:27017/c53145')
//mongoose.connect('mongodb+srv://Evelyn_barboza:12iarapamela@e-commerce.gt36w0w.mongodb.net/e-commerce_bck?retryWrites=true&w=majority&appName=e-commerce')


//CONFIG DEL MOTOR DE PLANTILLAS HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views'); //ruta de las plantillas
app.set('view engine', 'handlebars'); //uso del motor de hdb


//RUTAS PRINCIPALES DE LA APP
app.use(routerApp);


//MANEJO DE EVENTOS WEBSOCKET
socketServer.on('connection', (socket)=>{
  console.log('Nuevo cliente conectado');

//ENVIAR LISTA PRODUCT CUANDO SE CONECTA UN CLIENTE
socket.on('getProducts', async ()=> {
  const products = await ProductManager.getProducts();
  socket.emit('products', products);
});

//MANEJO DESCONEXION DEL CLIENTE
socket.on('disconect',()=>{
  console.log('cliente desconectado');
  });
});

