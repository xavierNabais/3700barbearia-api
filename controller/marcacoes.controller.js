const marcacoesModel = require("../model/marcacoes.model.js");
const utilizadorModel = require("../model/utilizador.model.js");
const barbeiroModel = require("../model/barbeiro.model.js");
const servicoModel = require("../model/servico.model.js");

var path = require('path');

//Controller Procurar Marcações
exports.findAll = (req, res) => {
    marcacoesModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
        });
        else res.render(path.resolve('views/pages/administrador/marcacoes/index.ejs'), { dados });   

    });
};


//Controller Procurar Marcação Consoante ID
exports.findById = (req, res) => {
    marcacoesModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
        });
        else servicoModel.getActive((error, servico) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços ativos"
                    });
                } else {
                    barbeiroModel.getActive((error, barbeiro) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos barbeiros ativos"
                            });
                        } else {
                            utilizadorModel.getAll((error, utilizador) => {
                                if (error) {
                                    res.status(500).send({
                                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
                                    });
                                } else {
                                    res.render(path.resolve('views/pages/administrador/marcacoes/update.ejs'), { utilizador, barbeiro, servico, dados});  
                                }
                            }); 
                        }
                    });  
                }
            });
    });
};
exports.getActive = (req, res) => {
    utilizadorModel.getAll((error, utilizador) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores ativos"
            });
        } else {
            barbeiroModel.getActive((error, barbeiro) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos barbeiros ativos"
                    });
                } else {
                    servicoModel.getActive((error, servico) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços ativos"
                            });
                        } else {
                            res.render(path.resolve('views/pages/administrador/marcacoes/create.ejs'), { utilizador, barbeiro, servico });  
                        }
                    });
                }
            });
        }
    });
};




//Controller Criar Marcação
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const marcacao = new marcacoesModel ({
        id_barbeiro: req.body.barbeiro,
        id_utilizador: req.body.utilizador,
        id_servico: req.body.servico,
        data: req.body.data,
        notas: req.body.notas,
    });

    marcacoesModel.create(marcacao, (error, data) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar criar uma marcação."
        });
        else
        marcacoesModel.getAll((error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
            });
            else res.render(path.resolve('views/pages/administrador/marcacoes/index.ejs'), { dados });   
        });
    });
};


//Controller Atualizar Marcação
exports.update = (req, res) => {
    marcacoesModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados da marcação"
        });
        else res.redirect('/painel/marcacoes');  

    });
};


//Controller Eliminar Marcação
exports.remove = (req, res) => {
    const id = req.params.id; 
    marcacoesModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados da marcação"
        });
        else res.redirect('/painel/marcacoes'); 

    });
};