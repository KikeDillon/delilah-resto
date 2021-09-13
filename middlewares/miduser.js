module.exports = {

    admin: function validarAdmin(req, res, next) {
            if (req.user.userType == 1) {
            next()
        } else {
            return res.send('No tiene permiso para esta accion')
        }
    }
}