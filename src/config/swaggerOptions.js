import __dirname from "../utils.js"
export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de app CoderBackend',
            description: 'Api Docs para Backend'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
  }
  