const UtilizadorModel = require("../model/utilizador.model");

const isAdmin = (req, res, next) => {
  if (req.session.userId) {
    UtilizadorModel.FindById(req.session.userId, (error, user) => {
      if (error) {
        res.status(500).send("Erro ao verificar permissões de administrador.");
      } else if (user && user[0].admin === 1) {
        next(); 
      } else {
        res.status(403).send("Acesso negado. Você não é um administrador.");
      }
    });
  } else {
    res.redirect('/login'); 
  }
};

module.exports = isAdmin;