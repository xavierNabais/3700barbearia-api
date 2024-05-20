const marcacoesModel = require("../model/marcacoes.model.js");
const utilizadorModel = require("../model/utilizador.model.js");
const barbeiroModel = require("../model/barbeiro.model.js");
const servicoModel = require("../model/servico.model.js");
const nodemailer = require('nodemailer');

var path = require('path');


// Controller Procurar Marcações
exports.findAll = (req, res) => {

    if (req.query && req.query.data) {
        const data = req.query.data;
        const barbeiro = req.query.barbeiro;
        marcacoesModel.getByDate(data,barbeiro, (erro, dados) => {
            if (erro) {
                res.status(500).send({
                    mensagem: erro.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
                });
            }
            res.json(dados);
        });
    }
    else {
    marcacoesModel.getAll((erro, dados) => {
        if (erro) {
            res.status(500).send({
                mensagem: erro.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
            });
            return;
        }

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

        const buscarDetalhesUtilizador = (marcacao) => {
            return new Promise((resolve, reject) => {
                utilizadorModel.FindById(marcacao.Id_utilizador, (erro, utilizador) => {
                    if (erro) {
                        reject(erro);
                        return;
                    }
                    marcacao.nomeUtilizador =  utilizador[0].Nome ;
                    resolve();
                });
            });
        };

        const buscarDetalhesServico = (marcacao) => {
            return new Promise((resolve, reject) => {
                servicoModel.FindById(marcacao.Id_servico, (erro, servico) => {
                    if (erro) {
                        reject(erro);
                        return;
                    }
                    marcacao.nomeServico = servico[0].Nome ;
                    resolve();
                });
            });
        };

        const buscarDetalhesBarbeiro = (marcacao) => {
            return new Promise((resolve, reject) => {
                barbeiroModel.FindById(marcacao.Id_barbeiro, (erro, barbeiro) => {
                    if (erro) {
                        reject(erro);
                        return;
                    }
                    marcacao.nomeBarbeiro = barbeiro[0].Nome ;
                    resolve();
                });
            });
        };

        const promessas = dados.map(marcacao => {
            return Promise.all([
                buscarDetalhesUtilizador(marcacao),
                buscarDetalhesServico(marcacao),
                buscarDetalhesBarbeiro(marcacao)
            ]);
        });
        Promise.all(promessas)
            .then(() => {
                dados.forEach(dado => {
                    dado.DataFormatada = formatarData(dado.Data);
                });
                res.json(dados);
            })
            .catch(erro => {
                console.error("Erro ao buscar detalhes:", erro);
                res.status(500).send({
                    mensagem: erro.message || "Ocorreu um erro ao buscar detalhes"
                });
            });
        });
    }
};

exports.findAllFrom = (req, res) => {
    const idUtilizador = req.params.id;

    // Primeiro, vamos verificar qual o ID do barbeiro com id_utilizador = idUtilizador
    barbeiroModel.findUserOfBarber(idUtilizador, (error, idBarbeiro) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados do barbeiro"
            });
            return;
        }

        // Verifica se foi encontrado um barbeiro com o id_utilizador fornecido
        if (!idBarbeiro) {
            res.status(404).send({
                message: "Barbeiro não encontrado para o id de utilizador fornecido."
            });
            return;
        }

        // Agora que temos o ID do barbeiro, podemos buscar as marcações associadas a ele
        marcacoesModel.getByBarber(idBarbeiro, (error, dados) => {
            if (error) {
                res.status(500).send({
                    message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
                });
                return;
            }

            // Agora vamos buscar os detalhes do utilizador para cada marcação
            const buscarDetalhesUtilizador = (marcacao) => {
                return new Promise((resolve, reject) => {
                    utilizadorModel.FindById(marcacao.Id_utilizador, (error, utilizador) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        marcacao.nomeUtilizador = utilizador[0].Nome;
                        resolve();
                    });
                });
            };

            // Map das promessas para buscar detalhes do utilizador para cada marcação
            const promessas = dados.map(marcacao => buscarDetalhesUtilizador(marcacao));
            // Execução das promessas
            Promise.all(promessas)
                .then(() => {
                    res.json(dados);
                })
                .catch(error => {
                    console.error("Erro ao buscar detalhes do utilizador:", error);
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao buscar detalhes do utilizador"
                    });
                });
        });
    });
};



exports.findSpecificNew = (req, res) => {
    marcacoesModel.getSpecificNew(req, async (error, dados) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
            });
            return;
        }

        // Ordenar as marcações por data
        dados.sort((a, b) => new Date(a.Data) - new Date(b.Data));

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

        // Função para obter o nome do barbeiro
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

        // Função para obter informações do serviço
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

        // Processamento dos dados
        for (const marcacao of dados) {
            // Formatar a data
            marcacao.Data = formatarData(marcacao.Data);
            // Obter o nome do barbeiro
            const nomeBarbeiro = await getBarberName(marcacao.Id_barbeiro);
            marcacao.nomeBarbeiro = nomeBarbeiro !== null ? nomeBarbeiro : "Nome não encontrado";
            // Obter informações do serviço
            const infoServico = await getServicoInfo(marcacao.Id_servico);
            marcacao.nomeServico = infoServico.nome;
            marcacao.precoServico = infoServico.preco;
        }

        // Enviar os dados formatados como resposta
        res.json(dados);
    });
};

