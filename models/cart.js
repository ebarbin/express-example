const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {

    static addProduct(product) {

        const promise = new Promise((resolve, reject) => {

            fs.readFile(p, (err, fileContent) => {

                let cart = { products: [], totalPrice: 0 };
                if (!err && (fileContent && fileContent.byteLength > 0)) {
                    cart = JSON.parse(fileContent);
                }

                const foundProd = cart.products.find(prod => prod.id === product.id);
                if (foundProd) {
                    foundProd.qty = foundProd.qty + 1;
                    cart.totalPrice = cart.totalPrice + parseFloat(foundProd.price);
                } else {
                    product.qty = 1;
                    cart.products.push(product);
                    cart.totalPrice = cart.totalPrice + parseFloat(product.price);
                }

                fs.writeFile(p, JSON.stringify(cart), (err) => {
                    resolve();
                });
            });
        });

        return promise;
    }

    static deleteProduct(prodToDelete) {
        const promise = new Promise((resolve, reject) => {

            fs.readFile(p, (err, fileContent) => {
                
                let updatedCart = {products: [], totalPrice: 0};
                if (!err) {
                    updatedCart = JSON.parse(fileContent);
                }
                
                const product = updatedCart.products.find(prod => prod.id === prodToDelete.id);

                if (!product) {
                    resolve();
                } else {
                    const productQty = product.qty;
                    updatedCart.products = updatedCart.products.filter(prod => prod.id !== prodToDelete.id);
                    updatedCart.totalPrice = updatedCart.totalPrice - (prodToDelete.price * productQty);
    
                    fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                        resolve();
                    });
                }
            });
        });

        return promise;
    }

    static getCart() {
        const promise = new Promise((resolve, reject) => {
            fs.readFile(p, (err, fileContent) => {
                console.log(fileContent);
                if (err || !fileContent || fileContent.byteLength == 0) {
                    console.log('aca');
                    reject();
                } else {
                    const cart = JSON.parse(fileContent);
                    resolve(cart);
                }
            });
        });
        return promise;
    }
}