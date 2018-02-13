var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    mongoose = require('mongoose'),
    ItemController = require('./controllers/Item')

const PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var router = express.Router();

router.route('/api/all').get(ItemController.findAllItems)
router.route('/api/nuevo').post(ItemController.addItem)
router.route('/api/setCompleted/:id').put(ItemController.setItemCompleted)
router.route('/api/delete/:id').delete(ItemController.removeItem)

app.use(router);

mongoose.connect('mongodb://localhost/todo', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(PORT, function() {
    console.log("Node server running on (compra_backend) http://localhost:"+PORT);
  });
});