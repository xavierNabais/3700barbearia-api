const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");

//Configurações
app.set('port', process.env.PORT || 5000);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'v19bnqYOC8',
    resave: false,
    saveUninitialized: true
}));

//Definir Rotas Principais
var rotas = require("./routes/main.route");
app.use("/", rotas);

var utilizadores = require("./routes/adminPanel.route");
app.use("/", utilizadores);

//Definir Rotas Inexistentes
app.use(function (req, res) {
    res.type('text/plain')
    res.status(404)
    res.send('404 not found')
});

// Iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Servidor iniciado na porta: ' + port);
});
