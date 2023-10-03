import { Options } from 'swagger-jsdoc'
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options: Options = {
    swaggerDefinition: {
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API',
        },
    },
    apis: ['./src/*.ts'],
}

    const specs = swaggerJsdoc(options);

    module.exports = { specs, swaggerUi };
