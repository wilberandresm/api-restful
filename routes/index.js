'use strict'

const express=require('express')
const ProductCtrl=require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth=require('../middlewares/auth')
const api= express.Router()

//creacion de peticion tipo get
api.get('/product',ProductCtrl.getProducts)
//para acceder a un unico recurso
api.get('/product/:productid',ProductCtrl.getProduct)
//actualizaciones
api.put('/product/:productid',auth,ProductCtrl.updateProduct)
//ruta de tipo post para subir nuestros productos
api.post('/product',auth, ProductCtrl.saveProduct)
//borrar un producto de la base de datos
api.delete('/product/:productid',auth,ProductCtrl.deleteProduct)
api.post('/signup',userCtrl.signUp)
api.post('/signin',userCtrl.signIn)
api.get('/private', auth, function(req,res){
    res.status(200).send({message:'Tienes acceso'})
})

module.exports = api