const express = require('express');
const app = express();
const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');
const { config } = require('dotenv');
const { connect } = require('./database/index.js');
const helmet = require('helmet');

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

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));


//RUTAS
const adminRouter = require('./routers/adminRouter');
const userRouter = require('./routers/userRouter');
const ordersRouter = require('./routers/ordersRouter');

app.use(adminRouter);
app.use(userRouter);
app.use(ordersRouter);

function loadSwaggerInfo(app){
      try{
        const doc = yaml.load(fs.readFileSync('./spec.yml', 'utf-8'));
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc))
      } catch(e){
        console.log(e);
      }
}

async function main(){
  config();

  const PORT = process.env.PORT;
  const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_HOST,
  } = process.env;
  await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);
  
  
  app.listen(PORT, function(req, res){
      loadSwaggerInfo(app);
      console.log('Servidor corriendo en puerto 3001');
  });
}

main();