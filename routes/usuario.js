//Carregando os modulos dessas rotas
const express = require('express')
const router = express.Router()

//Login
/*Rota para realizar o login*/
    router.get("/login", function(req, res){
        res.render('usuario/login')
    })

//Cadastro
/*Rota para realizar o cadastro */
    router.get("/cadastro", function(req, res){
        res.render('usuario/cadastro')
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