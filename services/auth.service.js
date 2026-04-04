// services/auth.service.js
const AuthUser = require('../models/auth.model');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');

class AuthService {

  // ──────────────────────────────────────────────
  // REGISTRO — encripta la contraseña y guarda el admin
  // ──────────────────────────────────────────────
  async register(data) {
    const { email, password } = data;

    // 10 salt rounds es el estándar de la industria
    const saltRounds     = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Guardamos el HASH, nunca la contraseña original
    const usuario = new AuthUser({ email, password: hashedPassword });
    return await usuario.save();
  }

  // ──────────────────────────────────────────────
  // LOGIN — verifica credenciales y devuelve JWT
  // ──────────────────────────────────────────────
  async login(data) {
    const { email, password } = data;

    // Buscar al admin por email
    const usuario = await AuthUser.findOne({ email });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña ingresada con el hash guardado
    // bcrypt.compare devuelve true/false — nunca "descifra"
    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      throw new Error('Contraseña incorrecta');
    }

    // Solo ponemos info no-sensible en el payload
    const payload = { email: usuario.email };
    return this.generarToken(payload);
  }

  // ──────────────────────────────────────────────
  // GENERAR TOKEN — firma el JWT con la clave secreta
  // ──────────────────────────────────────────────
  async generarToken(payload) {
    // La clave secreta vive en .env, nunca hardcodeada
    const claveSecreta = process.env.JWT_SECRET || 'clave_desarrollo';
    return jwt.sign(payload, claveSecreta, { expiresIn: '24h' });
  }
}

module.exports = new AuthService();