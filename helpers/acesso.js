module.exports = {
    eUsuario: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }
        res.render("main/naoUsuario")
    },

    eAdmin:  (req, res, next) => {
        if(req.isAuthenticated()){
            if(req.user.dataValues.perfil_id == 2){
                return next()
            }
        }
        res.render("main/naoAdmin")
    },

    begEnough: (req, res, next) => {
        if(req.app.locals.beg) {
            return next()
        } else {
            req.flash("error_msg", "Adicione ao menos 1 item a sua sacola!")
            res.redirect('/')
        }
    }
}