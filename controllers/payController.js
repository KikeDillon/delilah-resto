const { getModel } = require('../database/index.js');

module.exports = {
    show: async function showPay(req, res){
        try {
            const data = await getModel('PaymentType').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    },

    create: async function createPay(req, res){
        const newProduct = getModel('PaymentType');
        const data = new newProduct({
                type : req.body.type,
                available : req.body.available
                });
        const saved = await data.save()
        res.status(201).send(saved);
    },
    modify: async function modPayment(req, res) {
        try{   const idPayment = Number(req.params.id)
            const pay = getModel('PaymentType');
            const data = await pay.findByPk(idPayment);
            const newPayment = await data.update(
                type = req.body,
                available = req.body
            );
            await newPayment.save();
            res.send('Forma de pago actualizada').status(200);
        }catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    },
    delete: async function deletePay(req, res) {
        try {
            const idPayment = Number(req.params.id)
            const pay = await getModel('PaymentType');
            const data = await pay.findByPk(idPayment);
            await data.destroy();
            res.send('Forma de pago eliminada').status(200);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    }
}