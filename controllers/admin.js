const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product',
        path:'/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);

    product.save().then(() => {
        res.redirect('/');
    });
}


exports.postEditProduct = (req, res, next) => {
    
    const prodId = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(prodId, title, imageUrl, description, price);
    product.save().then(() => {
        res.redirect('/admin/products');
    });
}

exports.postDeleteProduct = (req, res, next) => {
    
    const prodId = req.body.id;

    Product.deleteById(prodId).then(() => {
        res.redirect('/');
    }).catch(e => {
        console.log(e);
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;

    Product.fetchById(prodId).then( (prod) => {
        res.render('admin/edit-product', {
            docTitle: 'Edit Product',
            path:'/admin/products',
            editing: editMode,
            product: prod
        });
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