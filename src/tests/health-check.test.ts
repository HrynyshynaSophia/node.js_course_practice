import 'dotenv/config';
import bodyParser from 'body-parser';
import request from 'supertest';
import { healthCheckRoute } from "../routes/health-check/health-check.route";

import { app } from '..';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', healthCheckRoute);

describe('Health-check GET API Endpoint', () => {
    
    it('Check if the server is running', async () => {
        const response = await request(app).get('/api/health-check');
        expect(response.status).toBe(200);
    });
});
