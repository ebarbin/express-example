
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products, 
            docTitle: 'My Shop',
            path:'/'
        });
    }).catch(err => { console.log(err) });
}
 
exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            prods: products, 
            docTitle: 'All Products',
            path:'/products'
        });
    }).catch(err => { console.log(err) });
}

exports.getProduct = (req, res, next) => {
    Product.findByPk(req.params.productId).then(prod => {
        res.render('shop/product-detail', {
            product: prod, 
            docTitle: 'Product Detail',
            path:'/product-detail'
        });
    }).catch(err => { console.log(err) });
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