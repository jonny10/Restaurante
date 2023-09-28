const localStrategy = require("passport-local").Strategy
const Usuario = require("../models/Usuario")
const bcrypt  = require ('bcryptjs')

module.exports = (passport) => {
    passport.use(new localStrategy({usernameField: "email", passwordField: "senha"}, (email, senha, done) => {
        Usuario.findOne({
            where: {
                email: email
            }
        }).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: "Essa conta não existe"})
            }
            bcrypt.compare(senha, usuario.senha, (erro, coincidem) => {
                if(coincidem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findByPk(id, (err, usuario) => {
            done(err, usuario)
            console.log("foi?")
        })
    })
}