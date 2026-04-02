const Plato = require('../models/plato');

// 1. Obtener todo el menú
const obtenerMenu = async (req, res) => { 
    try { 
        const platos = await platoService.obtenerTodos(); 
        res.status(200).json(platos); 
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    } 
}; 
  
const buscarPlato = async (req, res) => { 
    try { 
        const { id } = req.params; 
        const plato = await platoService.buscarPorId(id); 
        if (!plato) { 
            return res.status(404).json({ error: 'Plato no encontrado' }); 
        } 
        res.status(200).json(plato); 
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    } 
};


//3.Crear plato
// importar el service
const platoService = require('../services/plato.service'); 

// agregarPlato — async porque usa MongoDB 
const agregarPlato = async (req, res) => { 
    try { 
        const { nombre, precio, stock, categoria } = req.body; 

        if (!nombre || !precio) { 
            return res.status(400).json({ 
                error: 'nombre y precio son obligatorios' 
            }); 
        } 

        // llamar al service
        const nuevo = await platoService.crear(req.body);

        res.status(201).json({ 
            mensaje: 'Plato creado', 
            plato: nuevo 
        }); 

    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    } 
};


// 4. Eliminar plato
  
const eliminarPlato = async (req, res) => { 
    try { 
        const { id } = req.params; 
        const plato = await platoService.eliminar(id); 
        if (!plato) { 
            return res.status(404).json({ error: 'Plato no encontrado' }); 
        } 
        res.status(200).json({ mensaje: 'Plato eliminado', plato }); 
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    } 
};
// 5. Actualizar plato
const actualizarPlato = async (req, res) => { 
    try { 
        const { id } = req.params; 
        const plato = await platoService.actualizar(id, req.body); 
        if (!plato) { 
            return res.status(404).json({ error: 'Plato no encontrado' }); 
        } 
        res.status(200).json({ mensaje: 'Plato actualizado', plato }); 
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }  
}; 

// ESTA ES LA PARTE CLAVE: Exportamos todas las funciones juntas
module.exports = {
    obtenerMenu,
    buscarPlato,
    agregarPlato,
    eliminarPlato,
    actualizarPlato
};