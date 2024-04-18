const express = require('express');
const router = express.Router();
const utilizadorController = require("../controller/utilizador.controller");
const barbeiroController = require("../controller/barbeiros.controller");
const servicoController = require("../controller/servico.controller");
const marcacoesController = require("../controller/marcacoes.controller");
var path = require('path');




//Utilizadores


//Rota Visualização Painel de administrador
router.get("/painel/utilizadores", utilizadorController.findAll);

//Rota Visualização Painel de administrador
router.get("/painel/utilizadores/:id"/*, isAdmin*/, utilizadorController.findById);


//Rota Formulário Criação Utilizador Frontend
router.get("/painel/utilizadores/novo", function(req,res){
    res.render(path.resolve('views/pages/administrador/utilizador/create.ejs'));  
})

//Rota Formulário Atualizar Utilizador Frontend
router.get("/painel/utilizadores/update/:id", (req, res) => {
    const id = req.params.id;
    utilizadorController.findById(id, res);
  });

//Rota Criação Utilizador Backend
router.post("/painel/utilizadores/novo", utilizadorController.create);

//Rota Atualização Utilizador Step 1 Backend
router.put("/perfil/editar/1/:id", utilizadorController.update1);

//Rota Atualização Utilizador Step 2 Backend
router.put("/perfil/editar/2/:id", utilizadorController.update2);

//Rota Atualização Utilizador Step 3 Backend
router.put("/perfil/editar/3/:id", utilizadorController.update3);

//Rota Atualização Utilizador Backend
router.post("/painel/utilizadores/update/:id", utilizadorController.update);


//Rota Eliminar Utilizador Backend
router.get("/painel/utilizadores/delete/:id", utilizadorController.remove);






//SERVIÇOS


//Rota Visualização Painel de administrador
router.get("/painel/servicos"/*, isAdmin*/, servicoController.findAll);

//Rota Formulário Criação Serviço Frontend
router.get("/painel/servicos/novo", function(req,res){
  res.render(path.resolve('views/pages/administrador/servico/create.ejs'));  
})

//Rota Formulário Atualizar Serviço Frontend
router.get("/painel/servicos/update/:id", (req, res) => {
  const id = req.params.id;
  servicoController.findById(id, res);
});


//Rota Criação Serviço Backend
router.post("/painel/servicos/novo", servicoController.create);

//Rota Atualização Serviço Backend
router.post("/painel/servicos/update/:id", servicoController.update);


//Rota Eliminar Serviço Backend
router.get("/painel/servicos/delete/:id", servicoController.remove);



//BARBEIROS




//Rota Visualização Painel de administrador
router.get("/painel/barbeiros"/*, isAdmin*/, barbeiroController.findAll);

//Rota Formulário Criação Barbeiro Frontend
router.get("/painel/barbeiros/novo", function(req,res){
  res.render(path.resolve('views/pages/administrador/barbeiro/create.ejs'));  
})

//Rota Formulário Atualizar Barbeiro Frontend
router.get("/painel/barbeiros/update/:id", (req, res) => {
  const id = req.params.id;
  barbeiroController.findById(id, res);
});


//Rota Criação Barbeiro Backend
router.post("/painel/barbeiros/novo", barbeiroController.create);

//Rota Atualização Barbeiro Backend
router.post("/painel/barbeiros/update/:id", barbeiroController.update);


//Rota Eliminar Barbeiro Backend
router.get("/painel/barbeiros/delete/:id", barbeiroController.remove);



//MARCAÇÕES




//Rota Visualização Painel de administrador
router.get("/painel/marcacoes", marcacoesController.findAll);

//Rota Visualização Painel de administrador
router.get("/perfil/marcacoes/:id", marcacoesController.findSpecific);

//Rota Formulário Criação Marcação Frontend
router.get("/painel/marcacoes/novo", marcacoesController.getActive);


//Rota Formulário Atualizar Marcação Frontend
router.get("/painel/marcacoes/update/:id", (req, res) => {
  const id = req.params.id;
  marcacoesController.findById(id, res);
});


//Rota Criação Marcação Backend
router.post("/painel/marcacoes/novo", marcacoesController.create);

//Rota Atualização Marcação Backend
router.post("/painel/marcacoes/update/:id", marcacoesController.update);


//Rota Eliminar Marcação Backend
router.get("/painel/marcacoes/delete/:id", marcacoesController.remove);




module.exports = router;