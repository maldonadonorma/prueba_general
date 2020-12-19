var mongoose = require('mongoose');
var Producto = require("../models/Producto");

var productoController = {};

productoController.list = function(req, res){
   // res.render('../views/listado.ejs' );
    Producto.find({}).exec(function(err, productos){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/listado.ejs', {productos: productos} );
        
    });
    
};

productoController.show = function(req, res){
    Producto.findOne({_id: req.params.id}).exec(function(err, producto){
        if( err ){ console.log('Error: ', err); return; }
        res.render('../views/mostrar.ejs', {producto: producto} );
    });
    
};

productoController.create = function(req, res){
    res.render('../views/registroproducto.ejs');
};

productoController.save = function(req, res){
    var producto = new Producto( req.body );
    
    producto.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Producto agregado. :)");
        res.redirect("/producto/mostrar/"+producto._id);
        
    });
};


productoController.edit = function(req, res) {
    Producto.findOne({_id: req.params.id}).exec(function (err, producto) {
      if (err) { console.log("Error:", err); return; }
      
      res.render("../views/editarproducto.ejs", {producto: producto});
      
    });
  };
  
  productoController.update = function(req, res){
      Producto.findByIdAndUpdate( req.params.id, {$set: {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          precio: req.body.precio
      }}, { new: true },
      function( err, producto){
          if( err ){ 
              console.log('Error: ', err); 
              res.render('../views/editarproducto.ejs', {producto: req.body} );
          }
          
          console.log( producto );
          
          res.redirect('/producto/mostrar/' + producto._id);
          
      });
  };


  productoController.delete = function(req, res){
    
    Producto.remove({_id: req.params.id}, function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Producto deleted!");
        res.redirect("/producto/lista");
    });
    
};
/*
 * Other actions
 */

module.exports = productoController;