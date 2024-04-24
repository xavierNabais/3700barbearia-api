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

Marcacoes.getByDate = (data, result) => {
            // Quebrando a data em ano, mês e dia
            const partesData = data.split('-');
            let ano = partesData[0];
            let mes = parseInt(partesData[1]);
            let dia = parseInt(partesData[2]);

            // Incrementando o mês e adicionando zeros à esquerda, se necessário
            if (mes < 10) {
                mes = '0' + mes; // Adiciona zero à esquerda se o mês for menor que 10
            }

            // Adicionando zeros à esquerda ao dia, se necessário
            if (dia < 10) {
                dia = '0' + dia; // Adiciona zero à esquerda se o dia for menor que 10
            }

            // Formatando a nova data
            let Data = `${ano}-${mes}-${dia}`;
            let consulta = 'SELECT * FROM marcacoes WHERE DATE(Data) = ?';
            sql.query(consulta, [Data], (error, res) => {
                if (error) {
                    console.log("Erro: ", error);
                    result(null, error);
                    return;
                }
                console.log(res);
                result(null, res);
            });
        }

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
            result("Marcação não encontrada", null);
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

        console.log("Marcação criada com sucesso!");
        result(null,res);
    });
};


//Model Atualizar Marcação
Marcacoes.update = (dados, result) => {
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

        console.log("Marcação eliminada com sucesso!");
        result(null,res);
    });
};

module.exports = Marcacoes;