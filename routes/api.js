var express = require('express');
var router = express.Router();
const product_Controller = require('../controllers/product_controller');

router.get('/products/', product_Controller.getAllProducts);
router.get('/products/:id', product_Controller.getProductById);
router.post('/products/', product_Controller.createProduct);
router.put('/products/:id', product_Controller.updateProduct);
router.delete('/products/:id', product_Controller.deleteProductById);
router.delete('/products/', product_Controller.deleteAllProducts);
router.get('/products/?name=[kw]', product_Controller.findProductsByName);


module.exports = router;