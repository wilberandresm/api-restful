'use strict'

const mongoose= require('mongoose')
const Schema=mongoose.Schema
//para la contraseña
//encriptar
const bcrypt = require('bcryptjs')//el del video usaba bcrypt-nodejs
const crypto=require('crypto')
const UserSchema= new Schema({

//añadimos las propiedades
    email:{type:String,unique:true,lowercase:true},
    displayName:String,
    avatar:String,
    password:{type:String,select:false},
    signupDate:{type:Date,default:Date.now()},
    lastLogin: Date

})

UserSchema.pre('save',(next) =>{
    let user=this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10,(err,salt) =>{
        if(err) return next(err)

        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar =function(){
    if(this.email) return `https://gravatar.com/avatar/?s=2006d=retro`
    //hashs que por defecto pone el avatar
    const md5=crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=2006d=retro`
}

module.exports = mongoose.model('user',UserSchema)