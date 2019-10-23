const express   = require('express');
const Router    = express.Router();

Router.get('/', (req, res) => {
    res.send({response: "Server is up and running"}).status(200);
});

module.exports = Router;