// app.js — solo configuración y conexión 
const express = require('express'); 
const menuRouter = require('./routes/menu.routes'); 
const { logger } = require('./middlewares/logger'); 
const app = express(); 
const PORT = 3000;
const conectarDB = require('./database/connection'); 
const Plato = require('./models/plato');
// Conectar a MongoDB antes de levantar el servidor 
conectarDB(); 


app.use(express.json()); 
app.use(logger);
// Conectar el router del menú 
app.use('/menu', menuRouter); 
// Ruta de bienvenida 
app.get('/', (req, res) => { 
    res.status(200).json({ 
        mensaje: 'Restaurante Node API', 
        version: '2.0.0', 
        rutas: ['/menu'] 
    }); 
}); 

  
// ... resto del app.js sin cambios
app.listen(PORT, () => { 
    console.log(`Restaurante corriendo en http://localhost:${PORT}`); 
}); 