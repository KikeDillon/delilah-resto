const { encript } = require('../middlewares/midjwt.js');
const models = require('../database');

module.exports = {

    show: async function showUsers(req, res) {
        if (req.user.userType == 1) {
            const data = await models.getModel('User').findAll();
            return res.status(200).send(data);
        } else {
            return res.status(500).send('No esta autorizado.');
        }
    },
    register: async function userRegister(req, res) {
        try {
            const newUser = models.getModel('User');
            const data = await newUser.create({
                userName: req.body.userName,
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: encript(req.body.password),
                userType: 0,
                suspended: false
            });
            const contName = await getModel('User').findOne({
                where: {
                    userName: req.body.userName
                }
            });
            const contEmail = await getModel('User').findOne({
                where: {
                    userName: req.body.email
                }
            });
            if(!contName && !contEmail){
            res.status(201).send(data);
        }else{
            res.send('El usuario y/o email ya existe')
        }
        } catch (error) {
            console.error(error)
            res.status(500).send('Los datos cargados ya están registrados o no son correctos');
        }
    }
    ,
    login: function userLogin(req, res) {
        try{
        res.status(200).send({
            status: 'Bienvenido/a ' + req.body.userName,
            token: req.token
        })
    }catch(error){
        console.log(error);
        res.send('Algo no salió bien').status(500);
    }
    },
    edit: async function modUser(req, res) {
        try {
            const idUser = Number(req.params.id)
            const user = models.getModel('User');
            const data = await user.findByPk(idUser);
            const newUser = await data.update({
                userName: data.userName,
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: encript(req.body.password),
                userType: 0
            });
            await newUser.save();
            res.send('Usuario actualizado').status(200);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    },
    admin: async function adminUser(req, res){
        try {
            const idUser = Number(req.params.id)
            const user = models.getModel('User');
            const data = await user.findByPk(idUser);
            const newUser = await data.update({
                userType: req.body.userType,
                suspended: req.body.suspended
            });
            await newUser.save();
            res.send('Usuario actualizado').status(200);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    },
    delete: async function deleteUser(req, res) {
        try {
            const idUser = Number(req.params.id)
            const prod = await models.getModel('User');
            const data = await prod.findByPk(idUser);
            await data.destroy();
            res.send('Usuario eliminado').status(200);
        } catch (error) {
            console.error(error)
            res.send('Algo salió mal').status(500);
        }
    }
}
