const { getModel } = require('../database/index.js');

module.exports = {
    show: async function showCarrito(req, res) {
        try {
            const data = await getModel('Carrito').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    showOne: async function showOneCarrito(req, res) {
        try {
            const data = await getModel('Carrito').findOne({
                where: {
                    userId: req.params.id
                }
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send(`Carrito with ID ${req.params.id} does not exists.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    create: async function createCarrito(req, res) {
        try {
            const idLog = req.user.id;
            const userOrd = await getModel('Order').findAll({
                where: {
                    userId: req.user.id
                }
            });
            let ordersCld = userOrd.filter(function (i) {
                return (i.closed == true);
            })
            const totalProducts = ordersCld.reduce((total, ord) => (total = total + Number(ord.quantity)), 0);
            const totalPay = ordersCld.reduce((total, ord) => (total = total + Number(ord.subtotal)), 0);
            const newCarrito = getModel('Carrito');
            const data = new newCarrito({
                userId: idLog,
                totalProducts,
                totalPay,
                paymentType: req.body.paymentType,
                idAddress: req.body.idAddress,
                cartConfirmed: req.body.cartConfirmed,
                orderType: 1
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
            const idChart = Number(req.params.id);
            const ord = getModel('Carrito');
            const data = await ord.findByPk(idChart);
            const userOrd = await getModel('Order').findAll({
                where: {
                    userId: data.userId
                }
            });
            let ordersCld = userOrd.filter(function (i) {
                return (i.closed == true);
            })
            const totalProducts = ordersCld.reduce((total, ord) => (total = total + Number(ord.quantity)), 0);
            const totalPay = ordersCld.reduce((total, ord) => (total = total + Number(ord.subtotal)), 0);
            if (data.cartConfirmed == false) {
                const newCart = await data.update({
                    userId,
                    totalProducts,
                    totalPay,
                    paymentType: req.body.paymentType,
                    idAddress: req.body.idAddress,
                    cartConfirmed: req.body.cartConfirmed,
                    orderType
                });
                await newCart.save();
                res.send('Carrito actualizado').status(200);
            } else {
                res.send('Su compra ya fue confirmada, no puede modificarla.')
            }
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    },
    delete: async function deleteOrd(req, res) {
        try {
            const chart = await getModel('Carrito');
            const data = await chart.findByPk({
                where: {
                    userdId: req.user.id
                }
            });
            await data.destroy();
            res.send('Carrito eliminado').status(200);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    },
    ordType: async function modOrdType(req, res) {
        try {
            const idChart = Number(req.params.id)
            const ord = getModel('Carrito');
            const data = await ord.findByPk(idChart);
            const newOrderType = await data.update({
                userId,
                totalProducts,
                totalPay,
                paymentType,
                idAddress,
                orderType: req.body.orderType
            });
            await newOrderType.save();
            res.send('Pedido actualizado').status(200);

        } catch (error) {
            console.log(error)
            res.send('Error algo anda mal');
        }

    }
}