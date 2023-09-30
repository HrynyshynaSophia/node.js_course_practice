const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API',
        },
    },
    apis: ['src/*.js'],
    paths: {
        '/health-check': {
            get: {
                summary: 'Check if the server is running',
                responses: {
                    '200': {
                        description: 'Server is running',
                    },
                },
            },
        },
    },
}

    const specs = swaggerJsdoc(options);

    module.exports = { specs, swaggerUi };
