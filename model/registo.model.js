const { DataTypes } = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcrypt");

// Definição do modelo utilizando Sequelize
const NovoRegisto = db.define(
  "utilizadores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pontos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false, 
    tableName: 'utilizadores' 
  }
);

// Função para criar um novo cliente
NovoRegisto.createCliente = async (novoRegisto) => {
  try {
    // Verifica se o cliente já existe pelo email
    const existingClient = await NovoRegisto.findOne({ where: { email: novoRegisto.email } });
    if (existingClient) {
      throw new Error("Email já cadastrado");
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(novoRegisto.password, 10);

    // Cria o novo cliente
    const createdClient = await NovoRegisto.create({
      email: novoRegisto.email,
      password: hashedPassword,
      cargo: novoRegisto.cargo,
      pontos: novoRegisto.pontos,
    });

    console.log("Cliente criado com sucesso!");
    return createdClient;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

// Função para procurar clientes pelo ID
NovoRegisto.findByID = async (id) => {
  try {
    const client = await NovoRegisto.findByPk(id);
    if (!client) {
      throw new Error("Cliente não encontrado");
    }
    return client;
  } catch (error) {
    console.error("Erro ao procurar cliente pelo ID:", error);
    throw error;
  }
};

module.exports = NovoRegisto;
