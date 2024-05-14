const sequelize = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcrypt");

const Utilizador = db.define(
  "utilizadores",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: sequelize.STRING,
      allowNull: true,
    },
    nome: {
      type: sequelize.STRING,
      allowNull: false,
    },
    apelido: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    pontos: {
      type: sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    },
    cargo: {
      type: sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    },
  },
  {
    timestamps: false, 
    tableName: 'utilizadores' 
  }
);

// Função para gerar uma password aleatória
function generateRandomPassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

// Model Procurar Utilizador pelo email e senha
Utilizador.getUser = async (email, password) => {
  try {
    const user = await Utilizador.findOne({ where: { email: email } });

    if (!user) {
      return { error: "Email não encontrado" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Senha incorreta" };
    }

    return { user };
  } catch (error) {
    console.error("Erro ao procurar usuário:", error);
    throw new Error("Erro ao procurar usuário");
  }
};

// Model Procurar Utilizador pelo email do Google
Utilizador.findByGoogleEmail = async (email) => {
  try {
    const userEmail = email.body.accessData.email;
    const givenName = email.body.accessData.given_name;
    const familyName = email.body.accessData.family_name;

    let user = await Utilizador.findOne({ where: { email: userEmail } });
    if (!user) {
      // Se o usuário não existir, cria uma nova conta
      const randomPassword = generateRandomPassword(10);
      const hash = await bcrypt.hash(randomPassword, 10);

      user = await Utilizador.create({
        nome: givenName,
        apelido: familyName,
        email: userEmail,
        password: hash
      });
    }
    return { user };

  } catch (error) {
    console.error("Erro ao procurar usuário pelo email do Google:", error);
    throw new Error("Erro ao procurar usuário pelo email do Google");
  }
};

module.exports = Utilizador;
