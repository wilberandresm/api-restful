'use strict'

const express=require('express')
const ProductCtrl=require('../controllers/product')
const api= express.Router()

//creacion de peticion tipo get
api.get('/product',ProductCtrl.getProducts)
//para acceder a un unico recurso
api.get('/product/:productid',ProductCtrl.getProduct)
//actualizaciones
api.put('/product/:productid',ProductCtrl.updateProduct)
//ruta de tipo post para subir nuestros productos
api.post('/product',ProductCtrl.saveProduct)
//borrar un producto de la base de datos
api.delete('/product/:productid',ProductCtrl.deleteProduct)

module.exports = api