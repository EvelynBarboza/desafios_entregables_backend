//import express from 'express';
//import fs from 'fs';
////const { default: router } = require('./routes/users.router.js');
//import userRouter from './routes/users.router.js'
//import productManager from '../productManager.js'
const express = require('express');
const fs = require('fs');
const userRouter =require('./routes/users.router.js');
const productManager= require('../productManager.js');
const productsRouter = require('./routes/products.router.js')
const handlebars = require('express-handlebars');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

//inicializamos y indicamos el motor de hdb que tiene que usar
app.engine('handlebars', handlebars.engine()),
app.set('views', __dirname+'/views'); //ruta de las plantillas
app.set('view engine', 'handlebars'); //uso del motor de hdb



app.get('/', (req, res) =>{
  res.render('home')
})


//app.use(express.static('public')); //carpeta public sea estatica
//app.use('/static', express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/public'));

//usando middleware clase router multer
//app.use((req, res, next) =>{
//  console.log('Tiempo: ', Date());
//  console.log('saludos');
//  next()
//})


app.use('/api/users', userRouter);
app.use('/api/products', productsRouter)

//midleware para manejo de erores
app.use((error, req, res, next) =>{
  console.log(error)
  res.status(500).send('Error 500 en el servidor')
})


app.listen(8080, error => {
  console.log('Servidor escuchando en el puerto 8080 ♥')
});

