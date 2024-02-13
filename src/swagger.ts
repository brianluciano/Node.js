import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Welcome to my rest api with node.js',
      description: `
## Welcome to my app`,
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        authRegister: {
          type: 'object',
          required: ['name, lastname, email', 'password'],
          properties: {
            name: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            },
            age: {
              type: 'string'
            }
          }
        },
        authLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          }
        },
        category: {
          type: 'object',
          required: ['name, description, image'],
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            image: {
              type: 'string'
            }
          }
        },
        item: {
          type: 'object',
          required: ['name, description, image', 'price', 'category'],
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            image: {
              type: 'string'
            },
            price: {
              type: 'string'
            },
            category: {
              type: 'object',
              properties: {
                id: {
                  type: 'uuid',
                  example: 'aed7bb46-7245-47d2-8a72-f55311e9ff49'
                }
              }
            }
          }
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Server'
      }
    ],
    tags: [
      {
        name: 'Me',
        description: 'Endpoints to manage your profile'
      }
    ]
  },
  apis: ['./src/route/*.ts']
};

export default options;
