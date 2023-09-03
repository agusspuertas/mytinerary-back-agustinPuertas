import { Schema,model,Types } from 'mongoose';

const collection = 'cities';
const schema = new Schema({
    nombre: {type: String, require: true},
    imagen: {type: String, require: true},
    pais: {type: String, require: true},
    descripcion: {type: String, require: true},
    itineraries: [{type: Types.ObjectId, ref:'itineraries'}]
}, {
    timestamps: true
})

const Cities= model(collection, schema)

export default Cities