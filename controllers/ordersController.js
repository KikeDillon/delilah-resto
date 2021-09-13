const { getModel } = require('../database/index.js');

module.exports = {
    show: async function showProducts(req, res) {
        try {
            const data = await getModel('Product').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    history: async function showUserOrders(req, res) {
        try {
            const data = await getModel('Order').findAll({
                where: {
                    userId: req.params.id
                }
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send('El usuario no tiene pedidos registrados.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    create: async function createOrder(req, res) {
        try {
            const produc = await getModel('Product').findOne({
                where: {
                    id: req.body.productId
                }
            });
            const newOrder = getModel('Order');
            const uslog = await getModel('User').findOne({
                where: {
                    id: req.user.id
                }
            });
            const data = new newOrder({
                userId: uslog.id,
                productId: req.body.productId,
                quantity: req.body.quantity,
                subtotal: req.body.quantity * Number(produc.price),
                closed: req.body.closed
            });
            const saved = await data.save()
            res.status(201).send(saved);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    }
    ,
    edit: async function modOrder(req, res) {
        try {
            const idOrd = Number(req.params.id)
            const ord = getModel('Order');
            const data = await ord.findByPk(idOrd);
            const produc = await getModel('Product').findOne({
                where: {
                    id: data.productId
                }
            });
            const priceProd = Number(produc.price);
            if(data.closed == true){
                return res.send('Este pedido ya está cerrado, no puede modificarlo')
            }else{
            const newProduct = await data.update({
                productId: data.productId,
                quantity: req.body.quantity,
                subtotal: req.body.quantity * priceProd,
                closed: req.body.closed
            });
            await newProduct.save();
            res.send('Pedido actualizado').status(200);
        }} catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    },
    delete: async function deleteOrd(req, res) {
        try {
            const idOrd = Number(req.params.id)
            const ord = await getModel('Order');
            const data = await ord.findByPk(idOrd);
            if(data.closed == true){
                return res.send('Este pedido ya está cerrado, no puede eliminarlo')
            }else{
            await data.destroy();
            res.send('Pedido eliminado').status(200);
        }} catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    }

}