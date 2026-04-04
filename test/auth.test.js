// test/auth.test.js
// Día 7 — Tests automáticos de autenticación y rutas protegidas

const { test, describe } = require('node:test');
const assert             = require('node:assert');
const request            = require('supertest');
const app                = require('../app');

describe('Autenticación', () => {

  describe('POST /auth/login', () => {

    // Login con credenciales incorrectas → 401
    test('login con credenciales incorrectas devuelve 401', async (t) => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email:    'noexiste@restaurante.com',
          password: 'claveIncorrecta'
        });
      assert.strictEqual(response.status, 401);
    });

    // Login sin body → error 400 o superior
    test('login sin body devuelve error', async (t) => {
      const response = await request(app)
        .post('/auth/login')
        .send({});
      assert.ok(response.status >= 400);
    });

  });

  describe('Rutas protegidas', () => {

    // POST /menu sin token → verifyToken lo bloquea con 401
    test('POST /menu sin token devuelve 401', async (t) => {
      const response = await request(app)
        .post('/menu')
        .send({ nombre: 'Test', precio: 10 });
      assert.strictEqual(response.status, 401);
    });

    // PUT /menu/:id sin token → 401
    test('PUT /menu/:id sin token devuelve 401', async (t) => {
      const response = await request(app)
        .put('/menu/123456789012345678901234')
        .send({ precio: 20 });
      assert.strictEqual(response.status, 401);
    });

    // DELETE /menu/:id sin token → 401
    test('DELETE /menu/:id sin token devuelve 401', async (t) => {
      const response = await request(app)
        .delete('/menu/123456789012345678901234');
      assert.strictEqual(response.status, 401);
    });

    // GET /menu sin token → libre, debe funcionar
    test('GET /menu sin token devuelve 200', async (t) => {
      const response = await request(app).get('/menu');
      assert.strictEqual(response.status, 200);
    });

  });

});