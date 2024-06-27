const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const MongoStore = require ('connect-mongo');
const routerApp = require('../src/routes/index.js')
const ProductManager = require('../productManager.js');
const { connectDB } = require('../src/config/index.js');
//const { sessionRouter } = require('./routes/sessions.router.js');
const { Server } = require('socket.io');
const passport = require('passport')
const  { initPassport } = require('../src/config/passport.confi.js')

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
//SESSION MONGO CONFIG
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://Evelyn_barboza:12iarapamela@e-commerce.gt36w0w.mongodb.net/e-commerce_bck?retryWrites=true&w=majority&appName=e-commerce',
    mongoOptions: {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    },
    ttl: 60 * 60 * 1000 * 24
  }),
  secret: 's3cr37@c0n7r4s3ña',
  resave: false,
  saveUninitialized: false
}))
//initPassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(routerApp)


connectDB()
//mongoose.connect('mongodb://127.0.0.1:27017/c53145')
//mongoose.connect('mongodb+srv://Evelyn_barboza:12iarapamela@e-commerce.gt36w0w.mongodb.net/e-commerce_bck?retryWrites=true&w=majority&appName=e-commerce')

//inicializamos y indicamos el motor de hdb que tiene que usar
app.engine('handlebars', handlebars.engine()),
app.set('views', __dirname+'/views'); //ruta de las plantillas
app.set('view engine', 'handlebars'); //uso del motor de hdb


//usando middleware clase router multer
//app.use((req, res, next) =>{
//  console.log('Tiempo: ', Date());
//  console.log('saludos');
//  next()
//})

socketServer.on('connection', data => {
   console.log('Nuevo cliente conectado')
})
