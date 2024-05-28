const barbeiroModel = require("../model/barbeiro.model.js");
var path = require('path');

//Controller Procurar Barbeiros
exports.findAll = (req, res) => {
    barbeiroModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos barbeiros"
        });
        else res.json(dados);   

    });
};


//Controller Procurar ID Barbeiro
exports.findById = (req, res) => {
    barbeiroModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados do barbeiro"
        });
        else res.render(path.resolve('views/pages/administrador/barbeiro/update.ejs'), { dados });      

    });
};


//Controller Criar Barbeiro
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const barbeiro = new barbeiroModel ({
        nome: req.body.nome,
        id_utilizador: req.body.id_utilizador,
        descricao: req.body.descricao,
        especializacao: req.body.especializacao,
        ativo: req.body.ativo,
    });

    barbeiroModel.create(barbeiro, (error, data) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar criar um barbeiro."
        });
        else
        barbeiroModel.getAll((error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar aceder aos dados dos barbeiros"
            });
            else res.render(path.resolve('views/pages/administrador/barbeiro/index.ejs'), { dados });   
        });
    });
};


//Controller Atualizar Barbeiro
exports.update = (req, res) => {
    barbeiroModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados do barbeiro"
        });
        else res.status(200).json({ message: 'Barbeiro atualizado com sucesso!' });

    });
};


//Controller Eliminar Barbeiro
exports.remove = (req, res) => {
    const id = req.params.id; 
    barbeiroModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados do barbeiro"
        });
        else res.status(200).json({ message: 'Barbeiro excluído com sucesso!' });

    });
};