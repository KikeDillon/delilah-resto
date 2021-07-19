const fs = require('fs');
const users = require('../database/users.json');

module.exports = {

    show: function showUsers(req, res){
        res.send(users)
    },

    register: function userRegister(req, res){
        if (users !== null || users !== undefined){
            let lastUser = users.pop();
            users.push(lastUser);
            let newUser = {
                id : lastUser.id + 1,
                userName : req.body.userName,
                fullName : req.body.fullName,
                email : req.body.email,
                phone : req.body.phone,
                address : req.body.address,
                password : req.body.password,
                usertype : 0
            };
            let user = users.find (function(i){                    
                return req.body.email == i.email;           
            });
            if (!user){         
                users.push (newUser);
                let newUserSTR = JSON.stringify(users,null,2);
                fs.writeFileSync('./database/users.json', newUserSTR);
                res.send('Registro exitoso')
            }else{

                return res.send('El email ya se encuentra registrado')
            }
        }
    },
    login: function userLogin(req, res){
            let user = users.find (function(i){                    
                return req.body.email == i.email;           
            });
            let password = users.find(function(i){
                return req.body.password === i.password;
            });

            if (user && password){                                             
                res.send('Bienvenido ' + user.fullName)
    }else if(!user){
        res.send('El usuario no existe')
    }else if(!password){
        res.send('La contraseña es incorrecta')
    }
  },
  edit: function userEdit(req, res){
    let userId = Number(req.params.id);
    let newArrayUsers = users.map(function (i) {
        if (i.id == userId) {
            let newUser = {
                userName : req.body.userName,
                fullName : req.body.fullName,
                email : req.body.email,
                phone : req.body.phone,
                address : req.body.address,
                password : req.body.password,
            };
            return newUser;
        }
        return i;
    });
    let arrayUsers = JSON.stringify(newArrayUsers, null, 2);
    fs.writeFileSync('./database/users.json', arrayUsers);
    res.send('Se ha/n modificado lo/s datos del usuario correctamente');
},
delete: function deleteProd(req, res) {
    let deletedUser = Number(req.params.id);
    let userNewFile = users.filter(function (i) {
        return (i.id != deletedUser);
    });
    let userSave = JSON.stringify(userNewFile, null, 2);
    fs.writeFileSync('./database/users.json', userSave);
    res.send('El usuario fue eliminado correctamente');
}
}