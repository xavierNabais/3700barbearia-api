//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const novoRegisto = function (data) {
    this.email = data.email,
    this.password = data.password,
    this.cargo = 0
} 

// Model Criar Cliente
novoRegisto.create = (novoRegisto, result) => {
    console.log(novoRegisto);
    // Verificações Cliente Existente (Email)
    sql.query('SELECT * FROM utilizadores WHERE Email=?', [novoRegisto.email], (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        // Se existir Email
        if (res.length >= 1) {
            error = 2;
            result(error);
        } else {
            // Se não existir Email, insere o novo cliente no banco de dados
            sql.query('INSERT INTO utilizadores SET ?', novoRegisto, (error, res) => {
                if (error) {
                    console.log("error: ", error);
                    result(null, error);
                    return;
                }
                console.log("Cliente criado com sucesso!");
                result(null, res);
            });
        };
    });
};


//Model Procurar Clientes Consoante Username
novoRegisto.FindByUsername = (id, result) => {
    sql.query('SELECT * FROM utilizadores WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log('este'.res);
        result(null,res);
    });
};



module.exports = novoRegisto;