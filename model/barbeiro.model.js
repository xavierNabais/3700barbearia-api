//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Barbeiro = function (data) {
    this.id = data.id,
    this.nome = data.nome,
    this.descricao = data.descricao,
    this.especializacao = data.especializacao,
    this.ativo = data.ativo

} 

//Model Procurar Serviços
Barbeiro.getAll = result => {
    sql.query('SELECT * FROM barbeiros', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Serviços Ativos
Barbeiro.getActive = result => {
    sql.query('SELECT * FROM barbeiros WHERE ativo=1', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar ID Barbeiro
Barbeiro.FindById = (id, result) => {
    sql.query('SELECT * FROM barbeiros WHERE ID=?', [id], (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        
        if (res.length > 0) {
            result(null, res);
        } else {
            result("Barbeiro não encontrado", null);
        }
    });
};


//Model Criar Barbeiro
Barbeiro.create = (novoBarbeiro, result) => {
    sql.query('INSERT INTO barbeiros SET ?', novoBarbeiro, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Barbeiro criado com sucesso!");
        result(null,res);
    });
};


//Model Atualizar Barbeiro
Barbeiro.update = (dados, result) => {
    sql.query('UPDATE barbeiros SET nome=?, descricao=?, especializacao=?, ativo=? WHERE id=?', [dados.nome, dados.descricao, dados.especializacao, dados.ativo, dados.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Barbeiro alterado com sucesso!");
        result(null,res);
    });
};






//Model Eliminar Barbeiro
Barbeiro.remove = (id, result) => {
    sql.query('DELETE FROM barbeiros WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Barbeiro eliminado com sucesso!");
        result(null,res);
    });
};



module.exports = Barbeiro;