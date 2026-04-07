// test/menu.test.js
// Día 7 — Tests automáticos de las rutas del menú
// Usa node:test (integrado en Node.js 18+) y supertest para simular peticiones HTTP

const { test, describe } = require('node:test');
const assert             = require('node:assert');
const request            = require('supertest');
const app                = require('../app');

describe('Rutas del menú', () => {

  // GET /menu — ruta libre, devuelve array
  test('GET /menu devuelve 200 y un array', async (t) => {
    const response = await request(app).get('/menu');
    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(response.body));
  });

  // GET /menu/buscar sin ?nombre= — debe devolver 400
  test('GET /menu/buscar sin ?nombre= devuelve 400', async (t) => {
    const response = await request(app).get('/menu/buscar');
    assert.strictEqual(response.status, 400);
  });

  // GET /menu/:id con id inválido — CastError de Mongoose → 500
  test('GET /menu/:id con id inválido devuelve 500', async (t) => {
    const response = await request(app).get('/menu/id-que-no-existe');
    assert.strictEqual(response.status, 500);
  });

  // GET /menu/categoria/:cat — ruta libre, devuelve array (vacío si no existe)
  test('GET /menu/categoria/:cat devuelve 200 y array', async (t) => {
    const response = await request(app).get('/menu/categoria/Segundos');
    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(response.body));
  });

  // GET /menu/categoria/:cat con categoría inexistente → array vacío
  test('GET /menu/categoria/:cat inexistente devuelve array vacío', async (t) => {
    const response = await request(app).get('/menu/categoria/NoExiste');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 0);
  });

});