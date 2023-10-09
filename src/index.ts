import express, { Request, Response } from 'express';
import { serve } from 'swagger-ui-express'
import swagger from './swagger';

const app = express();
const PORT: number = 3000;
/**
 * @swagger
 * /api-docs
 */
app.use('/api-docs', serve, swagger());
app.get('/', (req: Request, res: Response) => {
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
app.get('/health-check', (req: Request, res: Response) => {
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
app.get('/api/users', (req: Request, res: Response) => {
    res.json({ message: 'List of users' })
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
app.post('/api/users', (req: Request, res: Response) => {
    res.json({ message: 'User created' })
})
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
});
app.use((req: Request, res: Response) => {
    res.status(500).json({ error: 'Internal server error' });
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});