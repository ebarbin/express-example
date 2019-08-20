const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart');

const p = path.join(rootDir, 'data', 'products.json');

getProductsFromFile = () => {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(p, (err, fileContent) => {
            if (err || fileContent.byteLength == 0) resolve([]);
            else resolve(JSON.parse(fileContent));
        });
    });

    return promise;
}

module.exports = class Product {

    constructor(id, title, imageUrl, description, price){ 
        this.id = id;
        this.title = title; 
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        const promise = new Promise((resolve, reject) => {
            getProductsFromFile().then((products) => {

                if (this.id) {
                    const existingProductIndex = products.findIndex( prod => prod.id === this.id);
                    const updatedProducts = [... products];
                    updatedProducts[existingProductIndex] = this;

                    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                        resolve();
                    });

                } else {
                    this.id = Math.random().toString();
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        resolve();
                    });
                }
            });
        });

        return promise;
    }

    static deleteById(productId, cb) {

        const promise = new Promise((resolve, reject) => {
            getProductsFromFile().then((products) => {

                const product = products.find(prod => prod.id === productId);

                const updatedProducts = products.filter(prod => prod.id !== productId);

                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                   console.log(product);
                   Cart.deleteProduct(product).then( ()=> {
                        resolve();
                    }, (err) => {
                        reject(err);
                    });
                });
            });
        });

        return promise;
    }

    static fetchAll() {
        return getProductsFromFile();
    }

    static fetchById(id) {
        const promise = new Promise((resolve, reject) => {
            getProductsFromFile().then(data => {
                const result = data.find(d => {
                    return d.id === id;
                })
                resolve(result);
            });
        });

        return promise;
    }
}