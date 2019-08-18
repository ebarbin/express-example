
const Product = require('../models/product');

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

exports.getCart = (req, res, next) => {

    res.render('shop/cart', {
        docTitle: 'Your Cart',
        path:'/cart'
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