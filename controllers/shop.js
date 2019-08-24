
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {

    Product.fetchAll().then(([rows, fieldData]) => {
        console.log(rows);
        res.render('shop/index', {
            prods: rows, 
            docTitle: 'My Shop',
            path:'/'
        });
    }).catch(err => { console.log(err) });
}

exports.getProducts = (req, res, next) => {

    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prods: rows, 
            docTitle: 'All Products',
            path:'/products'
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.fetchById(prodId).then(([products, data]) => {
        res.render('shop/product-detail', {
            product: products[0], 
            docTitle: 'Product Detail',
            path:'/product-detail'
        });
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart().then(cart => {
        res.render('shop/cart', {
            docTitle: 'Your Cart',
            path:'/cart',
            products: cart.products
        });
    }, err => {
        res.redirect('/');
    });

}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.fetchById(prodId).then(([products, data]) => {
        
        Cart.addProduct(products[0]).then(() => {
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