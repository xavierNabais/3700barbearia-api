const marcacoesModel = require("../model/marcacoes.model.js");
const utilizadorModel = require("../model/utilizador.model.js");
const barbeiroModel = require("../model/barbeiro.model.js");
const servicoModel = require("../model/servico.model.js");

var path = require('path');

//Controller Procurar Marcações
exports.findAll = (req, res) => {
    marcacoesModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
        });
        else res.json(dados);   

    });
};


// Controller Procurar Marcações De User Específico
exports.findSpecific = (req, res) => {
    marcacoesModel.getSpecific(req, (error, dados) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
            });
            return;
        }

        // Função para formatar a data
        const formatarData = (data) => {
            const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
            const dataFormatada = new Date(data);
    
            const diaSemana = diasSemana[dataFormatada.getDay()];
            const dia = String(dataFormatada.getDate()).padStart(2, '0');
            const mes = String(dataFormatada.getMonth() + 1).padStart(2, '0');
            const ano = dataFormatada.getFullYear();
            const horas = String(dataFormatada.getHours()).padStart(2, '0');
            const minutos = String(dataFormatada.getMinutes()).padStart(2, '0');
    
            return `${diaSemana}, ${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
        };

            // Função para buscar o nome do barbeiro
            const getBarberName = (id_barbeiro) => {
                return new Promise((resolve, reject) => {
                    barbeiroModel.FindById(id_barbeiro, (error, barbeiros) => {
                        if (error) {
                            reject(error);
                        } else {
                            if (barbeiros.length > 0) {
                                resolve(barbeiros[0].Nome);
                            } else {
                                resolve(null);
                            }
                        }
                    });
                });
            };


        // Função para buscar o nome e o preço do serviço
        const getServicoInfo = (id_servico) => {
            return new Promise((resolve, reject) => {
                servicoModel.FindById(id_servico, (error, servico) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ nome: servico[0].Nome, preco: servico[0].Preco });
                    }
                });
            });
        };

            // Função assíncrona para buscar todas as informações necessárias e formatar os dados
            const processarDados = async () => {
                for (const marcacao of dados) {
                    marcacao.Data = formatarData(marcacao.Data);
                    const nomeBarbeiro = await getBarberName(marcacao.Id_barbeiro);
                    marcacao.nomeBarbeiro = nomeBarbeiro !== null ? nomeBarbeiro : "Nome não encontrado";
                    const infoServico = await getServicoInfo(marcacao.Id_servico);
                    marcacao.nomeServico = infoServico.nome;
                    marcacao.precoServico = infoServico.preco;
                }
                res.json(dados);
            };


        // Executar o processamento assíncrono
        processarDados().catch(error => {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao processar os dados das marcações"
            });
        });
    });
};



//Controller Procurar Marcação Consoante ID
exports.findById = (req, res) => {
    marcacoesModel.FindById(req, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
        });
        else servicoModel.getActive((error, servico) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços ativos"
                    });
                } else {
                    barbeiroModel.getActive((error, barbeiro) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos barbeiros ativos"
                            });
                        } else {
                            utilizadorModel.getAll((error, utilizador) => {
                                if (error) {
                                    res.status(500).send({
                                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
                                    });
                                } else {
                                    res.render(path.resolve('views/pages/administrador/marcacoes/update.ejs'), { utilizador, barbeiro, servico, dados});  
                                }
                            }); 
                        }
                    });  
                }
            });
    });
};
exports.getActive = (req, res) => {
    utilizadorModel.getAll((error, utilizador) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores ativos"
            });
        } else {
            barbeiroModel.getActive((error, barbeiro) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos barbeiros ativos"
                    });
                } else {
                    servicoModel.getActive((error, servico) => {
                        if (error) {
                            res.status(500).send({
                                message: error.message || "Ocorreu um erro ao tentar aceder aos dados dos serviços ativos"
                            });
                        } else {
                            res.render(path.resolve('views/pages/administrador/marcacoes/create.ejs'), { utilizador, barbeiro, servico });  
                        }
                    });
                }
            });
        }
    });
};




//Controller Criar Marcação
exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    const marcacao = new marcacoesModel ({
        id_barbeiro: req.body.barbeiro,
        id_utilizador: req.body.utilizador,
        id_servico: req.body.servico,
        data: req.body.data,
        notas: req.body.notas,
    });

    marcacoesModel.create(marcacao, (error, data) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar criar uma marcação."
        });
        else
        marcacoesModel.getAll((error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
            });
            else res.render(path.resolve('views/pages/administrador/marcacoes/index.ejs'), { dados });   
        });
    });
};


//Controller Atualizar Marcação
exports.update = (req, res) => {
    marcacoesModel.update(req.body, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar atualizar os dados da marcação"
        });
        else res.redirect('/painel/marcacoes');  

    });
};


//Controller Eliminar Marcação
exports.remove = (req, res) => {
    const id = req.params.id; 
    marcacoesModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados da marcação"
        });
        else res.redirect('/painel/marcacoes'); 

    });
};