var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var itemSchema = new Schema({
    texto: {
      type: String,
      required: [true, 'Escribe algo para añadir a la lista!']
    },
    cantidad: {
      type: String
    },
    completado: {
      type: Boolean,
      required: true
    }
})



module.exports = mongoose.model('Item', itemSchema);