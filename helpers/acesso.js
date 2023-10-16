module.exports = {
    eUsuario: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }
        res.render("naoUsuario")
    },

    eAdmin:  (req, res, next) => {
        if(req.isAuthenticated()){
            if(req.user.dataValues.perfil_id == 2){
                return next()
            }
        }
        res.render("naoAdmin")
    }
}