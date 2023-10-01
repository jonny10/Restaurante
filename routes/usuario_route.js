//Carregando os modulos dessas rotas
const express = require('express')
const router = express.Router()
const Usuario = require("../models/Usuario")
const bcrypt  = require ('bcryptjs')
const passport = require("passport")
const {eUsuario} = require("../helpers/acesso")

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
router.post("/realizar-login", 
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), (req, res) => {
        req.flash('success_msg', "Logado com sucesso")
        res.redirect('/')
    }
)

//Perfil
/*Rota para visualizar o perfil */
    router.get("/perfil", eUsuario, (req, res) => {
        res.render('usuario/perfil')
    })

//Alterar perfil
/*Rota para receber o formulário que altera as informações do usuario*/
    router.post("/alterar-perfil", eUsuario, (req, res) => {
        Usuario.update(
            {
                email: req.body.email,
                nome: req.body.nome,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                cep: req.body.cep,
                complemento: req.body.complemento
            },
            {
                where: {
                    id: req.user.dataValues.perfil_id
                }
            }
        ).then(() => {
            res.redirect('/perfil')
        }).catch((err) => {
            res.send('falho cria, pq ' + err)
        })
    })

//Pedidos
/*Rota para visualizar os pedidos */
    router.get("/pedidos", eUsuario, (req, res) => {
        res.render('usuario/pedidos')
    })

//LogOut
/*rota para deslogar o usuario*/
    router.get("/deslogar", (req, res, next) => {
        req.logout((err) => {
            if(err){
                return next(err)
            }
            req.flash('success_msg', "Deslogado com sucesso")
            res.redirect("/")
        })
    })

//exportando as rotas
module.exports = router