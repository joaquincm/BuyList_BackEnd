var Item = require('../models/Item')

exports.findAllItems = function (req, res) {

    Item.find({}).exec(function (err, models) {
        if (err) {
            res.render('error', {
                status: 500
            })
        } else {
            res.json(models)
        }
    })
}

exports.setItemCompleted = function( req, res ){

    Item.findByIdAndUpdate(req.params.id, { $set: { completado: req.body.completado }}, function (err, item) {
        if (err) return handleError(err)
        res.send(item)
    })
}

exports.addItem = function ( req, res ) {
   
    var item = new Item({
        texto: req.body.texto,
        cantidad: req.body.cantidad,
        completado: false
    })

    item.save(function (err, itemSaved) {
        if (err) return res.status(500).send({res: 'error',msg: err.errors.texto.message})
        res.status(200).json({res: 'ok',item: itemSaved})
    })
}

exports.removeItem = function(req, res) {
	Item.findById(req.params.id, function(err, item) {
        if(item){
            item.remove(function(err) {
                if(err) return res.status(500).send(err.message)
                res.status(200).send({res: 'ok',method: 'DELETE',item: item})
            })
         }
	})
}

module.exports = exports