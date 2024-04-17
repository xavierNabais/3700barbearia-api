//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Utilizador = function (data) {
    this.id = data.id,
    this.nome = data.nome,
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

//Model Procurar ID Utilizador
Utilizador.FindById = (id, result) => {
    sql.query('SELECT * FROM utilizadores WHERE ID=?', [id], (error, res) => {
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
    sql.query('UPDATE utilizadores SET nome=?, email=?, password=?, telemovel=?, pontos=?, cargo=? WHERE id=?', [dados.nome, dados.email, dados.password, dados.telemovel, dados.pontos, dados.cargo, dados.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Utilizador alterado com sucesso!");
        result(null,res);
    });
};


//Model Atualizar Utilizador STEP 1
Utilizador.update1 = (dados, result) => {
    sql.query('UPDATE utilizadores SET Nome=?, Apelido=?, Username=? WHERE id=?', [dados.Nome, dados.Apelido, dados.Username, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Utilizador alterado com sucesso!");
        result(null,res);
    });
};

//Model Atualizar Utilizador STEP 1
Utilizador.update2 = (dados, result) => {
    sql.query('UPDATE utilizadores SET Email=? WHERE id=?', [dados.New, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Utilizador alterado com sucesso!");
        result(null,res);
    });
};

//Model Atualizar Utilizador STEP 1
Utilizador.update3 = (dados, result) => {
    sql.query('UPDATE utilizadores SET Nome=?, Apelido=?, Username=? WHERE id=?', [dados.Nome, dados.Apelido, dados.Username, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Utilizador alterado com sucesso!");
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