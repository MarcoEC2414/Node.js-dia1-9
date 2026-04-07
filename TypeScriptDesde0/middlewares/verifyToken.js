// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // El token llega en el header "Authorization"
    const authHeader = req.headers['authorization'];

    // Si no hay header de autorización, rechazar la petición
    if (!authHeader) {
      return res.status(401).json({ error: 'Token no enviado' });
    }

    // El header viene como "Bearer <token>"
    // split(' ') → ['Bearer', 'eyJhbGci...']
    // [1] toma solo el token
    const token = authHeader.split(' ')[1];

    // jwt.verify() verifica la firma Y decodifica el payload en un solo paso
    // Si el token está alterado o expiró lanza JsonWebTokenError / TokenExpiredError
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'clave_desarrollo'
    );

    // Guardamos la info del usuario en req para que el controlador la use
    req.usuario = decoded;

    // next() va DESPUÉS de verificar — si estuviera antes el controlador
    // se ejecutaría aunque el token fuera inválido
    next();

  } catch (error) {
    // Cubre tokens inválidos, expirados o malformados
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;