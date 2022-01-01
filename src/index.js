const express = require('express');
const morgan = require('morgan');

//inicializar
const app = express();

//configuraciones
app.set('port',process.env.PORT || 5000); 
app.set('appName','Aroma')

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req,res,next) =>{
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/productos',require('./routes/productos'));
app.use('/grupos',require('./routes/grupos'));
app.use('/categorias',require('./routes/categorias'));
app.use('/mesas',require('./routes/mesas'));

//empezar servidor
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
});