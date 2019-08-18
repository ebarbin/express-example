const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

getProductsFromFile = () => {
    const promise = new Promise((resolve, reject) => {
        const p = path.join(rootDir, 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            if(err || fileContent.byteLength == 0) 
                resolve([]);
            else
                resolve(JSON.parse(fileContent));
        });
    });

    return promise;
}

module.exports = class Product {

    constructor(title, imageUrl, description, price){ 
        this.title = title; 
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        const promise = new Promise((resolve, reject) => {
            getProductsFromFile().then((productsFileArray) => {

                productsFileArray.push(this);
                const p = path.join(rootDir, 'data', 'products.json');
                fs.writeFile(p, JSON.stringify(productsFileArray), (err) => {
                    resolve();
                });
            });
        });

        return promise;
    }

    static fetchAll() {
        return getProductsFromFile();
    }

    static fetchByIdAll(id) {
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