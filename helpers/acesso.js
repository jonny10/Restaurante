module.exports = {
    eUsuario: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }
        res.send("Ce nao ta logado pai, loga ae faz favor")
    },

    eAdmin:  (req, res, next) => {
        if(req.isAuthenticated()){
            if(req.user.dataValues.perfil_id == 2){
                return next()
            }
        }
        res.send("Sai fora fi, ce nao tem autoridade pra fica aqui!")
    }
}