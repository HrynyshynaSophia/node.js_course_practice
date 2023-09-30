const express = require('express');
const { specs, swaggerUi } = require('../swagger');
const app = express();
const PORT = 3000;
/**
 * @swagger
 * /api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});
/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check if the server is running
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get('/health-check', (req, res) => {
    res.json({ status: 'Server is running!' });
});
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get('/api/users',(req,res)=>{
    res.json({message: 'List of users'})
})
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       200:
 *         description: User created
 */
app.set('/api/users',(req,res)=>{
    res.json({message: 'User created'})
})
app.use((req,res,next)=>{
    res.status(404).json({error: 'Not found'});
});
app.use((req,res,next)=>{
    res.status(500).json({error: 'Internal server error'});
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});