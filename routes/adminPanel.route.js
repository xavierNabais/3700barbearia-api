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
//Rota Visualização Painel de administrador Utilizadores Funcionários
router.get("/painel/funcionarios", utilizadorController.findWorkers);

//Rota Visualização Painel de administrador
router.get("/painel/utilizadores/:id", utilizadorController.findById);

//Rota Criação Utilizador Backend
router.post("/painel/utilizadores", utilizadorController.create);

//Rota Atualização Utilizador Backend
router.put("/painel/utilizadores/:id", utilizadorController.update);

//Rota Atualização Utilizador Nome, Apelido e Username
router.put("/perfil/editar/1/:id", utilizadorController.update1);

//Rota Atualização Utilizador Email
router.put("/perfil/editar/2/:id", utilizadorController.update2);

//Rota Atualização Utilizador Password
router.put("/perfil/editar/3/:id", utilizadorController.update3);

//Rota Atribuir 1 Ponto Ao Utilizador
router.put("/utilizador/complete/:id", utilizadorController.complete);

//Rota Eliminar Utilizador
router.delete("/painel/utilizadores/:id", utilizadorController.remove);






//SERVIÇOS


//Rota Visualização Painel de administrador
router.get("/painel/servicos", servicoController.findAll);

//Rota Criação Serviço Backend
router.post("/painel/servicos", servicoController.create);

//Rota Atualização Serviço Backend
router.put("/painel/servicos/:id", servicoController.update);

//Rota Eliminar Serviço Backend
router.delete("/painel/servicos/:id", servicoController.remove);



//BARBEIROS




//Rota Visualização Painel de administrador
router.get("/painel/barbeiros", barbeiroController.findAll);

//Rota Criação Barbeiro Backend
router.post("/painel/barbeiros", barbeiroController.create);

//Rota Atualização Barbeiro Backend
router.put("/painel/barbeiros/:id", barbeiroController.update);

//Rota Eliminar Barbeiro Backend
router.delete("/painel/barbeiros/:id", barbeiroController.remove);



//MARCAÇÕES




//Rota Visualização Painel de administrador
router.get("/painel/marcacoes", marcacoesController.findAll);

//Rota Obter Dados das Marcações de um barbeiro
router.get("/painel/marcacoes/barbeiro/:id", marcacoesController.findAllFrom);

//Rota Obter Dados das Marcações de um id
router.get("/painel/marcacoes/:id", marcacoesController.findById);

//Rota Obter dados das marcações anteriores ao dia de hoje
router.get("/perfil/marcacoes/anteriores/:id", marcacoesController.findSpecificOld);

//Rota Obter dados das marcações próximas ao dia de hoje
router.get("/perfil/marcacoes/proximas/:id", marcacoesController.findSpecificNew);

//Rota Criação Marcação Backend
router.post("/painel/marcacoes", marcacoesController.create);

//Rota Atualização Marcação Backend
router.put("/painel/marcacoes/:id", marcacoesController.update);


//Rota Eliminar Marcação Backend
router.delete("/painel/marcacoes/:id", marcacoesController.remove);




module.exports = router;