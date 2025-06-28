const express = require('express')
const apiDocs = require("./apiDocs");
const router = express.Router();

router.use("/api-docs", apiDocs);

module.exports = router;
