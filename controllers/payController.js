const payments = require('../database/paymentTypes.json');
const fs = require('fs');

module.exports = {
    show: function showPayment(req, res) {
        res.send(payments)
    },

    create: function createPayment(req, res) {
        if (payments !== null || payments !== undefined) {
            let lastPayment = payments.pop();
            payments.push(lastPayment);
            let newPayment = {
                id: lastPayment.id + 1,
                type: req.body.type,
                available: true
            };
            let pay = payments.find(function (i) {
                return newPayment.type == i.type;
            });
            if (!pay) {
                payments.push(newPayment);
                let newPaymentSTR = JSON.stringify(payments, null, 2);
                fs.writeFileSync('./database/paymentTypes.json', newPaymentSTR);
                return res.send('Se ha cargado una nueva forma de pago')
            } else {
                return res.send('La forma de pago ya existe')
            }
        }
    },
    modify: function modPayment(req, res) {
        let paymentId = Number(req.params.id);
        let newArrayPayment = payments.map(function (i) {
            if (i.id == paymentId) {
                let newPayment = {
                    id: paymentId,
                    type: req.body.type,
                    available: req.body.available
                };
                return newPayment;
            }
            return i;
        });
        let arrayPayments = JSON.stringify(newArrayPayment, null, 2);
        fs.writeFileSync('./database/paymentTypes.json', arrayPayments);
        res.send('Se ha modificado la forma de pago');
    },
    delete: function deleteProd(req, res) {
        let deletedPay = Number(req.params.id);
        let paymentNewFile = payments.filter(function (i) {
            return (i.id != deletedPay);
        });
        let paySave = JSON.stringify(paymentNewFile, null, 2);
        fs.writeFileSync('./database/paymentTypes.json', paySave);
        res.send('La forma de pago fue eliminada correctamente');
    }
}