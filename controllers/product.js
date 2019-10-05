'use strict'

const Product =require('../models/products')

function getProduct(req,res){
    let productid =req.params.productid

    Product.findById(productid,(err,product) =>{
        if (err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if (!product) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({product})
    })

}

function getProducts(req,res){

    Product.find({},(err,products) =>{
        if (err)return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if (!products) return res.status(404).send({message:`No existen productos`})
        res.status(200).send({products})
    })


}

function saveProduct(req,res){
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
   

}
function updateProduct(req,res){
    let productid= req.params.productid
    let update=req.body
    Product.findByIdAndUpdate(productid,update,(err,productUpdated)=>{
        if (err)  return res.status(500).send({message:`Error al actualizar el producto : ${err}`})
        res.status(200).send( {product:productUpdated})
    })

}

function deleteProduct(req,res){
    let productid = req.params.productid
    
    Product.findById(productid,(err,product) =>{

        if(err)  return res.status(500).send({message:`Error al borrar el producto : ${err}`})
        
        product.remove(err =>{
            if(err)  return res.status(500).send({message:`Error al borrar el producto : ${err}`})
            res.status(200).send({message:`El producto ha sido eliminado exitosamente =D `})
        })
    })


}

module.exports={
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct

}