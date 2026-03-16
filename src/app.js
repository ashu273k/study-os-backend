// Why do we created app.js seperately ?
/**
 * When `app.js` just creates and exports the Express app without
 * starting a server, you can import it in tests and fire
 * requests at it without ever binding to a real port.
 * If `server.js` and `app.js` were merged, every test would fight 
 * over the same port.
 */

import express from 'express'
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// helmet for protecting our api from malicious activity
app.use(helmet());
// cors for the cors policy
app.use(cors());

/**
 * Without `express.json()`, If a client sends a POST request with 
 * a JSON body, `req.body` is `undefined`. Try removing it 
 * and hitting a POST route that reads `req.body` -- it 
 * silently breaks. This middleware parses the raw byte stream
 * of the request into a JavaScript object
 */
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'study-os-api' })
})

app.get('/api/v1/info', (req, res) => {
    res.json({ 
         name: 'study-os-api',
         version: "1.0.0",
         message: 'Backend API for the Study-OS application'
        })
})

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

export default app;