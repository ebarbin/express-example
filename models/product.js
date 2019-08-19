const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

getProductsFromFile = () => {
    const promise = new Promise((resolve, reject) => {
        const p = path.join(rootDir, 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            if (err || fileContent.byteLength == 0) 
                resolve([]);
            else
                resolve(JSON.parse(fileContent));
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
            getProductsFromFile().then((productsFileArray) => {

                const p = path.join(rootDir, 'data', 'products.json');

                if (this.id) {
                    const existingProductIndex = productsFileArray.findIndex( prod => prod.id === this.id);
                    const updatedProducts = [... productsFileArray];
                    updatedProducts[existingProductIndex] = this;

                    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                        resolve();
                    });

                } else {
                    this.id = Math.random().toString();
                    productsFileArray.push(this);
                    fs.writeFile(p, JSON.stringify(productsFileArray), (err) => {
                        resolve();
                    });
                }
            });
        });

        return promise;
    }

    delete() {

        const promise = new Promise((resolve, reject) => {
            getProductsFromFile().then((productsFileArray) => {

                const p = path.join(rootDir, 'data', 'products.json');

                const existingProductIndex = productsFileArray.findIndex( prod => prod.id === this.id);
                const updatedProducts = [... productsFileArray];
                updatedProducts.splice( existingProductIndex , 1);

                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    resolve();
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