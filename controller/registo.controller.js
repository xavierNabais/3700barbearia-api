const RegistoModel = require("../model/registo.model.js");
var path = require('path');
var bcrypt = require('bcrypt');


//Controller Criar Novo Cliente
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const saltRounds = 10;
    const pwHashed = bcrypt.hashSync(req.body.password, saltRounds);

    const novoRegisto = new RegistoModel({
        email: req.body.email,
        password: pwHashed, 
    })

    RegistoModel.create(novoRegisto, (error, data) => {
        if (error)
        //1 = Username existente
            if (error === 1){
            res.status(500).send({
                message:
                error.message || "Username existente!"
            });
            //2 = Email existente
            } else if(error === 2) {
                res.status(500).send({
                    message:
                    error.message || "Email existente!"
                });                     
            }
            //Query error
            else {
                res.status(500).send({
                    message:
                    error.message || "Ocorreu um erro ao tentar criar um utilizador."
                });
            }
            
                else
                RegistoModel.FindByUsername(data.insertId, (error, dados) => {
                    if (error)
                    res.status(500).send({
                        message:
                        error.message || "Ocorreu um erro ao tentar criar um utilizador."
                    });
                    else 
                    console.log(dados);
                    res.json(dados);
                
                });
        });
};