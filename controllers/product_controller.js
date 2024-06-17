const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {

        const keyword = req.query.name;
        let products;
    
        if (keyword) {
            products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        } else {
            products = await Product.find();
        }
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving all products:" + err.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving product id: " + req.params.id });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: "Error saving new product: " + err.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found." });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: "Error updating product: " + err.message });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);        
        // if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });        
        // res.json({acknowledged: deletedProduct.acknowledged, deletedCount: deletedProduct.deletedCount});
        res.json({ message: 'Product deleted.' });


    } catch (err) {
        res.status(500).json({ error: "Error deleting product by Id." });
    }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
        const result = await Product.deleteMany();        
        res.json(result);
        // res.json({ message: 'All products deleted' });
    } catch (err) {
        res.status(500).json({ error: "Error deleting all products." });
    }
};

// Find products by name containing a keyword
// exports.findProductsByName = async (req, res) => {
//     try {
//         const keyword = req.query.name;
//         const products = await Product.find({ name: new RegExp(keyword, 'i') });
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ error: "Error finding product by keyword." });
//     }
// };