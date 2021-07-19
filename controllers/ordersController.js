const fs = require('fs');
const products = require('../database/products.json');
const orders = require('../database/orders.json');

module.exports = {
    show: function showProducts(req, res) {
        res.send(products);
    },
    create: function createOrder(req, res) {
        if (orders !== null || orders !== undefined) {
            let lastOrder = orders.pop();
            orders.push(lastOrder);
            detallePedido = [];
            let pedido = {
                productId: req.body.productId,
                quantity: req.body.quantity,
            };

            detallePedido.push(pedido);
            let newOrder = {
                id: lastOrder.id + 1,
                userId: req.headers.idlog,
                detailOrder: detallePedido,
                orderType: 1,
                paymentType: req.body.paymentType,
                closed: false
            };
            let ordUser = orders.find(function (i) {
                return req.body.userId == i.userId;
            });
            if (!ordUser) {
                orders.push(newOrder);
                let newOrderSTR = JSON.stringify(orders, null, 2);
                fs.writeFileSync('./database/orders.json', newOrderSTR);
            } else {

                return res.send('Su pedido ya existe')
            }
        } else {

            return res.send('Su pedido se ha cargado correctamente')
        }
    },
    edit: function editOrder(req, res) {
        let orderId = Number(req.params.id);
        let addOrder = {
            productId: req.body.productId,
            quantity: req.body.quantity
        };
        /*let newOrder = orders.find(function (i) {
            return i.id == orderId
        });
        if (newOrder != undefined) {
          newOrder.detailOrder.push(addOrder);
        };
        let newArrayOrders = orders.map(function (i) {
            if (i.id == orderId) {
                return newOrder;
            }
            return i;
        });
        let arrayOrders = JSON.stringify(newArrayOrders, null, 2);
        fs.writeFileSync('./database/orders.json', arrayOrders);
        res.send('Se a Modificado el Pedido');}*/
        let newOrder = orders.find(function (i) {
            return i.id == orderId
        });
        if (newOrder != undefined && newOrder.closed == false) {
            newOrder.detailOrder.push(addOrder);
        };
        newOrder.orderType = req.body.orderType;
        newOrder.paymentType = req.body.paymentType;
        newOrder.closed = req.body.closed;
        let newArrayOrders;
        if(newOrder.closed == false){
            newArrayOrders = orders.map(function (i) {
            if (i.id == orderId) {
                return newOrder;
            }
            return i;
        })}else{
            return res.send('Su pedido ya esta cerrado, no puede modificarlo')
        };
        try {
            fs.writeFileSync('./database/orders.json', JSON.stringify(newArrayOrders, null, 2));
            res.send('Se ha Modificado el Pedido');
            
        } catch (error) {
            console.log(error)
            res.send('Error algo anda mal');
        }
        //let newOrders = JSON.stringify(newArrayOrders, null, 2);
    },
    delete: function deleteOrd(req, res) {
        let deletedOrd = Number(req.params.id);
        let orderNewFile = orders.filter(function (i) {
            return (i.id != deletedOrd);
        });
        let ordSave = JSON.stringify(orderNewFile, null, 2);
        fs.writeFileSync('./database/orders.json', ordSave);
        res.send('El pedido fue eliminado correctamente');
    },
    showCart: function showC(req, res){

    }
}

/*for (const order of orders) {
    if(order.closed == true){
        res.send('enviar a pago')
    }
}*/