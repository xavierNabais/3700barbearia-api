const UtilizadorModel = require("../model/utilizador.model.js");
var path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de saltos para gerar o salt

//Controller Procurar Utilizadores
exports.findAll = (req, res) => {
    UtilizadorModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
        });
        else res.json(dados);

    });
};

//Controller Procurar ID Utilizador
exports.findById = (req, res) => {
    const userId = req.params.id;
    UtilizadorModel.FindById(userId, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
        });
        else res.json(dados);      

    });
};

// Controller Criar Utilizador
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
        return;
    }

    const utilizador = new UtilizadorModel({
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        pontos: 0,
        cargo: 0
    });

    UtilizadorModel.create(utilizador, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar criar um utilizador."
            });
            return;
        } else {
            // Adicione o ID do novo utilizador ao objeto data antes de enviar como resposta
            data.id = data.insertId;
            res.json(data);
        }
    });
};



//Controller Atualizar Utilizador
exports.update = (req, res) => {
    UtilizadorModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
        });
        else res.redirect('/painel/utilizadores');  

    });
};


//Controller Atualizar Utilizador STEP 1
exports.update1 = (req, res) => {
    UtilizadorModel.update1(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
        });
        else res.status(200).json({ message: 'Perfil editado com sucesso!' });

    });
};

// Controller Atualizar Utilizador STEP 2
exports.update2 = (req, res) => {
    // Verifique se o corpo da solicitação contém os campos necessários (Old e New)
    if (!req.body.Old || !req.body.New || !req.body.Id) {
        return res.status(400).send({ message: "Os campos Old e New são obrigatórios." });
    }
    // Encontre o utilizador pelo ID
    UtilizadorModel.FindById(req.body.Id, (err, usuario) => {
        if (err) {  
            console.log("Erro ao buscar o utilizador:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
        }
    
        if (!usuario) {
            // Usuário não encontrado com o ID fornecido
            return res.status(404).send({ message: "Usuário não encontrado com o ID fornecido." });
        }

        // Verifique se o email antigo é igual ao email do usuário encontrado
        if (req.body.Old !== usuario[0].Email) {
            return res.status(400).send({ message: "O email antigo não corresponde ao email atual do usuário." });
        }
        // Atualize o email do usuário
        UtilizadorModel.update2(req.body, (error, dados) => {
            if (error) {
                console.log("Erro ao atualizar o email do usuário:", error);
                return res.status(500).send({
                    message: error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                });
            }
            console.log("Email do utilizador alterado com sucesso!");
            return res.status(200).json({ message: 'Perfil editado com sucesso!' });
        });
    });
};


exports.update3 = (req, res) => {
    // Verifique se o corpo da solicitação contém os campos necessários (Old, New e Id)
    if (!req.body.Old || !req.body.New || !req.body.Id) {
        return res.status(400).send({ message: "Os campos Old, New e Id são obrigatórios." });
    }
    
    // Encontre o utilizador pelo ID
    UtilizadorModel.FindById(req.body.Id, async (err, usuario) => {
        if (err) {  
            console.log("Erro ao buscar o utilizador:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
        }
    
        if (!usuario) {
            // Usuário não encontrado com o ID fornecido
            return res.status(404).send({ message: "Usuário não encontrado com o ID fornecido." });
        }

        try {
            // Compare a senha antiga com a senha hash do usuário
            const match = await bcrypt.compare(req.body.Old, usuario[0].Password);
            if (!match) {
                return res.status(400).send({ message: "A senha antiga não corresponde à senha atual do usuário." });
            }

            // Hash a nova senha antes de atualizar
            const hashedPassword = await bcrypt.hash(req.body.New, saltRounds);
            
            // Atualize a senha do usuário
            UtilizadorModel.update3({ ...req.body, New: hashedPassword }, (error, dados) => {
                if (error) {
                    console.log("Erro ao atualizar a senha do usuário:", error);
                    return res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                    });
                }
                console.log("Senha do utilizador alterada com sucesso!");
                return res.status(200).json({ message: 'Perfil editado com sucesso!' });
            });
        } catch (error) {
            console.log("Erro ao comparar senhas:", error);
            return res.status(500).send({ message: "Ocorreu um erro ao comparar senhas." });
        }
    });
};



//Controller Eliminar Utilizador
exports.remove = (req, res) => {
    const id = req.params.id; 
    UtilizadorModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados do utilizador"
        });
        else res.redirect('/painel/utilizadores'); 

    });
};