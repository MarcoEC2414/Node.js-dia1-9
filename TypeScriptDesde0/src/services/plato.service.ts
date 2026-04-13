// src/services/plato.service.ts
// Día 4 — Capa de acceso a datos del menú
// Concentra TODAS las operaciones con MongoDB.
// El controlador nunca toca Mongoose directamente.
import { Plato, CreatePlatoDto } from '../types/restaurante.types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PlatoModel = require('../../models/plato.model')

export class PlatoService {

  // Equivalente a agregarPlato() del Sprint 0
  async crear(data: CreatePlatoDto): Promise<Plato> {
    const plato = new PlatoModel(data)
    return await plato.save()
  }

  // Equivalente a mostrarMenu() del Sprint 0
  async obtenerTodos(): Promise<Plato[]> {
    return await PlatoModel.find({})
  }

  // Buscar por _id de MongoDB
  async buscarPorId(id: string): Promise<Plato | null> {
    return await PlatoModel.findById(id)
    // Devuelve null si no existe → el controlador responde 404
  }

  // Buscar por nombre (búsqueda parcial, case-insensitive)
  async buscarPorNombre(nombre: string): Promise<Plato[]> {
    return await PlatoModel.find({
      nombre: { $regex: nombre, $options: 'i' }
    })
  }

  // { new: true } → devuelve el documento DESPUÉS de la modificación
  // Sin esto el cliente recibe los datos ANTES de actualizar (Bug 3 del Día 8)
  async actualizar(id: string, data: Partial<CreatePlatoDto>): Promise<Plato | null> {
    return await PlatoModel.findByIdAndUpdate(id, data, { new: true })
  }

  async eliminar(id: string): Promise<Plato | null> {
    return await PlatoModel.findByIdAndDelete(id)
  }

  // Día 8 — Filtro por categoría (funcionalidad nueva)
  async buscarPorCategoria(categoria: string): Promise<Plato[]> {
    return await PlatoModel.find({ categoria })
  }
}

export const platoService = new PlatoService()
