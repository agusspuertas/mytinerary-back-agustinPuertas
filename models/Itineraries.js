import { Schema,model,Types } from 'mongoose';


const collection = 'itineraries';
const schema = new Schema({
    nombre:{type:String,required:true},
    nombreUsuario:{type:String,required:true},
    usuarioImagen:{type:String,required:true},
    duracion:{type:String,required:true},
    precio:{type:Number,required:true},
    likes:{type:String,required:true},
    hashtags:{type:String,required:true},
    comentarios:{type:String},
    city: {type: Types.ObjectId, ref: "cities"}
}, {
    timestamps: true
})

const Itineraries= model(collection, schema)

export default Itineraries 