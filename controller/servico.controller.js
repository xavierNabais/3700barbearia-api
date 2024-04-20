const servicoModel = require("../model/servico.model.js");
var path = require('path');

//Controller Procurar Serviços
exports.findAll = (req, res) => {
    servicoModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços"
        });
        else res.json(dados);

    });
};

//Controller Procurar ID Serviço
exports.findById = (req, res) => {
    servicoModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados do serviço"
        });
        else res.render(path.resolve('views/pages/administrador/servico/update.ejs'), { dados });      

    });
};


//Controller Criar Serviço
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const servico = new servicoModel ({
        nome: req.body.nome,
        preco: req.body.preco,
        duracao: req.body.duracao,
        ativo: req.body.ativo,
    });

    servicoModel.create(servico, (error, data) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar criar um serviço."
        });
        else
        servicoModel.getAll((error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços"
            });
            else res.render(path.resolve('views/pages/administrador/servico/index.ejs'), { dados });   
        });
    });
};


//Controller Atualizar Serviço
exports.update = (req, res) => {
    servicoModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados do serviço"
        });
        else res.redirect('/painel/servicos');  

    });
};


//Controller Eliminar Serviço
exports.remove = (id, res) => {
    console.log(id);
    servicoModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados do serviço"
        });
        else res.status(200).json({ message: 'Serviço excluído com sucesso!' });

    });
};