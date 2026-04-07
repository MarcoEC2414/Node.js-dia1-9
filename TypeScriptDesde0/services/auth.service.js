// services/auth.service.js
// Día 6 — jwtSecret viene de config, no hardcodeado
const AuthUser       = require('../models/auth.model');
const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
const { jwtSecret }  = require('../config');

class AuthService {

  async register(data) {
    const { email, password } = data;
    const saltRounds     = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const usuario = new AuthUser({ email, password: hashedPassword });
    return await usuario.save();
  }

  async login(data) {
    const { email, password } = data;
    const usuario = await AuthUser.findOne({ email });
    if (!usuario) throw new Error('Usuario no encontrado');

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) throw new Error('Contraseña incorrecta');

    const payload = { email: usuario.email };
    return this.generarToken(payload);
  }

  async generarToken(payload) {
    // jwtSecret viene del .env a través de config/index.js
    // nunca más un string hardcodeado en el código
    return jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
  }
}

module.exports = new AuthService();