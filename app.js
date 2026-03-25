console.log("ESTE ES MI DIA 1");
const menu = [
    { id: 1, nombre: "Ceviche", precio: 25, categoria: "Entradas" },
    { id: 2, nombre: "Lomo Saltado", precio: 30, categoria: "Segundos" },
    { id: 3, nombre: "Chicha Morada", precio: 10, categoria: "Bebidas" }
];
const mostrarMenu = () => {
    console.log("Mostrando menu")
    console.table(menu);
};

mostrarMenu();

console.log("Directorio actual:", __dirname);
