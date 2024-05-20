const UtilizadorModel = require("../model/utilizador.model.js");
var path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const nodemailer = require('nodemailer');

//Controller Procurar Utilizadores
exports.findAll = (req, res) => {
    UtilizadorModel.getAll((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
        });
        else res.json(dados);

    });
};

//Controller Procurar Utilizadores
exports.findWorkers = (req, res) => {
    UtilizadorModel.getWorkers((error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados dos utilizadores"
        });
        else res.json(dados);

    });
};
//Controller Procurar ID Utilizador
exports.findById = (req, res) => {
    const userId = req.params.id;
    UtilizadorModel.FindById(userId, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
        });
        else res.json(dados);      

    });
};

// Controller Criar Utilizador
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
        return;
    }
    const saltRounds = 10;
    const pwHashed = bcrypt.hashSync(req.body.password, saltRounds);
    const utilizador = new UtilizadorModel({
        nome: req.body.nome,
        apelido: req.body.apelido,
        username: req.body.username,
        email: req.body.email,
        password: pwHashed,
        telemovel: req.body.telemovel,
        pontos: req.body.pontos,
        cargo: req.body.cargo
    });

    UtilizadorModel.create(utilizador, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Ocorreu um erro ao tentar criar um utilizador."
            });
            return;
        } else {
            data.id = data.insertId;
            res.json(data);
        }
    });
};



exports.update = async (req, res) => {
    // Verificar se a password está presente na requisição
    if (req.body.Password != undefined) {
        // Hash da password com bcrypt
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
            // Atualizar a password encriptada nos dados da requisição
            req.body.Password = hashedPassword;

            // Chamar o model para atualizar o utilizador com a password encriptada
            UtilizadorModel.update(req.body, (error, dados) => {
                if (error)
                res.status(500).send({
                    message:
                    error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                });
                else res.status(200).json({ message: 'Perfil editado com sucesso!' });
            });

    } else {
        console.log(req.body);

        UtilizadorModel.update(req.body, (error, dados) => {
            if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
            });
            else res.status(200).json({ message: 'Perfil editado com sucesso!' });
        });
    }
};

// Controller Atualizar Utilizador STEP 1
exports.update1 = (req, res) => {
    // Verificar se o corpo da solicitação contém os campos obrigatórios (Nome, Apelido e Username)
    if (!req.body.Nome || !req.body.Apelido || !req.body.Username) {
        return res.status(400).send({ message: "Os campos 'Nome', 'Apelido' e 'Username' são obrigatórios." });
    }

    // Verificar se o username já está em uso por outro utilizador
    UtilizadorModel.FindUsername(req.body.Username, (err, existingUser) => {
        if (err) {
            console.log("Erro ao verificar o username:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao verificar o username." });
        }

        if (existingUser && existingUser.length != 0 && existingUser[0].Id != req.params.id) {
            return res.status(400).send({ message: "O username já está em uso por outro utilizador." });
        }

        // Se o username não estiver em uso por outro utilizador, prosseguir com a atualização do perfil do utilizador
        UtilizadorModel.FindById(req.params.id, (err, userToUpdate) => {
            if (err) {
                console.log("Erro ao buscar o utilizador:", err);
                return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
            }

            if (!userToUpdate) {
                return res.status(404).send({ message: "Utilizador não encontrado com o ID fornecido." });
            }

            // Verificar se o username a ser atualizado é igual ao username atual do utilizador
            if (req.body.Username === userToUpdate.Username) {
                // Atualizar apenas o nome e o apelido
                const updatedUserData = {
                    Nome: req.body.Nome,
                    Apelido: req.body.Apelido,
                    Id: req.params.id,
                };

                // Atualizar o perfil do utilizador com os novos dados
                UtilizadorModel.update1(updatedUserData, (error, dados) => {
                    if (error) {
                        console.log("Erro ao atualizar o perfil do utilizador:", error);
                        return res.status(500).send({
                            message: error.message || "Ocorreu um erro ao tentar atualizar o perfil do utilizador."
                        });
                    }
                    return res.status(200).json({ message: 'Perfil editado com sucesso!' });
                });
            } else {
                // Se o username foi alterado, atualizar também o username
                const updatedUserData = {
                    Nome: req.body.Nome,
                    Apelido: req.body.Apelido,
                    Username: req.body.Username,
                    Id: req.params.id,
                };

                // Atualizar o perfil do utilizador com os novos dados
                UtilizadorModel.update1(updatedUserData, (error, dados) => {
                    if (error) {
                        console.log("Erro ao atualizar o perfil do utilizador:", error);
                        return res.status(500).send({
                            message: error.message || "Ocorreu um erro ao tentar atualizar o perfil do utilizador."
                        });
                    }
                    return res.status(200).json({ message: 'Perfil editado com sucesso!' });
                });
            }
        });
    });
};


