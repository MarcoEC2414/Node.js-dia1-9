let menu = [
    {
        id: 1,
        nombre: 'Lomo saltado',
        categoria: 'segundos',
        precio: 18,
        stock: 3,
        disponible: true
    },
    {
        id: 2,
        nombre: 'Arroz con pollo',
        categoria: 'segundos',
        precio: 12,
        stock: 5,
        disponible: true
    },
    {
        id: 3,
        nombre: 'Sopa',
        categoria: 'entradas',
        precio: 8,
        stock: 10,
        disponible: true
    }
];

// Equivalente a mostrarMenu() del Sprint 0
exports.obtenerMenu = (req, res) => {
    res.status(200).json(menu);
};

// Equivalente a buscarPlatoPorNombre() del Sprint 0
exports.buscarPlato = (req, res) => {
    const { nombre } = req.query;

    if (!nombre) {
        return res.status(400).json({ error: 'Parámetro nombre requerido' });
    }

    const plato = menu.find(p =>
        p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );

    if (!plato) {
        return res.status(404).json({ error: `Plato '${nombre}' no encontrado` });
    }

    res.status(200).json(plato);
};

// Equivalente a agregarPlato() del Sprint 0
exports.agregarPlato = (req, res) => {
    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Se requieren nombre y precio' });
    }

    const nuevo = {
        id: menu.length + 1,
        nombre,
        categoria: categoria || 'sin categoría',
        precio,
        stock: stock || 0,
        disponible: (stock || 0) > 0
    };

    menu.push(nuevo);

    res.status(201).json({
        mensaje: 'Plato agregado',
        plato: nuevo
    });
};

// Eliminar plato por id
exports.eliminarPlato = (req, res) => {
    const id = parseInt(req.params.id);

    const index = menu.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Plato no encontrado' });
    }

    const eliminado = menu.splice(index, 1)[0];

    res.status(200).json({
        mensaje: 'Plato eliminado',
        plato: eliminado
    });
};

// Actualizar stock de un plato — equivalente a actualizarStock() del Sprint 0 
exports.actualizarPlato = (req, res) => { 
    const id = parseInt(req.params.id); 
    const plato = menu.find(p => p.id === id); 
  
    if (!plato) { 
        return res.status(404).json({ error: 'Plato no encontrado' }); 
    } 
  
    const { precio, stock } = req.body; 
    if (precio !== undefined) plato.precio = precio; 
    if (stock  !== undefined) plato.stock  = stock; 
  
    res.status(200).json({ mensaje: 'Plato actualizado', plato }); 
}; 