
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {

    Product.fetchAll().then((data) => {
        res.render('shop/index', {
            prods: data, 
            docTitle: 'My Shop',
            path:'/'
        });
    });
}

exports.getProducts = (req, res, next) => {

    Product.fetchAll().then((data) => {
        res.render('shop/product-list', {
            prods: data, 
            docTitle: 'All Products',
            path:'/products'
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.fetchById(prodId).then(prod => {
        res.render('shop/product-detail', {
            product: prod, 
            docTitle: 'Product Detail',
            path:'/product-detail'
        });
    });
}

exports.getCart = (req, res, next) => {

    res.render('shop/cart', {
        docTitle: 'Your Cart',
        path:'/cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.fetchById(prodId).then(prod => {
        Cart.addProduct(prod.id, parseFloat(prod.price)).then(() => {
            res.redirect('/cart');
        });
    });
}

exports.getOrders = (req, res, next) => {

    res.render('shop/orders', {
        docTitle: 'Your Orders',
        path:'/orders'
    });
}

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path:'/checkout'
    });
}