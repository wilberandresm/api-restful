'use strict'

const express=require('express')
const bodyParser= require('body-parser')
const mongoose=require('mongoose')

const Product =require('./models/products')

const app=express()
const port= process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//creacion de peticion tipo get
app.get('/api/product',(req,res) =>{
    res.send(200,{products:[]})
})
//para acceder a un unico recurso
app.get('/api/product/:productid',(req,res) =>{
    let productid =req.params.productid

    Product.findById(productid,(err,product) =>{
        if (err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if (!product) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({product})
    })

})
//actualizaciones
app.put('/api/product/productid',(req,res) =>{


})


//ruta de tipo post para subir nuestros productos
app.post('/api/product',(req,res) =>{
    console.log('POST/api/product')
    console.log(req.body)

    //almacenar en una base de datos nuestro primer producto
    let product = new Product()
    //se le agregan los campos
    product.name=req.body.name
    product.picture=req.body.picture
    product.price=req.body.price
    product.category=req.body.category
    product.description=req.body.description

    product.save((err,productStored) =>{
        if(err) res.status(500).send({message:`Error al salvar la base de datos: ${err}`})
        res.status(200).send({product: productStored})
    })
   
})

//borrar un producto de la base de datos
app.delete('/api/product/productid',(req,res) =>{

})

mongoose.connect('mongodb://localhost:27017/shop',{ useNewUrlParser: true, useUnifiedTopology: true  },(err,res) =>{
    if(err){
        return console.log(`error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida.')

    app.listen(port,() =>{
        console.log(`API REST corriendo en  http://localhost:${port}`)
    } )
})
