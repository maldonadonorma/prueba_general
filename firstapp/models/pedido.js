var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidoSchema = new Schema({
    idProducto: {type: String, required: true, max: 100},
    precio: {type: Number, required: true},
    cantidad: {type: Number, required: false}
    
});

module.exports = mongoose.model('Pedido', PedidoSchema);
