const express = require('express');
const router = express.Router();
var path = require('path');
const loginController = require("../controller/login.controller");

//Rota Visualização Página Home
router.get("/", async function(req,res){
    res.render(path.resolve('views/pages/index.ejs'));  
});

    //Rota Verificação Login Cliente Backend
    router.post("/login", loginController.getUser);


module.exports = router;