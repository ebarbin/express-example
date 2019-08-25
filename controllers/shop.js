
const Product = require('../models/product');

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
    req.user.getCart().then(cart => {
        cart.getProducts().then(products => {
            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path:'/cart',
                products: products
            });
        });
    }).catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    
    let fetchCart;
    let newQuantity = 1;

    req.user.getCart().then((cart) => {
        fetchCart = cart;
        return cart.getProducts({where: {id: req.body.productId}});
    }).then(products => {

        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;

            return product;
        } else {
            return Product.findByPk(req.body.productId);
        }

    }).then(product => {
        return fetchCart.addProduct(product, {through: {quantity: newQuantity} });
    }).then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postCardDeleteProduct = (req, res, next) => {
    req.user.getCart().then((cart) => {
        return cart.getProducts({where: {id: req.body.productId}});
    }).then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    }).then(() => {
        res.redirect('/');
    }).catch(err => console.log(err));
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