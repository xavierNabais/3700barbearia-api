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
module.exports = Login;