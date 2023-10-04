//Carregando os modulos dessas rotas
const express = require('express')
const router = express.Router()
const Usuario = require("../models/Usuario")
const bcrypt  = require ('bcryptjs')
const passport = require("passport")
const {eUsuario} = require("../helpers/acesso")
const {VerificarCadastro} = require("../helpers/verificar")
const {verificarSenha} = require("../helpers/verificar")

//Cadastro
/*Rota para realizar o cadastro */
    router.get("/cadastro", function(req, res){
        res.render('usuario/cadastro')
    })

//Cadastrar
/*Rota para cadastrar o usuario no banco de dados*/
    router.post("/realizar-cadastro", function(req, res){
        res.render("carregando", {layout: false})
        let verificar = VerificarCadastro(req.body.nome, req.body.email, req.body.cep, req.body.telefone, req.body.senha)
        if(verificar.validar){
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
                        req.flash("error_msg", "Não foi possivel realizar o hash na senha")
                        res.redirect("/cadastro")
                    }else{
                        cadastrar.senha = hash
                        cadastrar.save().then(
                            (usuario) => {
                                req.login(usuario, {session: true}, (err) => {
                                    if (err) {
                                        req.flash('error_msg', "Usuario Cadastrado, realize o login")
                                        res.redirect('/')
                                    }
                                    // Redirecione para a página de perfil ou ação desejada após o login automático
                                    req.flash('success_msg', "Cadastrado com sucesso")
                                    res.redirect('/')
                                })
                            }
                        ).catch(
                            (erro) => {
                                req.flash('error_msg', "Falha ao inserir suas informações em nosso banco de dados, tente novamente! " + erro)
                                res.redirect('/cadastro')
                            }
                        )
                    }
                })
            })
        }else{
            req.flash("error_msg", verificar.erro)
            res.redirect('/cadastro')
        }
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
        let verificar = VerificarCadastro(req.body.nome, req.body.email, req.body.cep, req.body.telefone, req.body.senha)
        if(verificar.validar){
            if(
                req.user.dataValues.email == req.body.email &&
                req.user.dataValues.nome == req.body.nome &&
                req.user.dataValues.telefone == req.body.telefone &&
                req.user.dataValues.endereco == req.body.endereco &&
                req.user.dataValues.cep == req.body.cep &&
                req.user.dataValues.complemento == req.body.complemento
            ){
                req.flash("error_msg", "Nehuma informação foi alterada")
                res.redirect('/perfil')
            }else{
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
                            id: req.user.dataValues.id
                        }
                    }
                ).then(() => {
                    req.flash("success_msg", "Informações do perfil alteradas com sucesso!")
                    res.redirect('/perfil')
                }).catch((err) => {
                    req.flash("error_msg", "Não foi possivel alterar as informações do perfil no banco de dados, tente novamente! ")
                    res.redirect('/perfil')
                })
            }
        }else{
            req.flash("error_msg", verificar.erro)
            res.redirect('/cadastro')
        }
    })

//Alterar senha
/*Rota para receber o formulário que altera a senha do usuario*/
    router.post("/alterar-senha", eUsuario, (req, res) => {
        let senhaValida = verificarSenha(req.body.novaSenha)
        console.log(senhaValida)
        if(senhaValida.validar){
            bcrypt.compare(req.body.senhaAnterior, req.user.dataValues.senha, (erro, coincidem) => {
                if(coincidem){
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.novaSenha, salt, function(err, hash) {
                            if(err){
                                req.flash("error_msg", "Não foi possivel alterar a senha, houve um erro, tente novamente")
                                res.redirect('/perfil')
                            }else{
                                let senha = hash
                                Usuario.update(
                                    {
                                        senha: senha
                                    },
                                    {
                                        where: {
                                            id: req.user.dataValues.id
                                        }
                                    }
                                ).then(() => {
                                    req.flash("success_msg", "Senha alterada com sucesso")
                                    res.redirect('/perfil')
                                }).catch((err) => {
                                    req.flash("error_msg", "Não foi possivel alterar a senha, houve um erro, tente novamente")
                                    res.redirect('/perfil')
                                })
                            }
                        })
                    })
                }else{
                    req.flash("error_msg", "Senha atual incorreta")
                    res.redirect('/perfil')
                }
            })
        }else{
            req.flash("error_msg", senhaValida.erro)
            res.redirect('/perfil')
        }
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
                req.flash("error_msg", "Não foi possivel deslogar "+ err)
                res.redirect('/perfil')
            }
            req.flash('success_msg', "Deslogado com sucesso")
            res.redirect("/")
        })
    })

//Deletar perfil
/*rota para deletar o perfil do usuario */
    router.post("/deletar-conta", eUsuario, (req, res) => {
        if(req.body.confirma == "sim"){
            Usuario.destroy({
                where: {
                    id: req.user.dataValues.id
                }
            }).then(() => {
                req.logout((err) => {
                    if(err){
                        req.flash("error_msg", "Não foi possivel deslogar "+ err)
                        res.redirect('/')
                    }
                })
                req.flash('success_msg', "Conta deletada com sucesso")
                res.redirect("/")
            }).catch((err) => {
                req.flash("error_msg", "Não foi possivel deltar a conta, tente novamente "+ err)
                res.redirect('/perfil')
            })
        }
    })
//exportando as rotas
module.exports = router