const { getModel } = require('../database/index.js');

module.exports = {
    show: async function showProducts(req, res) {
        try {
            const data = await getModel('UserAddress').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    create: async function createAddress(req, res){
       try{ const newAddress = getModel('UserAddress');
        const uslog = await getModel('User').findOne({
            where: {
                id: req.user.id
            }
        });
        const data = new newAddress({
                userId : uslog.id,
                address : req.body.address,
                });
        const saved = await data.save();
        res.status(201).send(saved);
    }catch(error){
        console.error(error)
        res.send('Algo salió mal').status(500);
    }}
    ,
    edit: async function modAddress(req, res) {
        try{   const idAddress = Number(req.params.id)
           const add = getModel('UserAddress');
           const data = await add.findByPk(idAddress);
           const newAddress = await data.update({
               userId : data.userId,
               address : req.body.address
           });
           await newAddress.save();
           res.send('Domicilio actualizado').status(200);
       }catch (error) {
           console.error(error)
           res.send('Algo salió mal').status(500);
       }},
    delete: async function deleteAdd(req, res) {
        try {
            const idAddress = Number(req.params.id)
            const add = await getModel('UserAddress');
            const data = await add.findByPk(idAddress);
            await data.destroy();
            res.send('Domicilio eliminado').status(200);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    }
    }