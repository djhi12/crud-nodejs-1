const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your CRUD API',
        },
    },
    // Specify the path to your route files more explicitly
    apis: [path.join(__dirname, 'routes/*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
