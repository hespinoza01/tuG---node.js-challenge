import swaggerJsDoc from 'swagger-jsdoc'

// Swagger options config
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Backend REST API',
      description: 'A Backend REST API Boilerplate.'
    }
  },
  apis: ['../api/routes/index.js']
}

const swagger = swaggerJsDoc(swaggerOptions)

export default swagger
