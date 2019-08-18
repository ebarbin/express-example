const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

getProductFromFile = () => {
    const promise = new Promise((resolve, reject) => {
        const p = path.join(rootDir, 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {                
            if(err || fileContent.byteLength == 0) resolve([]);
            else resolve(JSON.parse(fileContent));
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
        return new Promise((resolve, reject) => {
            getProductFromFile().then((productsFileArray) => {

                productsFileArray.push(this);
                const p = path.join(rootDir, 'data', 'products.json');
                fs.writeFile(p, JSON.stringify(productsFileArray), (err) => {
                    resolve();
                });
            });
        });
    }

    static fetchAll() {
        return getProductFromFile();
    }
}
