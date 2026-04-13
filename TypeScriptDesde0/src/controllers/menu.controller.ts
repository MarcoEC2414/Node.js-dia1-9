// src/controllers/menu.controller.ts
// Día 3 → estructura con Express
// Día 4 → conectado a MongoDB mediante PlatoService
// Día 5 → rutas POST/PUT/DELETE protegidas con verifyToken (en el router)
// Día 8 → filtrarPorCategoria agregado

import { Request, Response } from 'express'
import { platoService } from '../services/plato.service'
import { CreatePlatoDto, UpdatePlatoDto } from '../types/restaurante.types'

// ──────────────────────────────────────────────
// GET /menu
// Devuelve todos los platos del menú
// Equivalente a mostrarMenu() del Sprint 0
// ──────────────────────────────────────────────
export const obtenerMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const platos = await platoService.obtenerTodos()
    res.status(200).json(platos)
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error interno'
    res.status(500).json({ error: mensaje })
  }
}

// ──────────────────────────────────────────────
// GET /menu/buscar?nombre=xxx
// Búsqueda parcial por nombre (case-insensitive)
// Equivalente a buscarPlatoPorNombre() del Sprint 0
// ──────────────────────────────────────────────
export const buscarPlato = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre } = req.query
    if (!nombre) {
      res.status(400).json({ error: 'Parámetro nombre requerido' })
      return
    }

    const platos = await platoService.buscarPorNombre(nombre as string)
    if (!platos || platos.length === 0) {
      res.status(404).json({ error: `Plato '${nombre}' no encontrado` })
      return
    }

    res.status(200).json(platos)
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error interno'
    res.status(500).json({ error: mensaje })
  }
}

// ──────────────────────────────────────────────
// GET /menu/:id
// Busca un plato por su _id de MongoDB
// ──────────────────────────────────────────────
export const obtenerPlatoPorId = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const plato = await platoService.buscarPorId(id)

    // findById devuelve null si no existe
    if (!plato) {
      res.status(404).json({ error: 'Plato no encontrado' })
      return
    }

    res.status(200).json(plato)
  } catch (error: unknown) {
    // Un _id con formato incorrecto lanza CastError → llega aquí como 500
    const mensaje = error instanceof Error ? error.message : 'Error interno'
    res.status(500).json({ error: mensaje })
  }
}

// ──────────────────────────────────────────────
// POST /menu  🔒 requiere verifyToken
// Agrega un plato nuevo al menú
// Equivalente a agregarPlato() del Sprint 0
// ──────────────────────────────────────────────
export const agregarPlato = async (req: Request<{}, {}, CreatePlatoDto>, res: Response): Promise<void> => {
  try {
    const { nombre, precio } = req.body

    if (!nombre || !precio) {
      res.status(400).json({ error: 'nombre y precio son obligatorios' })
      return
    }

    const nuevo = await platoService.crear(req.body)
    res.status(201).json({ mensaje: 'Plato creado', plato: nuevo })
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error interno'
    res.status(500).json({ error: mensaje })
  }
}

// ──────────────────────────────────────────────
// PUT /menu/:id  🔒 requiere verifyToken
// Actualiza precio, stock u otros campos de un plato
// Equivalente a actualizarStock() del Sprint 0
// ──────────────────────────────────────────────
export const actualizarPlato = async (req: Request<{ id: string }, {}, UpdatePlatoDto>, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const plato = await platoService.actualizar(id, req.body)

    if (!plato) {
      res.status(404).json({ error: 'Plato no encontrado' })
      return
    }

    res.status(200).json({ mensaje: 'Plato actualizado', plato })
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error interno'
    res.status(500).json({ error: mensaje })
  }
}

// ──────────────────────────────────────────────
// DELETE /menu/:id  🔒 requiere verifyToken
// Elimina un plato del menú
// ──────────────────────────────────────────────
export const eliminarPlato = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const plato = await platoService.eliminar(id)

    if (!plato) {
      res.status(404).json({ error: 'Plato no encontrado' })
      return
    }

    res.status(200).json({ mensaje: 'Plato eliminado', plato })
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error interno'
    res.status(500).json({ error: mensaje })
  }
}

// ──────────────────────────────────────────────
// GET /menu/categoria/:categoria
// Día 8 — Filtro por categoría (funcionalidad nueva)
// Ruta libre — no requiere token
// ──────────────────────────────────────────────
export const filtrarPorCategoria = async (req: Request<{ categoria: string }>, res: Response): Promise<void> => {
  try {
    const { categoria } = req.params
    const platos = await platoService.buscarPorCategoria(categoria)
    // Devuelve [] si no hay platos de esa categoría — nunca 404
    res.status(200).json(platos)
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error interno'
    res.status(500).json({ error: mensaje })
  }
}
