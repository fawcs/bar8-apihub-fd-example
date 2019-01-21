var app = require('./config/express')();
var config = require('./config/environment');
require('dotenv').config();
app.listen(config.port, function () {
    console.log('Servidor rodando!');
})
