const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product',
        path:'/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    req.user.createProduct({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }).then(() => {
        res.redirect('/');
    }).catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    Product.findByPk(req.body.id).then(prod => {

        prod.title = req.body.title;
        prod.imageUrl = req.body.imageUrl;
        prod.price = req.body.price;
        prod.description = req.body.description;

        return prod.save();

    }).then( () => {
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {

    Product.findByPk(req.body.id).then(prod => {
        return prod.destroy();
    }).then( () => {
        res.redirect('/');
    }).catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    req.user.getProducts({where: {id: req.params.productId}}).then(products => {
        if (!products || products.length == 0) return res.redirect('/');
        res.render('admin/edit-product', {
            docTitle: 'Edit Product',
            path:'/admin/products',
            editing: req.query.edit,
            product: products[0]
        });
    }).catch(e => { console.log(e); });
}

exports.getProducts = (req, res, next) => {
    req.user.getProducts().then(products => {
        res.render('admin/products', {
            prods: products, 
            docTitle: 'Admin Products',
            path:'/admin/products'
        });
    }).catch(err => { console.log(err) });
}