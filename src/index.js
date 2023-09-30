const express = require('express');
const { specs, swaggerUi } = require('../swagger');
const app = express();
const PORT = 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
    res.send('Welcome to the root path!');
});
app.get('/health-check', (req, res) => {
    res.json({ status: 'Server is running!' });
});
/**
 *  * @swagger
 * /health-check:
 *   get:
 *     summary: Check if the server is running
 *     responses:
 *       200:
 *         description: Server is running
 */
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});