//------------------------
// app.js — Punto de entrada del restaurante
 
const nombreRestaurante = 'El Restaurante Node';
const version = '1.0.0';
 
function mostrarBienvenida(nombre, version) {
    return `${nombre} v${version} — Backend iniciado`;
}
 
const menu = [
    { id: 1, nombre: 'Lomo saltado', precio: 18, stock: 3 },
    { id: 2, nombre: 'Arroz con pollo', precio: 12, stock: 5 },
    { id: 3, nombre: 'Sopa', precio: 8, stock: 10 }
];
 
function mostrarMenu(menu) {
    console.log('--- MENÚ DEL RESTAURANTE ---');
       menu.forEach(plato => {
        console.log(`${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`);
    });
};
console.log(mostrarBienvenida(nombreRestaurante, version));
mostrarMenu(menu);




