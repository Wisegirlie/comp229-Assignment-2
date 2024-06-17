var express = require('express');
var router = express.Router();
// var apiRouter = require('./api');
const product_Controller = require('../controllers/product_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DressStore' });
});

router.get('/api/products', product_Controller.getAllProducts);
router.get('/api/products/:id', product_Controller.getProductById);
router.post('/api/products', product_Controller.createProduct);
router.put('/api/products/:id', product_Controller.updateProduct);
router.delete('/api/products/:id', product_Controller.deleteProductById);
router.delete('/api/products', product_Controller.deleteAllProducts);

module.exports = router;
