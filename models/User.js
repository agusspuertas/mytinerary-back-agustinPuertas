import { Schema, model, Types } from "mongoose";

let collection = 'users'
let schema = new Schema({
    nombre: {type:String, required:true},
    apellido: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    foto: {type:String},
    pais: {type:String},
    online: {type:Boolean, default: false},
    verified: {type:Boolean, default: true},
    verified_code: {type:String},
},{
    timestamps:true
})

const User = model(collection,schema)

export default User