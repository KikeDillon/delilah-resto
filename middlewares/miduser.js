const users = require('../database/users.json');

module.exports = {
    //un middleware recibe 3 parametros (req, res, next - callback)

    validar: function validarUsuario(req, res, next) {
        let idLog = req.headers.idlog;
        let idEnc = users.filter(function (i) {
            return i.id == idLog
        });
        if(idEnc != undefined){
            next()
        }
        //if (idEnc != undefined) {
        /*for (const user of users) {
            if (user.id == idLog) {
                next();
            }*/

            //si sale bien que siga. el next tiene que ir si o si porque sino no funciona el middleware
            return res.send('No tiene acceso a este sitio');
        }
    ,

    admin: function validarAdmin(req, res, next) {
        let idLog = req.headers.idlog;
        let idEnc;
        for (const user of users) {
            if (user.id == idLog) {
                idEnc = user;
            } else {
                continue;
            }
        }
        if (idEnc.userType == 1) {
            next()

        } else {
            return res.send('No tiene permiso para esta accion')
        }
    },

    error: function (err, req, res, next) {
        if (err !== undefined) {
            if (
                err.message === 'No tiene acceso a este sitio' //message guarda el atributo de newError
            ) {
                res.status(500).send('Something broke!');
            } else if (err.message === 'invalid card') {
                res.status(406).send('error de tarjeta')
            }
        }
    },

    tarjeta: function validarTarjeta(req, res, next) {
        if (req.body.creditCardNumber === null) {
            next(new Error('invalid card'))
        }
        next();
    }




}