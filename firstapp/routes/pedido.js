var express = require('express');
var router = express.Router();

//metodos

var pedido = require('../controllers/PedidoController.js');

router.get('/lista', pedido.list);
router.get('/mostrar/:id', pedido.show);
router.get('/agregar', pedido.create);
router.post('/save', pedido.save);
router.get('/edit/:id', pedido.edit);
router.post('/update/:id', pedido.update);
router.post('/delete/:id', pedido.delete);


//EXportar modulo
module.exports = router;