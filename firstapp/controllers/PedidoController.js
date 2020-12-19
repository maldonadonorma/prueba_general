var mongoose = require('mongoose');
var Pedido = require("../models/Pedido");
var Producto = require("../models/Producto");

var pedidoController = {};

pedidoController.list = function(req, res){
   // res.render('../views/listado.ejs' );
   let carrito=[];
   let total = 0;
   Pedido.find({}).exec(function(err, pedidos){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX pedidos");
        Producto.find().exec(function(err, productos){
            if( err ){ console.log('Error: ', err); return; }
            //console.table(productos);
            pedidos.forEach(function(pedido,i) {
                let temp;
                productos.forEach(function(producto) {
                    if(producto._id == pedido.idProducto){
                        //temp = producto;
                        let registro={
                            nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            precio: producto.precio,
                            cantidad: pedido.cantidad,
                            subtotal: producto.precio * pedido.cantidad
                        };
                        total += producto.precio * pedido.cantidad;
                        carrito.push(registro);
                    }
                }); 
                
            });
            
            res.render('../views/ListaDePedidos.ejs', {pedidos: carrito, total: total} );
        });

       
        
    });
    
};

pedidoController.show = function(req, res){
    Pedido.findOne({_id: req.params.id}).exec(function(err, pedido){
        if( err ){ console.log('Error: ', err); return; }
        Producto.findOne({_id: pedido.idProducto}).exec(function(err, producto){
            if( err ){ console.log('Error: ', err); return; }
            res.render('../views/mostrarpedido.ejs', {pedido: pedido, producto:producto} );
        });

        
        
    });
    
};

pedidoController.create = function(req, res){

    Producto.find({}).exec(function(err, productos){
        if( err ){ console.log('Error: ', err); return; }
        res.render('../views/registropedido.ejs',{productos: productos});
    });

    
};

pedidoController.save = function(req, res){
    var pedido = new Pedido( req.body );
    
    pedido.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Pedido agregado. :)");
        res.redirect("/pedido/lista/");
        
    });
};


pedidoController.edit = function(req, res) {
    Pedido.findOne({_id: req.params.id}).exec(function (err, pedido) {
      if (err) { console.log("Error:", err); return; }
      
      res.render("../views/editarpedido.ejs", {pedido: pedido});
      
    });
  };
  
  pedidoController.update = function(req, res){
    Pedido.findByIdAndUpdate( req.params.id, {$set: {
          idProducto: req.body.idProducto,
          precio: req.body.precio,
          cantidad: req.body.cantidad
      }}, { new: true },
      function( err, pedido){
          if( err ){ 
              console.log('Error: ', err); 
              res.render('../views/editarpedido.ejs', {pedido: req.body} );
          }
          
          console.log( pedido );
          
          res.redirect('/pedido/mostrar/' + pedido._id);
          
      });
  };


  pedidoController.delete = function(req, res){
    
    Pedido.remove({_id: req.params.id}, function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Pedido borrado!");
        res.redirect("/pedido/lista");
    });
    
};
/*
 * Other actions
 */

module.exports = pedidoController;