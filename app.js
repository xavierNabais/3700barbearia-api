const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const cors = require("cors");
const boydParser = require("body-parser");

//Configurações
app.set('port', process.env.port || process.env.PORT || 5000);
app.use(express.urlencoded({extended:true}));
app.listen(app.get('port'), () => {
console.log('Servidor iniciado na porta: '+ app.get('port'));
});
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(boydParser.urlencoded({extended: false}));
app.use(boydParser.json());
app.use(session({
    secret: 'v19bnqYOC8',
    resave: false,
    saveUninitialized: true
  }));



//Definir Rotas Principais
var rotas = require("./routes/main.route");
app.use("/", rotas);

//Definir Rotas Principais
var utilizadores = require("./routes/adminPanel.route");
app.use("/", utilizadores);


//Definir Rotas Inexistentes
app.use(function(req,res){
    res.type('text/plain')
    res.status(404)
    res.send('404 not found')
})
