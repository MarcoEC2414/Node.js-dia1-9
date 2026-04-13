// src/middlewares/verifyToken.ts
import { Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { config } from '../config'
import { AuthRequest, esRestaurantePayload } from '../types/restaurante.types'

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // El token llega en el header "Authorization"
    const authHeader = req.headers['authorization']

    // Si no hay header de autorización, rechazar la petición
    if (!authHeader) {
      res.status(401).json({ error: 'Token no enviado' })
      return
    }

    // El header viene como "Bearer <token>"
    // split(' ') → ['Bearer', 'eyJhbGci...']
    // [1] toma solo el token
    const token = authHeader.split(' ')[1]

    // jwt.verify() verifica la firma Y decodifica el payload en un solo paso
    // Si el token está alterado o expiró lanza JsonWebTokenError / TokenExpiredError
    const decoded = verify(token, config.jwtSecret)

    // Guardamos la info del usuario en req para que el controlador la use
    // esRestaurantePayload valida la forma del payload antes de asignar
    if (!esRestaurantePayload(decoded)) {
      res.status(401).json({ error: 'Payload del token inválido' })
      return
    }
    req.user = decoded

    // next() va DESPUÉS de verificar — si estuviera antes el controlador
    // se ejecutaría aunque el token fuera inválido
    next()

  } catch (error) {
    // Cubre tokens inválidos, expirados o malformados
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

export default verifyToken
