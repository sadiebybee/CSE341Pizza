const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Pizza Review App',
    description: 'Users can log in review pizzas and add favorites',
  },
  // host: "localhost:3000",
  // schemes: ["http"],
  host: 'cse341pizza.onrender.com',
  schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