// Controller Procurar Marcações De User Específico
exports.findSpecificOld = (req, res) => {
    marcacoesModel.getSpecificOld(req, async (error, dados) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
            });
            return;
        }

        // Ordenar as marcações por data
        dados.sort((a, b) => new Date(b.Data) - new Date(a.Data));

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

        // Função para obter o nome do barbeiro
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

        // Função para obter informações do serviço
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

        // Processamento dos dados
        for (const marcacao of dados) {
            // Formatar a data
            marcacao.Data = formatarData(marcacao.Data);
            // Obter o nome do barbeiro
            const nomeBarbeiro = await getBarberName(marcacao.Id_barbeiro);
            marcacao.nomeBarbeiro = nomeBarbeiro !== null ? nomeBarbeiro : "Nome não encontrado";
            // Obter informações do serviço
            const infoServico = await getServicoInfo(marcacao.Id_servico);
            marcacao.nomeServico = infoServico.nome;
            marcacao.precoServico = infoServico.preco;
        }

        // Enviar os dados formatados como resposta
        res.json(dados);
    });
};



// Controller Procurar Marcação Consoante ID
exports.findById = async (req, res) => {
    try {
        marcacoesModel.FindById(req.params.id, async (error, dados) => {
            if (error) {
                res.status(500).send({
                    message: error.message || "Ocorreu um erro ao buscar os dados da marcação"
                });
                return;
            }

            if (!dados) {
                res.status(404).send({ message: "Marcação não encontrada" });
                return;
            }

            // Buscar dados do utilizador
            utilizadorModel.FindById(dados.Id_utilizador, (errorUtilizador, utilizador) => {
                if (errorUtilizador) {
                    res.status(500).send({
                        message: errorUtilizador.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
                    });
                    return;
                }

                // Buscar dados do barbeiro
                barbeiroModel.FindById(dados.Id_barbeiro, (errorBarbeiro, barbeiro) => {
                    if (errorBarbeiro) {
                        res.status(500).send({
                            message: errorBarbeiro.message || "Ocorreu um erro ao tentar aceder aos dados do barbeiro"
                        });
                        return;
                    }

                    // Buscar dados do serviço
                    servicoModel.FindById(dados.Id_servico, (errorServico, servico) => {
                        if (errorServico) {
                            res.status(500).send({
                                message: errorServico.message || "Ocorreu um erro ao tentar aceder aos dados do serviço"
                            });
                            return;
                        }
                        // Retornar dados da marcação, utilizador, barbeiro e serviço
                        res.json({ dados, utilizador: utilizador[0], barbeiro: barbeiro[0], servico: servico[0] });
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocorreu um erro ao buscar os dados da marcação, utilizador, barbeiro e serviço"
        });
    }
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
                            res.json(utilizador, barbeiro, servico);  
                        }
                    });
                }
            });
        }
    });
};




