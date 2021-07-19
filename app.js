const express = require('express');
const app = express();
const fs = require('fs');
const validaciones = require('./middlewares/miduser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Acamica API',
        version: '1.0.0'
      }
    },
    apis: ['./app.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

/*el middleware hace que no avance el codigo antes de pasar por la validacion.
todo lo que ponga despues del .use no va a pasar por la validacion*/
//app.use(validaciones.validar); //para hacer validaciones grales para todos los pedidos.

app.use(express.json()); //captura datos json
app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));
//app.use(validaciones.validar);


//RUTAS
const adminRouter = require('./routers/adminRouter');
const userRouter = require('./routers/userRouter');
const ordersRouter = require('./routers/ordersRouter');

app.use(adminRouter);
app.use(userRouter);
app.use(ordersRouter);


//app.get('/', middleware, handler); para middlewares a nivel local
app.use(validaciones.error);

function loadSwaggerInfo(app){
      try{
        const doc = yaml.load(fs.readFileSync('./spec.yml', 'utf-8'));
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc))
      } catch(e){
        console.log(e);
      }
}


app.listen(3001, function(req, res){
    loadSwaggerInfo(app);
    console.log('Servidor corriendo en puerto 3001');
})