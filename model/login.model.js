//importação da ligação à base de dados
const sql = require('./conexao.db');
const bcrypt = require('bcrypt');

//definição da tabela na bd de forma abstrata
const Login = function (data) {
    this.email = data.email;
    this.password = data.password;
};

// Model Procurar Utilizador
Login.findUser = (user, result) => {
    sql.query('SELECT * FROM utilizadores WHERE email = ?', user.body.email, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        if (res.length) {
            const utilizador = res[0];
            const senhaFornecida = user.body.password;
            bcrypt.compare(senhaFornecida, utilizador.Password, (err, bcryptResult) => {
                if (err) {
                    console.log('error', err);
                    // Lidar com erros na comparação
                    result(err, null);
                } else if (bcryptResult) {
                    console.log(" Password correta");
                    // Password correta, retorna o utilizador encontrado
                    result(null, res);
                } else {
                    // Password incorreta
                    console.log(" Password incorreta");
                    verification = 1;
                    result(verification, null);
                }
            });
        } else {
            verification = 2;
            result(verification, null);
        }
    });
};

// Model Procurar Utilizador
// Model Procurar Utilizador
Login.findUserGoogle = (user, result) => {
    const data = user.body.accessData;
    sql.query('SELECT * FROM utilizadores WHERE email = ?', data.email, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        if (res.length) {
            console.log("Password correta");
            console.log(res);
            // Password correta, retorna o utilizador encontrado
            result(null, res);
        } else {
            // Email não existe na base de dados, cria uma nova conta

            // Extrai o nome e o apelido do objeto de dados
            const nome = data.given_name;
            const apelido = data.family_name;

            // Gere uma senha aleatória
            const randomPassword = generateRandomPassword(10);

            // Hash a senha aleatória usando bcrypt
            bcrypt.hash(randomPassword, 10, (err, hash) => {
                if (err) {
                    console.log("Erro ao gerar o hash da senha:", err);
                    result(err, null);
                    return;
                }

                // Salve a nova conta de usuário com o hash da senha gerada, nome e apelido
                sql.query('INSERT INTO utilizadores (nome, apelido, email, password) VALUES (?, ?, ?, ?)', [nome, apelido, data.email, hash], (error, res) => {
                    if (error) {
                        console.log("error: ", error);
                        result(error, null);
                        return;
                    }
                
                    console.log("Nova conta criada com sucesso");
                
                    // Recupera os dados do usuário recém-criado
                    sql.query('SELECT * FROM utilizadores WHERE id = ?', res.insertId, (error, user) => {
                        if (error) {
                            console.log("error: ", error);
                            result(error, null);
                            return;
                        }
                
                        // Retorna os dados completos do usuário recém-criado
                        result(null, user);
                    });
                });                
            });
        }
    });
};


// Função para gerar uma senha aleatória
function generateRandomPassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

module.exports = Login;