const LoginModel = require("../model/login.model");


//Controller Verificação Login
exports.getUser = (req, res) => {
    LoginModel.findUser(req, (error, dados, verification) => {
        if (error) {
            if (verification === 1){
                res.status(500).send({
                    message: error.message || "Password incorreta"
                });
            } else if (verification === 2){
                res.status(500).send({
                    message: error.message || "Email incorreto"
                });
            } else {
                res.status(500).send({
                    message: error.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
                });
            }
        }   else {
            if (dados && dados.length > 0) {
                req.session.userId = dados[0].Id;
                res.status(200).send({
                    message: "Credenciais válidas",
                    userId: dados[0].Id,
                    userName: dados[0].Nome,
                    type: dados[0].Cargo
                });
            } else {
                res.status(401).send({
                    message: "Credenciais inválidas"
                });
            }
        }
        
    });
};

//Controller Verificação Login Google
exports.getUserGoogle = (req, res) => {
    LoginModel.findUserGoogle(req, (error, dados) => {
        if (error) {
                res.status(500).send({
                    message: error.message || "Ocorreu um erro ao tentar aceder aos dados do utilizador"
                });
        }   else {
            if (dados && dados.length > 0) {
                req.session.userId = dados[0].Id;
                res.status(200).send({
                    message: "Credenciais válidas",
                    userId: dados[0].Id,
                    userName: dados[0].Nome,
                    type: dados[0].Cargo
                });
            } else {
                res.status(401).send({
                    message: "Credenciais inválidas"
                });
            }
        }
        
    });
};