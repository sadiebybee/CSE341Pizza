const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'My API',
    description: 'Expenses API',
  },
  host: "localhost:3000",
  schemes: ["http"],
  // host: 'cse341pizza.onrender.com',
  // schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
