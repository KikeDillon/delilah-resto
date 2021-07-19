const products = require('../database/products.json');
const fs = require('fs');

module.exports = {
    show: function showProducts(req, res){
        res.send(products)
    },

    create: function createProduct(req, res) {
        if (products !== null || products !== undefined) {
            let lastProduct = products.pop();
            products.push(lastProduct);
            let newProduct = {
                id: lastProduct.id + 1,
                productName: req.body.productName,
                price: req.body.price
            };
            let prod = products.find(function (i) {
                return req.body.productName == i.productName;
            });
            if (!prod) {
                products.push(newProduct);
                let newProductSTR = JSON.stringify(products, null, 2);
                fs.writeFileSync('./database/products.json', newProductSTR);
                return res.send('Se ha cargado un nuevo producto')
            } else {
                return res.send('El producto ya existe')
            }
        }
    },
    // --== Modificar Producto ==--
    /*modify: function modificarProducto(req, res) {
    const idProducto = Number(req.params.id);
    for (const product of products) {
        if (product.id === idProducto) {
            product.productName = req.body.productName;
            product.price = req.body.price;
        }
    }
    res.status(204).send('Se a Modificado el Producto');
}*/
    modify: function modProduct(req, res) {
        let productId = Number(req.params.id);
        let newArrayProducts = products.map(function (i) {
            if (i.id == productId) {
                let newProduct = {
                    id: productId,
                    productName: req.body.productName,
                    price: req.body.price
                };
                return newProduct;
            }
            return i;
        });
        let arrayProducts = JSON.stringify(newArrayProducts, null, 2);
        fs.writeFileSync('./database/products.json', arrayProducts);
        res.send('Se a Modificado el Producto');
    },
    delete: function deleteProd(req, res) {
        let deletedProd = Number(req.params.id);
        let productNewFile = products.filter(function (i) {
            return (i.id != deletedProd);
        });
        let prodSave = JSON.stringify(productNewFile, null, 2);
        fs.writeFileSync('./database/products.json', prodSave);
        res.send('El producto fue eliminado correctamente');
    }
}

