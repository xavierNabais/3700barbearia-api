const sequelize = require("../config/database");
const Auth = require("../model/login.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const { Op } = require("sequelize");

const controllers = {};

controllers.register = async (req, res) => {
  const { nome, username, email, password } = req.body;

  try {
    // Verificar se já existe um usuário com o mesmo username ou email
    const existingUser = await Auth.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists.",
      });
    }

    // Se não houver usuário existente, criar um novo
    const newUser = await Auth.create({
      nome: nome,
      username: username,
      email: email,
      password: password,
    });

    res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while registering user.",
    });
  }
};

controllers.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const auth = await Auth.findOne({ where: { email: email } });

    if (!auth) {
      console.log('Email não encontrado:', email);
      res.status(403).json({
        success: false,
        message: "Email não encontrado",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, auth.password);

    if (isMatch) {
      console.log('Login bem-sucedido para o email:', email);
      let token = jwt.sign(
        {
          email: email,
          userName: auth.nome,
          userId: auth.id,
          admin: auth.cargo,
        },
        config.secret,
        { expiresIn: config.timer }
      );
      res.status(200).json({
        success: true,
        token: token,
      });
    } else {
      console.log('Senha incorreta para o email:', email);
      res.status(403).json({
        success: false,
        message: "A password está incorreta.",
      });
    }
  } catch (error) {
    console.error('Erro ao executar operação:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro na execução da operação.",
    });
  }
};

controllers.getUserGoogle = async (req, res) => {
  try {
      const dados = await Auth.findByGoogleEmail(req);
      if (dados.user) {
          const { user } = dados;
          let token = jwt.sign(
              {
                  email: user.email,
                  userId: user.id,
                  userName: user.nome,
                  admin: user.admin,
              },
              config.secret,
              { expiresIn: config.timer }
          );

          res.status(200).send({
            message: "Credenciais válidas",
            token: token,
        });

      } else {
          res.status(401).send({
              message: "Credenciais inválidas"
          });
      }
  } catch (error) {
      res.status(500).send({
          message: error.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
      });
  }
};


controllers.refreshToken = async (req, res) => {};

controllers.logout = async (req, res) => {};

module.exports = controllers;
