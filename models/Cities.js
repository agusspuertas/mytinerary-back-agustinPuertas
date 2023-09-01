import { Schema,model,Types } from 'mongoose';

const collection = 'cities';
const schema = new Schema({
    nombre: {type: String, require: true},
    foto: {type: String, require: true},
    pais: {type: String, require: true},

    
}, {
    timestamps: true
})

const Cities= model(collection, schema)

export default Cities