const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path:'/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save().then(() => {
        res.redirect('/');
    });
}

exports.getProducts = (req, res, next) => {
   
    Product.fetchAll().then((data) => {
        res.render('admin/products', {
            prods: data, 
            docTitle: 'Admin Products',
            path:'/admin/products'
        });
    });
}