const UtilizadorModel = require("../model/utilizador.model.js");
var path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

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

//Controller Procurar Utilizadores
exports.findWorkers = (req, res) => {
    UtilizadorModel.getWorkers((error, dados) => {
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
    const saltRounds = 10;
    const pwHashed = bcrypt.hashSync(req.body.password, saltRounds);
    const utilizador = new UtilizadorModel({
        nome: req.body.nome,
        apelido: req.body.apelido,
        username: req.body.username,
        email: req.body.email,
        password: pwHashed,
        telemovel: req.body.telemovel,
        pontos: req.body.pontos,
        cargo: req.body.cargo
    });

    UtilizadorModel.create(utilizador, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar criar um utilizador."
            });
            return;
        } else {
            data.id = data.insertId;
            res.json(data);
        }
    });
};



exports.update = async (req, res) => {
    // Verificar se a password está presente na requisição
    if (req.body.Password != undefined) {
        // Hash da password com bcrypt
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
            // Atualizar a password encriptada nos dados da requisição
            req.body.Password = hashedPassword;

            // Chamar o model para atualizar o utilizador com a password encriptada
            UtilizadorModel.update(req.body, (error, dados) => {
                if (error)
                res.status(500).send({
                    message:
                    error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                });
                else res.status(200).json({ message: 'Perfil editado com sucesso!' });
            });

    } else {
        console.log(req.body);

        UtilizadorModel.update(req.body, (error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
            });
            else res.status(200).json({ message: 'Perfil editado com sucesso!' });
        });
    }
};

// Controller Atualizar Utilizador STEP 1
exports.update1 = (req, res) => {
    // Verificar se o corpo da solicitação contém os campos obrigatórios (Nome, Apelido e Username)
    if (!req.body.Nome || !req.body.Apelido || !req.body.Username) {
        return res.status(400).send({ message: "Os campos 'Nome', 'Apelido' e 'Username' são obrigatórios." });
    }

    // Verificar se o username já está em uso por outro utilizador
    UtilizadorModel.FindUsername(req.body.Username, (err, existingUser) => {
        if (err) {
            console.log("Erro ao verificar o username:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao verificar o username." });
        }

        if (existingUser && existingUser.length != 0 && existingUser[0].Id != req.params.id) {
            return res.status(400).send({ message: "O username já está em uso por outro utilizador." });
        }

        // Se o username não estiver em uso por outro utilizador, prosseguir com a atualização do perfil do utilizador
        UtilizadorModel.FindById(req.params.id, (err, userToUpdate) => {
            if (err) {
                console.log("Erro ao buscar o utilizador:", err);
                return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
            }

            if (!userToUpdate) {
                return res.status(404).send({ message: "Utilizador não encontrado com o ID fornecido." });
            }

            // Verificar se o username a ser atualizado é igual ao username atual do utilizador
            if (req.body.Username === userToUpdate.Username) {
                // Atualizar apenas o nome e o apelido
                const updatedUserData = {
                    Nome: req.body.Nome,
                    Apelido: req.body.Apelido,
                    Id: req.params.id,
                };

                // Atualizar o perfil do utilizador com os novos dados
                UtilizadorModel.update1(updatedUserData, (error, dados) => {
                    if (error) {
                        console.log("Erro ao atualizar o perfil do utilizador:", error);
                        return res.status(500).send({
                            message: error.message || "Ocorreu um erro ao tentar atualizar o perfil do utilizador."
                        });
                    }
                    return res.status(200).json({ message: 'Perfil editado com sucesso!' });
                });
            } else {
                // Se o username foi alterado, atualizar também o username
                const updatedUserData = {
                    Nome: req.body.Nome,
                    Apelido: req.body.Apelido,
                    Username: req.body.Username,
                    Id: req.params.id,
                };

                // Atualizar o perfil do utilizador com os novos dados
                UtilizadorModel.update1(updatedUserData, (error, dados) => {
                    if (error) {
                        console.log("Erro ao atualizar o perfil do utilizador:", error);
                        return res.status(500).send({
                            message: error.message || "Ocorreu um erro ao tentar atualizar o perfil do utilizador."
                        });
                    }
                    return res.status(200).json({ message: 'Perfil editado com sucesso!' });
                });
            }
        });
    });
};


