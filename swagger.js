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
        '/api/users': {
            get: {
                summary: 'Get list of users',
                responses: {
                    '200': {
                        description: 'Successful response',
                    },
                    '500': {
                        description: 'Internal server error'
                    }
                },
            },
            post: {
                summary: 'Add a new user',
                responses: {
                    '201': {
                        description: 'Successful operation',
                    },
                    '400': {
                        description: 'Bad request'
                    },
                    '500': {
                        description: 'Internal server error'
                    }
                },
            },
        },
    },
    responses: {
        '200': {
        description: 'Successful responce'
        },
        '400': {
            description: 'Bad request'
        },
        '404': {
            description: 'Not found'
        },
        '500': {
            description: 'Internal server error'
        },
    }
}

    const specs = swaggerJsdoc(options);

    module.exports = { specs, swaggerUi };
