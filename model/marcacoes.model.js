//importação da ligação à base de dados
const sql = require('./conexao.db');

//definição da tabela na bd de forma abstrata
const Marcacoes = function (data) {
    this.id = data.id,
    this.id_barbeiro = data.id_barbeiro,
    this.id_utilizador = data.id_utilizador,
    this.id_servico = data.id_servico,
    this.data = data.data,
    this.notas = data.notas
} 

//Model Procurar Marcações
Marcacoes.getAll = result => {
    sql.query('SELECT * FROM marcacoes', (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar Marcações de Utilizador Específico
Marcacoes.getSpecificNew = (id, result) => {
    sql.query('SELECT * FROM marcacoes WHERE id_utilizador=? AND Data > CURDATE()', [id.params.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};
//Model Procurar Marcações de Utilizador Específico
Marcacoes.getSpecificOld = (id, result) => {
    sql.query('SELECT * FROM marcacoes WHERE id_utilizador=? AND Data < CURDATE()', [id.params.id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        result(null,res);
    });
};

//Model Procurar ID Marcação
Marcacoes.FindById = (id, result) => {
    sql.query('SELECT * FROM marcacoes WHERE ID=?', [id], (error, res) => {
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


//Model Criar Marcação
Marcacoes.create = (novoServico, result) => {
    sql.query('INSERT INTO marcacoes SET ?', novoServico, (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Serviço criado com sucesso!");
        result(null,res);
    });
};


//Model Atualizar Marcação
Marcacoes.update = (dados, result) => {
    console.log(dados);
    sql.query('UPDATE marcacoes SET id_barbeiro=?, id_utilizador=?, id_servico=?, data=?, notas=? WHERE id=?', [dados.Id_barbeiro, dados.Id_utilizador, dados.Id_servico, dados.Data, dados.Notas, dados.Id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        console.log("Marcação alterada com sucesso!");
        result(null,res);
    });
};






//Model Eliminar Marcação
Marcacoes.remove = (id, result) => {
    sql.query('DELETE FROM marcacoes WHERE id=?', [id], (error,res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }

        console.log("Serviço eliminado com sucesso!");
        result(null,res);
    });
};

module.exports = Marcacoes;