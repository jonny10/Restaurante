//Carregando os modulos dessas rotas
const express = require('express')
const router = express.Router()
const Usuario = require("../models/Usuario")
const bcrypt  = require ('bcryptjs')
const passport = require("passport")

//Cadastro
/*Rota para realizar o cadastro */
    router.get("/cadastro", function(req, res){
        res.render('usuario/cadastro')
    })

//Cadastrar
/*Rota para cadastrar o usuario no banco de dados*/
    router.post("/realizar-cadastro", function(req, res){
        cadastrar = Usuario.build(
            {
                nome: req.body.nome,
                email: req.body.email,
                perfil_id: 1,
                endereco: req.body.endereco,
                cep: req.body.cep,
                complemento: req.body.complemento,
                telefone: req.body.telefone,
                senha: req.body.senha
            }
        )

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(cadastrar.senha, salt, function(err, hash) {
                if(err){
                    res.send("Vish paizão o hash falho")
                }
                cadastrar.senha = hash

                cadastrar.save().then(
                    () => {
                        res.redirect("/")
                    }
                ).catch(
                    (erro) => {
                        res.send("Falho a inserção no bd paizão" + erro)
                    }
                )
            });
        });
    })

//Login
/*Rota para realizar o login*/
    router.get("/login", function(req, res){
        res.render('usuario/login')
    })

//Logar
/*Rota para logar o usuario no site*/
router.post("/realizar-login", (req, res, next) =>  {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

//Perfil
/*Rota para visualizar o perfil */
    router.get("/perfil",(req, res) => {
        res.render('usuario/perfil')
    })

//Pedidos
/*Rota para visualizar os pedidos */
    router.get("/pedidos",(req, res) => {
        res.render('usuario/pedidos')
    })

//exportando as rotas
module.exports = router