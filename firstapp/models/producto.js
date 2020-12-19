var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: false, max: 250},
    precio: {type: Number, required: true}
});

module.exports = mongoose.model('Producto', ProductoSchema);
