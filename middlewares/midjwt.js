const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
const { getModel } = require('../database/index.js');

function encript(secret='') {
  return createHmac('sha256', secret).digest('hex');
}

function authorize(req, res, next) {
    const { JWT_SECRET } = process.env;
    console.log(req.headers);
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    console.log(token);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.suspended == true) {
        console.log(err);
        res.status(401).send('You are not authorized.');
      } else {
        req.user = decoded;
        next();
      }
    });
  }


  async function authenticate(req, res, next) {
    try{
    const { JWT_SECRET } = process.env;
    const { userName, password } = req.body;
    const User = getModel('User');
    const loginUser = await User.findOne({
      where: {
        userName,
        password: encript(password),
      },
    });
    if (loginUser) {
      req.token = jwt.sign({
        id: loginUser.id,
        userName: loginUser.userName,
        email: loginUser.email,
        userType: loginUser.userType,
        suspended: loginUser.suspended
      }, JWT_SECRET);
      next();
    } else {
      res.status(403).send('invalid credentials or suspended user');
    }
  }catch(error){
    console.log(error);
    res.send('No sé que pasa').status(444);
  }
  }


module.exports = {
  authorize,
  authenticate,
  encript,
}

