//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Servico = function (data) {
    this.id = data.id,
    this.nome = data.nome,
    this.preco = data.preco,
    this.duracao = data.duracao,
    this.ativo = data.ativo

} 

//Model Procurar Serviços
Servico.getAll = result => {
    sql.query('SELECT * FROM servico', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Serviços Ativos
Servico.getActive = result => {
    sql.query('SELECT * FROM servico WHERE ativo=1', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar ID Serviço
Servico.FindById = (id, result) => {
    sql.query('SELECT * FROM servico WHERE ID=?', [id], (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        
        if (res.length > 0) {
            result(null, res);
        } else {
            result("Serviço não encontrado", null);
        }
    });
};


//Model Criar Serviço
Servico.create = (novoServico, result) => {
    sql.query('INSERT INTO servico SET ?', novoServico, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Serviço criado com sucesso!");
        result(null,res);
    });
};


//Model Atualizar Serviço
Servico.update = (dados, result) => {
    sql.query('UPDATE servico SET nome=?, preco=?, duracao=?, ativo=? WHERE id=?', [dados.nome, dados.preco, dados.duracao, dados.ativo, dados.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Serviço alterado com sucesso!");
        result(null,res);
    });
};






//Model Eliminar Serviço
Servico.remove = (id, result) => {
    sql.query('DELETE FROM servico WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Serviço eliminado com sucesso!");
        result(null,res);
    });
};
module.exports = Servico;