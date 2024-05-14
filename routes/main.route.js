const express = require('express');
const router = express.Router();
var path = require('path');
const loginController = require("../controller/login.controller");
const registoController = require("../controller/registo.controller");

//Rota Visualização Página Home
router.get("/", async function(req,res){
    res.render(path.resolve('views/pages/index.ejs'));  
});

    //Rota Verificação Login Cliente Backend
    router.post("/login", loginController.login);

    //Rota Verificação Login Cliente Google Backend
    router.post("/login/google", loginController.getUserGoogle);

    //Rota Criação Novo Cliente Backend
    router.post("/registo", registoController.create);


module.exports = router;