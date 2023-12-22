import { Options } from 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';
import { setup } from 'swagger-ui-express'

export default () => {
    const options: Options = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Your API Documentation',
                version: '1.0.0',
                description: 'Documentation for your API',
            },
            basePath: '/api',
            examples: true,
            components: {
                schemas: {
                    Movie: {
                        type: 'object',
                        required: ['title', 'description', 'releaseDate', 'genre'],
                        properties: {
                            id: {
                                type: 'string',
                                description: 'The auto-generated id of the book',
                            },
                            title: {
                                type: 'string',
                                description: 'The title of a movie',
                            },
                            releaseDate: {
                                type: 'Date',
                                description: 'Date the movie released',
                            },
                            genre: {
                                type: 'Array',
                                description: 'A list of genres of a movie',
                            },
                        },
                        example: {
                            id: 'd5fE_asz',
                            title: 'The Matrix',
                            description: 'A groundbreaking science fiction movie',
                            releaseDate: '1999-03-31',
                            genre: ["Sci-Fi", "Action"],
                        },
                    },
                    Genre: {
                        type: 'Array',
                        required: ['name'],
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Genre name',
                            },
                        },
                        example: {
                            name: 'Drama'
                        }
                    },
                },
            },
        },
        apis: ['src/**/*.ts'],
    }

    return setup(swaggerJSDoc(options))
}

