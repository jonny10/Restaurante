module.exports = {
    admin: (req, res, next) => {
        if(req.user){
            if(req.user.dataValues.perfil_id == 2){
                res.locals.eAdminLocal = 1
                next()
            }else{
                res.locals.eAdminLocal = null 
                next()
            }
        }else{
            next()
        }
    }
}