// Controller Atualizar Utilizador STEP 2
exports.update2 = (req, res) => {
    // Verifique se o corpo da solicitação contém os campos necessários (Old e New)
    if (!req.body.Old || !req.body.New || !req.body.Id) {
        return res.status(400).send({ message: "Por favor preencha todos os campos." });
    }
    // Encontre o utilizador pelo ID
    UtilizadorModel.FindById(req.body.Id, (err, utilizador) => {
        if (err) {  
            console.log("Erro ao buscar o utilizador:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
        }
    
        if (!utilizador) {
            // utilizador não encontrado com o ID fornecido
            return res.status(404).send({ message: "Utilizador não encontrado com o ID fornecido." });
        }

        // Verifique se o email antigo é igual ao email do utilizador
        if (req.body.Old !== utilizador[0].Email) {
            return res.status(400).send({ message: "O email atual não corresponde ao email do utilizador." });
        }

        // Verifique se o novo email já está em uso por outro utilizador
        UtilizadorModel.FindEmail(req.body.New, (err, existingUser) => {
            if (err) {
                console.log("Erro ao buscar o utilizador pelo novo email:", err);
                return res.status(500).send({ message: "Ocorreu um erro ao verificar o novo email." });
            }

            if (existingUser && existingUser.length !== 0) {
                return res.status(400).send({ message: "O novo email já está em uso por outro utilizador." });
            }

            // Atualize o email do utilizador
            UtilizadorModel.update2(req.body, (error, dados) => {
                if (error) {
                    console.log("Erro ao atualizar o email do utilizador:", error);
                    return res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                    });
                }
                console.log("Email do utilizador alterado com sucesso!");
                return res.status(200).json({ message: 'Perfil editado com sucesso!' });
            });
        });
    });
};



exports.update3 = async (req, res) => {
    // Verifique se o corpo da solicitação contém os campos necessários (Old, New e Id)
    if (!req.body.Old || !req.body.New || !req.body.Id) {
        return res.status(400).send({ message: "Por favor preencha todos os campos." });
    }
    
    // Encontre o utilizador pelo ID
    UtilizadorModel.FindById(req.body.Id, async (err, utilizador) => {
        if (err) {  
            console.log("Erro ao buscar o utilizador:", err);
            return res.status(500).send({ message: "Ocorreu um erro ao buscar o utilizador." });
        }
    
        if (!utilizador) {
            // utilizador não encontrado com o ID fornecido
            return res.status(404).send({ message: "Utilizador não encontrado com o ID fornecido." });
        }

        try {
            // Compare a password antiga com a password hash do utilizador
            const match = await bcrypt.compare(req.body.Old, utilizador[0].Password);
            if (!match) {
                return res.status(400).send({ message: "A password atual não corresponde à password do utilizador." });
            }

            // Verifique se a nova password tem pelo menos 6 caracteres
            if (req.body.New.length < 6) {
                return res.status(400).send({ message: "A sua password tem de ter no mínimo 6 caracteres." });
            }

            // Hash a nova password antes de atualizar
            const hashedPassword = await bcrypt.hash(req.body.New, saltRounds);
            
            // Atualize a password do utilizador
            UtilizadorModel.update3({ ...req.body, New: hashedPassword }, (error, dados) => {
                if (error) {
                    console.log("Erro ao atualizar a password do utilizador:", error);
                    return res.status(500).send({
                        message: error.message || "Ocorreu um erro ao tentar atualizar os dados do utilizador"
                    });
                }
                console.log("Password do utilizador alterada com sucesso!");
                return res.status(200).json({ message: 'Perfil editado com sucesso!' });
            });
        } catch (error) {
            console.log("Erro ao comparar passwords:", error);
            return res.status(500).send({ message: "Ocorreu um erro ao comparar passwords." });
        }
    });
};




//Controller Eliminar Utilizador
exports.remove = (req, res) => {
    const id = req.params.id;
    UtilizadorModel.remove(id, (error, dados) => {
        if (error)
        res.status(500).send({
            message:
            error.message || "Ocorreu um erro ao tentar eliminar os dados do utilizador"
        });
        else res.status(200).json({ message: 'Utilizador eliminado com sucesso!' });

    });
};


//Controller Atribuir 1 Ponto ao Utilizador
exports.complete = (req,res) => {
    const id = req.params.id;
    UtilizadorModel.complete(id, (error) => {
        if (error)
            res.status(500).send({
                message:
                error.message || "Ocorreu um erro ao tentar atribuir o ponto ao utilizador"
            });

            UtilizadorModel.FindById(id, (err, user) => {

                if (err) {
                    console.error('Erro ao encontrar utilizador:', err);
                    return res.status(500).send({
                        message: "Erro ao encontrar o utilizador com o ID " + id
                    });
                }
    
                // Verifique se o utilizador foi encontrado
                if (!user) {
                    return res.status(404).send({
                        message: "Utilizador não encontrado com o ID " + id
                    });
                }
                const emailUtilizador = user[0].Email;
                const nomeUtilizador = user[0].Nome;
    

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'xavinabais0@gmail.com',
                    pass: 'elsr zmxa bexm mcvd'
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
                          <td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">Marcação Concluída</h2></td>
                         </tr>
                         <tr>
                         </tr>
                         <tr>
                         <br>
                         <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px;text-align:center">Olá, ${nomeUtilizador}. O teu agendamento foi concluído com sucesso!</p>
                         <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px;text-align:center">Atribuimos-te um ponto no nosso sistema de recompensa.</p>
                            <br>
                         </tr>
                         <tr>
                          <td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#5c68e2;background:#f2b802;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#f2b802;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;mso-padding-alt:0;mso-border-alt:10px solid #f2b802;padding-left:30px;padding-right:30px">VER RECOMPENSA</a></span></td>
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
                    res.status(200).json({ message: 'Ponto atribuido com sucesso!' });
                }
            });
            });
        });
};
