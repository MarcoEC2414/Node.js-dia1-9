const http = require('http');
const { URL } = require('url'); 

let menu = [ 
    { id: 1, nombre: 'Lomo saltado', categoria: 'segundos', precio: 18, stock: 3, disponible: true }, 
    { id: 2, nombre: 'Arroz con pollo', categoria: 'segundos', precio: 12, stock: 5, disponible: true }, 
    { id: 3, nombre: 'Sopa', categoria: 'entradas', precio: 8,  stock: 10, disponible: true } 
]; 

const PORT = 5000; 
const HOST = 'localhost'; 

const server = http.createServer((req, res) => { 
    try {
        // --- 1. LÓGICA PARA EL MÉTODO GET ---
        if (req.url.startsWith('/menu') && req.method === 'GET') { 
            const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`); 
            const nombre = parsedUrl.searchParams.get('nombre'); 

            if (nombre) { 
                const plato = menu.find(p => p.nombre.toLowerCase().includes(nombre.toLowerCase())); 

                if (!plato) { 
                    res.statusCode = 404; 
                    res.setHeader('Content-Type', 'application/json'); 
                    return res.end(JSON.stringify({ error: `Plato '${nombre}' no encontrado` })); 
                } 

                res.statusCode = 200; 
                res.setHeader('Content-Type', 'application/json'); 
                return res.end(JSON.stringify(plato)); 
            } 
            
            // Si no hay nombre, devolvemos todo el menú
            res.statusCode = 200; 
            res.setHeader('Content-Type', 'application/json'); 
            return res.end(JSON.stringify(menu)); 
        } 

        // --- 2. LÓGICA PARA EL MÉTODO POST (Separado del GET) ---
        if (req.url.startsWith('/menu') && req.method === 'POST') { 
            let body = ''; 

            req.on('data', chunk => { 
                body += chunk.toString(); 
            }); 

            req.on('end', () => { 
                try { 
                    const nuevoPlato = JSON.parse(body); 

                    if (!nuevoPlato.nombre || !nuevoPlato.precio) { 
                        res.statusCode = 400; 
                        res.setHeader('Content-Type', 'application/json');
                        return res.end(JSON.stringify({ error: 'Se requieren nombre y precio' })); 
                    } 

                    const plato = { 
                        id: menu.length + 1, 
                        nombre: nuevoPlato.nombre, 
                        categoria: nuevoPlato.categoria || 'sin categoría', 
                        precio: nuevoPlato.precio, 
                        stock: nuevoPlato.stock || 0, 
                        disponible: (nuevoPlato.stock || 0) > 0 
                    }; 
                    
                    menu.push(plato); 

                    res.statusCode = 201; 
                    res.setHeader('Content-Type', 'application/json'); 
                    res.end(JSON.stringify({ mensaje: 'Plato agregado correctamente', plato }));
                } catch (parseError) { 
                    res.statusCode = 400; 
                    res.setHeader('Content-Type', 'application/json'); 
                    res.end(JSON.stringify({ error: 'JSON inválido' })); 
                } 
            }); 
            return; // Importante para que no siga al 404 de abajo
        }

        // --- 3. SI NO ES NINGUNA DE LAS RUTAS ANTERIORES ---
        res.statusCode = 404; 
        res.setHeader('Content-Type', 'application/json'); 
        res.end(JSON.stringify({ error: 'Ruta no encontrada' })); 

    } catch (error) { 
        res.statusCode = 500; 
        res.setHeader('Content-Type', 'application/json'); 
        res.end(JSON.stringify({ error: 'Error interno del servidor' })); 
        console.error('Error:', error.message); 
    } 
}); 

server.listen(PORT, HOST, () => { 
    console.log(`Restaurante corriendo en http://${HOST}:${PORT}/menu`);
});