// In a test file -- this only works because app.js
// doesn't call .listen()

import app from './app.js'
import { request } from 'supertest'

test('health check returns ok', async() => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('ok');
})
