import { Options } from 'swagger-jsdoc'
import swaggerJSDoc from 'swagger-jsdoc';
import { setup } from 'swagger-ui-express'

export default () => {
    const options: Options = {
        swaggerDefinition: {
            info: {
                title: 'Your API Documentation',
                version: '1.0.0',
                description: 'Documentation for your API',
            },
        },
        apis: ['src/*.ts'],
    }
    return setup(swaggerJSDoc(options))
}

