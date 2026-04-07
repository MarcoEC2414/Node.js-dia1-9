
export enum Categoria { 
  ENTRADA   = 'Entradas', 
  PRINCIPAL = 'Segundos', 
  POSTRE    = 'Postres', 
  BEBIDA    = 'Bebidas' 
} 

export interface Plato { 
  _id:        string   // generado por MongoDB 
  nombre:     string 
  categoria:  Categoria 
  precio:     number 
  stock:      number 
  disponible: boolean  // calculado según el stock 
}

//POST/MENU
export interface CreatePlatoDto { 
  nombre:    string 
  categoria: Categoria 
  precio:    number 
  stock:     number 
  // Sin _id ni disponible — los genera el servidor 
} 

//GET/MENU
export interface PlatoResponseDto { 
  _id:        string 
  nombre:     string 
  categoria:  Categoria 
  precio:     number 
  stock:      number 
  disponible: boolean 
}

//------------------------------------------

export interface User { 
  _id:      string 
  email:    string 
  password: string  // siempre hasheado, NUNCA texto plano 
} 
  
export interface RegisterDto { 
  email:    string 
  password: string 
} 
  
export interface LoginDto { 
  email:    string 
  password: string 
} 
  
export interface LoginResponseDto { 
  token:   string 
  message: string 
} 

