import { Categoria } from './restaurante.types' 

const categoriaDeHoy: Categoria = Categoria.PRINCIPAL 
console.log(categoriaDeHoy)  // imprime: 'Segundos'

const todasLasCategorias = Object.values(Categoria) 
console.log(todasLasCategorias) 
// ['Entradas', 'Segundos', 'Postres', 'Bebidas'] 