// Controller Atualizar Utilizador STEP 2
exports.update2 = (req, res) => {
    // Verifique se o corpo da solicitação contém os campos necessários (Old e New)
    if (!req.body.Old || !req.body.New || !req.body.Id) {
        return res.status(400).send({ message: "Por favor preencha todos os campos." });
    }
    // Encontre o utilizador pelo ID
    UtilizadorModel.FindById(req.body.Id, (err, utilizador) => {
        if (err) {  
            console.log("Erro ao buscar o utilizador:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
        }
    
        if (!utilizador) {
            // utilizador não encontrado com o ID fornecido
            return res.status(404).send({ message: "Utilizador não encontrado com o ID fornecido." });
        }

        // Verifique se o email antigo é igual ao email do utilizador
        if (req.body.Old !== utilizador[0].Email) {
            return res.status(400).send({ message: "O email atual não corresponde ao email do utilizador." });
        }

        // Verifique se o novo email já está em uso por outro utilizador
        UtilizadorModel.FindEmail(req.body.New, (err, existingUser) => {
            if (err) {
                console.log("Erro ao buscar o utilizador pelo novo email:", err);
                return res.status(500).send({ message: "Ocorreu um erro ao verificar o novo email." });
            }

            if (existingUser && existingUser.length !== 0) {
                return res.status(400).send({ message: "O novo email já está em uso por outro utilizador." });
            }

            // Atualize o email do utilizador
            UtilizadorModel.update2(req.body, (error, dados) => {
                if (error) {
                    console.log("Erro ao atualizar o email do utilizador:", error);
                    return res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                    });
                }
                console.log("Email do utilizador alterado com sucesso!");
                return res.status(200).json({ message: 'Perfil editado com sucesso!' });
            });
        });
    });
};



exports.update3 = async (req, res) => {
    // Verifique se o corpo da solicitação contém os campos necessários (Old, New e Id)
    if (!req.body.Old || !req.body.New || !req.body.Id) {
        return res.status(400).send({ message: "Por favor preencha todos os campos." });
    }
    
    // Encontre o utilizador pelo ID
    UtilizadorModel.FindById(req.body.Id, async (err, utilizador) => {
        if (err) {  
            console.log("Erro ao buscar o utilizador:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
        }
    
        if (!utilizador) {
            // utilizador não encontrado com o ID fornecido
            return res.status(404).send({ message: "Utilizador não encontrado com o ID fornecido." });
        }

        try {
            // Compare a password antiga com a password hash do utilizador
            const match = await bcrypt.compare(req.body.Old, utilizador[0].Password);
            if (!match) {
                return res.status(400).send({ message: "A password atual não corresponde à password do utilizador." });
            }

            // Verifique se a nova password tem pelo menos 6 caracteres
            if (req.body.New.length < 6) {
                return res.status(400).send({ message: "A sua password tem de ter no mínimo 6 caracteres." });
            }

            // Hash a nova password antes de atualizar
            const hashedPassword = await bcrypt.hash(req.body.New, saltRounds);
            
            // Atualize a password do utilizador
            UtilizadorModel.update3({ ...req.body, New: hashedPassword }, (error, dados) => {
                if (error) {
                    console.log("Erro ao atualizar a password do utilizador:", error);
                    return res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                    });
                }
                console.log("Password do utilizador alterada com sucesso!");
                return res.status(200).json({ message: 'Perfil editado com sucesso!' });
            });
        } catch (error) {
            console.log("Erro ao comparar passwords:", error);
            return res.status(500).send({ message: "Ocorreu um erro ao comparar passwords." });
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
        else res.status(200).json({ message: 'Utilizador eliminado com sucesso!' });

    });
};