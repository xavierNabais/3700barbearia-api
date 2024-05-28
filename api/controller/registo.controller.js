const RegistoModel = require("../model/registo.model.js");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


exports.create = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "O conteúdo não pode estar vazio!"
            });
        }

        // Verifica se o e-mail já está cadastrado
        const existingClient = await RegistoModel.findOne({ where: { email: req.body.email } });
        if (existingClient) {
            return res.status(500).send({
                message: "E-mail já cadastrado!"
            });
        }

        // Cria o novo cliente
        const createdClient = await RegistoModel.createCliente({
            email: req.body.email,
            password: req.body.password,
        });

        let token = jwt.sign(
            {
              email: createdClient.email,
              userId: createdClient.id,
              admin: createdClient.cargo,
            },
            config.secret,
            { expiresIn: config.timer }
          );

        // Envia o novo cliente como resposta
        res.status(200).json({
            success: true,
            token: token,
          });
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(500).send({
            message: error.message || "Ocorreu um erro ao tentar criar um utilizador."
        });
    }
};
