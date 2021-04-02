const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./src/database/config');
require('dotenv').config();

const app = express();

//Base de datos
dbConnection();

//Definiendo el puerto a escuchar
const PORT = process.env.PORT || 4000;

//Habilitando cors para cualquier dominio
app.use(cors());

//Importación de rutas
const authRoutes = require('./src/routes/auth');
const eventsRoutes = require('./src/routes/events');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Directorio público 
app.use( express.static('public') );

//Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

//Levantando el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});