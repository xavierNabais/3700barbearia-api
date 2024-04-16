const express = require('express');
const router = express.Router();
var path = require('path');

//Rota Visualização Página Home
router.get("/", async function(req,res){
    res.render(path.resolve('views/pages/index.ejs'));  
});

module.exports = router;