// Controller Criar Marcação
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
        return;
    }

    if (req.body.service && req.body.barber && req.body.dateTime) {
        console.log(req.body);
        const idBarbeiro = req.body.barber.Id;
        const idUtilizador = req.body.utilizador;
        const idServico = req.body.service.Id;
        const dataMarcacao = req.body.dateTime;
        const notas = req.body.notas;
        marcacoesModel.getByDateAndBarber(dataMarcacao, idBarbeiro, (error, marcacaoExistente) => {
            if (error) {
                return res.status(500).send({
                    message: error.message || "Ocorreu um erro ao verificar a existência de marcações."
                });
            }
            if (marcacaoExistente.length > 0) {
                return res.status(400).send({
                    message: "Já existe uma marcação para este barbeiro nesta data."
                });
            }
            const novaMarcacao = new marcacoesModel({
                id_barbeiro: idBarbeiro,
                id_utilizador: idUtilizador,
                id_servico: idServico,
                data: dataMarcacao,
                notas: notas,
            });

            marcacoesModel.create(novaMarcacao, (error, data) => {
                if (error) {
                    return res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar criar uma marcação."
                    });
                }

                // Enviar e-mail para o utilizador
                utilizadorModel.FindById(idUtilizador, (err, user) => {
                    if (err) {
                        console.error('Erro ao encontrar o utilizador:', err);
                        return;
                    }
                    if (!user) {
                        console.error('Utilizador não encontrado.');
                        return;
                    }

                    const emailUtilizador = user[0].Email;

                    const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'SECRET_EMAIL',
                            pass: 'SECRET_PW'
                        }
                    });

                    const mailOptions = {
                        from: 'xavinabais0@gmail.com',
                        to: emailUtilizador,
                        subject: 'Confirmação de Marcação - Barbearia 3700',
                        html: `
                        <div dir="ltr" class="es-wrapper-color" lang="pt" style="background-color:#FAFAFA"><!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                            <v:fill type="tile" color="#fafafa"></v:fill>
                        </v:background>
                    <![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
                    <tr>
                    <td valign="top" style="padding:0;Margin:0">
                    <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://eipwvek.stripocdn.email/content/guids/CABINET_e79c3eaf818d38064a8b64b56fbda984943bf6d4ce06e86986dd4e0581506ed2/images/about_logo.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="185"></td>
                                 </tr>
                                 <tr>
                                  <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Barbearia 3700</h1></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                         <tr>
                          <td align="left" style="padding:20px;Margin:0">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">Marcação Confirmada</h2></td>
                                 </tr>
                                 <tr>
                                  <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${req.body.dateTime}</p></td>
                                 </tr>
                                 <tr>
                                  <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Olá, Xavier. O teu agendamento foi confirmado com sucesso!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Por favor contacta-nos em caso de dúvida.</p></td>
                                 </tr>
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#5c68e2;background:#f2b802;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#f2b802;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #f2b802;padding-left:30px;padding-right:30px">VER MARCAÇÕES</a></span></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
                           <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                             <tr>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                 <tr>
                                  <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:70px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://eipwvek.stripocdn.email/content/guids/CABINET_e79c3eaf818d38064a8b64b56fbda984943bf6d4ce06e86986dd4e0581506ed2/images/about_logo_Zi3.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;border-radius:50%" width="70"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;width:265px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><b>Serviço:</b> ${req.body.service.Nome}</p></td>
                                     </tr>
                                     <tr>
                                      <td align="left" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><b>Barbeiro:</b> ${req.body.barber.Nome}</p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:80px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:85px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="right" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${req.body.service.Preco}€</p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" style="Margin:0;padding-bottom:10px;padding-top:15px;padding-left:20px;padding-right:20px">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Enviamos este e-mail porque agendou um horário com Barbearia 3700, que tem uma parceria com <a href="https://xaviernabais.github.io/portfolio/" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#f2b802;font-size:14px">Xavier Nabais</a> para agendamentos.</p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" role="none">
                         <tr>
                          <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:600px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                                   <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://eipwvek.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://eipwvek.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://eipwvek.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                      <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://eipwvek.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">© 2024 - 3700BARBERSHOP - ALL RIGHTS RESERVED</p></td>
                                 </tr>
                                 <tr>
                                  <td style="padding:0;Margin:0">
                                   <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr class="links">
                                      <td align="center" valign="top" width="50%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Visitar</a></td>
                                      <td align="center" valign="top" width="50%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Agendar</a></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                    </table></td>
                    </tr>
                    </table>
                    </div>
                        `
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Erro ao enviar e-mail:', error);
                        } else {
                            console.log('E-mail enviado:', info.response);
                        }
                    });
                });

                marcacoesModel.getAll((error, dados) => {
                    if (error) {
                        return res.status(500).send({
                            message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações."
                        });
                    }
                    res.json(dados);
                });
            });
        });
    } else {
        const dataFormatada = new Date(req.body.data).toISOString().slice(0, 19).replace('T', ' ');
        const marcacao = new marcacoesModel({
            id_barbeiro: req.body.id_barbeiro,
            id_utilizador: req.body.id_utilizador,
            id_servico: req.body.id_servico,
            data: dataFormatada,
            notas: req.body.notas,
        });
        marcacoesModel.create(marcacao, (error, data) => {
            if (error) {
                res.status(500).send({
                    message: error.message || "Ocorreu um erro ao tentar criar uma marcação."
                });
                return;
            }

            marcacoesModel.getAll((error, dados) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar aceder aos dados das marcações"
                    });
                    return;
                }
                res.json(dados);
            });
        });
    }
};




exports.update = (req, res) => {
    const idMarcacao = req.params.id;
    const newData = req.body.dateTime; 
    const idBarbeiro = req.body.barber; 
    marcacoesModel.verifyDateAndBarber(newData, idBarbeiro, idMarcacao, (error, marcacoes) => {
        if (error) {
            console.log('1');
            return res.status(500).send({
                message: error.message || "Ocorreu um erro ao verificar a existência de marcações."
            });
        }

        if (marcacoes.length > 0) {
            console.log('2');
            return res.status(400).send({
                message: "Já existe uma marcação para este barbeiro nesta data e hora."
            });
        }

        marcacoesModel.update(req, (error) => {
            if (error) {
                console.log('3');
                res.status(500).send({
                    message: error.message || "Ocorreu um erro ao tentar atualizar os dados da marcação."
                });
            } else {
                res.status(200).json({ message: 'Marcação atualizada com sucesso!' });
            }
        });
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
        else res.status(200).json({ message: 'Marcação excluída com sucesso!' });

    });
};
