const express = require('express');
const apiDocs = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');


apiDocs.use('/', swaggerUi.serve);
apiDocs.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    swaggerUi.setup(swaggerDocument)(req, res, next);
});

module.exports = apiDocs;
