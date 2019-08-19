const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {

    static addProduct(id, productPrice) {

        const promise = new Promise((resolve, reject) => {

            //Fetch the previus cart
            fs.readFile(p, (err, fileContent) => {

                let cart = {products: [], totalPrice: 0};
                if (!err || (fileContent && fileContent.byteLength > 0)) {
                    cart = JSON.parse(fileContent);
                }

                //Analyze the cart => find existing product
                const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
                const existingProduct = cart.products[existingProductIndex];
                let updatedProduct;

                //Add new product / increase quantity
                if (existingProduct) {
                    updatedProduct = {... existingProduct };
                    updatedProduct.qty = updatedProduct.qty + 1;
                    cart.products = [... cart.products];
                    cart.products[existingProductIndex] = updatedProduct;
                } else {
                    updatedProduct = {id: id, qty: 1};
                    cart.products = [... cart.products, updatedProduct];
                }

                cart.totalPrice = cart.totalPrice + productPrice;

                fs.writeFile(p, JSON.stringify(cart), (err) => {
                    resolve();
                });
            });
        });

        return promise;
    }
}