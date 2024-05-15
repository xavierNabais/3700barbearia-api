//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Utilizador = function (data) {
    this.id = data.id,
    this.nome = data.nome,
    this.apelido = data.apelido,
    this.username = data.username,
    this.email = data.email,
    this.password = data.password,
    this.telemovel = data.telemovel,
    this.pontos = data.pontos,
    this.cargo = data.cargo

} 

//Model Procurar Utilizadores
Utilizador.getAll = result => {
    sql.query('SELECT * FROM utilizadores', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};
//Model Procurar Utilizadores Funcionários
Utilizador.getWorkers = result => {
    sql.query('SELECT * FROM utilizadores WHERE cargo=2', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};
//Model Procurar Utilizadores Com Username Específico
Utilizador.FindUsername = (dados, result) => {
    sql.query('SELECT * FROM utilizadores WHERE Username=?',dados, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Utilizadores Com o Email Recebido
Utilizador.FindEmail = (dados, result) => {
    sql.query('SELECT * FROM utilizadores WHERE Email=?', dados, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar ID Utilizador
Utilizador.FindById = (id, result) => {
    sql.query('SELECT * FROM utilizadores WHERE Id=?', [id], (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        
        if (res.length > 0) {
            result(null, res);
        } else {
            result("Utilizador não encontrado", null);
        }
    });
};


//Model Criar Utilizador
Utilizador.create = (novoUtilizador, result) => {
    sql.query('INSERT INTO utilizadores SET ?', novoUtilizador, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Utilizador criado com sucesso!");
        result(null,res);
    });
};


//Model Atualizar Utilizador
Utilizador.update = (dados, result) => {
    console.log(dados);
    if (!dados.Password){
        sql.query('UPDATE utilizadores SET Nome=?, Username=?, Apelido=?, Email=?, Telemovel=?, Pontos=?, Cargo=? WHERE id=?', [dados.Nome, dados.Username, dados.Apelido, dados.Email, dados.Telemovel, dados.Pontos, dados.Cargo, dados.Id], (error,res) => {
            if (error) {
                console.log("error: ", error);
                result(null, error);
                return;
            }
            console.log("Utilizador alterado com sucesso!");
            result(null,res);
        });
    } else{
    sql.query('UPDATE utilizadores SET Nome=?, Username=?, Apelido=?, Email=?, Password=?, Telemovel=?, Pontos=?, Cargo=? WHERE id=?', [dados.Nome, dados.Username, dados.Apelido, dados.Email, dados.Password, dados.Telemovel, dados.Pontos, dados.Cargo, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Utilizador alterado com sucesso!");
        result(null,res);
    });
    }
};


//Model Atualizar Utilizador STEP 1
Utilizador.update1 = (dados, result) => {
    sql.query('UPDATE utilizadores SET Nome=?, Apelido=?, Username=? WHERE id=?', [dados.Nome, dados.Apelido, dados.Username, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Nome do utilizador alterado com sucesso!");
        result(null,res);
    });
};

//Model Atualizar Utilizador STEP 2
Utilizador.update2 = (dados, result) => {
    sql.query('UPDATE utilizadores SET Email=? WHERE id=?', [dados.New, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Email do utilizador alterado com sucesso!");
        result(null,res);
    });
};

//Model Atualizar Utilizador STEP 3
Utilizador.update3 = (dados, result) => {
    sql.query('UPDATE utilizadores SET Password=? WHERE id=?', [dados.New, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Password do utilizador alterada com sucesso!");
        result(null,res);
    });
};


//Model Eliminar Atualizador
Utilizador.remove = (id, result) => {
    sql.query('DELETE FROM utilizadores WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Utilizador eliminado com sucesso!");
        result(null,res);
    });
};


module.exports = Utilizador;