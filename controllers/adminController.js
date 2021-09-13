const { getModel } = require('../database/index.js');
const { storeObjectInCache, invalidateCache } = require('../middlewares/cache');

module.exports = {
    show: async function showProducts(req, res){
        try {
            const data = await getModel('Product').findAll();
            storeObjectInCache(req, data);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    },
    create: async function createProduct(req, res){
       try{
        const newProduct = getModel('Product');
        const data = new newProduct({
                productName : req.body.productName,
                price : req.body.price,
                });
        const saved = await data.save();
        invalidateCache({
            method: 'GET',
            baseUrl: req.baseUrl,
          });
        res.status(201).send(saved);
    }catch(error){
        console.error(error)
        res.send('Algo salió mal').status(500);
    }},
    modify: async function modProduct(req, res) {
     try{   const idProduct = Number(req.params.id)
        const prod = getModel('Product');
        const data = await prod.findByPk(idProduct);
        const newProduct = await data.update(
            productName = req.body,
            price = req.body
        );
        await newProduct.save();
        invalidateCache({
            method: 'GET',
            baseUrl: req.baseUrl,
          });
        res.send('Producto actualizado').status(200);
    }catch (error) {
        console.error(error)
        res.send('Algo salió mal').status(500);
    }},

    delete: async function deleteProd(req, res) {
        try {
            const idProduct = Number(req.params.id)
            const prod = await getModel('Product');
            const data = await prod.findByPk(idProduct);
            await data.destroy();
            res.send('Producto eliminado').status(200);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    }
}

