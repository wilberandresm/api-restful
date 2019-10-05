'use strict'

const mongoose=require('mongoose')
const app=require('./app')
const port= process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/shop',{ useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false},(err,res) =>{
    if(err){
        return console.log(`error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida.')

    app.listen(port,() =>{
        console.log(`API REST corriendo en  http://localhost:${port}`)
    } )
})
