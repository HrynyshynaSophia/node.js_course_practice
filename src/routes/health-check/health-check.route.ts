import express, { Request, Response } from 'express';
import { getHealthCheckResponse } from '../../controllers/health-check/health-check.controller';

const router = express.Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check if the server is running
 *     responses:
 *       200:
 *         description: Server is running
 */
router.use('/health-check', getHealthCheckResponse);

export { router as healthCheckRoute }
