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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
//app.use(express.static('public')); //carpeta public sea estatica
app.use('/static', express.static(__dirname +'/public'));

app.use('/api/users', userRouter);
app.use('/api/products', productsRouter)


app.listen(8080, error => {
  console.log('Servidor escuchando en el puerto 8080 ♥')
});

