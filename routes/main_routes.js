//Carregando os modulos dessas rotas
const express = require('express')
const router = express.Router()
const Item = require("../models/Item")
const Cronograma = require("../models/Cronograma")
const Tamanho = require("../models/Tamanho")
const {eUsuario} = require("../helpers/acesso")
const {begEnough} = require("../helpers/acesso")
const {somarTotal} = require("../helpers/somarTotal")


// Rotas
    //Home
    /*Uma rota inicial que busca no banco de dados todos os itens e verififica o tipo de cada item
    e organiza o tipo do item em uma array para que no html cada tipo de item fique em um determinado lugar
    e se o item for do tipo almoço ele é criada um objeto com o nome no primeiro array e as 3 informações
    de cada tamanho daquele mesmo na segunda array, para que no html seja possivel alterar somente o tamanho
    para visualizar as demais informações do mesmo item*/
        router.get("/", async (req, res) => {
            pratos = {}
            doces = []
            salgados = []
            lanches = []
            porcoes = []
            refri = []
            cervejas = []
            
            const itens = await Item.findAll({include: Tamanho})
            for (var i = 0; i < itens.length; i++) {
                imagem = itens[i]['dataValues']['imagem_do_item']
                itens[i]['dataValues']['imagem_do_item'] = 'data:image/png;base64,' + Buffer.from(imagem, 'binary').toString('base64')
                tipo = itens[i]['dataValues']['tipo_id']
                nome = itens[i]['dataValues']['titulo']
                if (tipo == 1){
                    infos = {
                        titulo: nome.replace(/ /g, "-"),
                    }
                    if (!pratos[nome]) {
                        pratos[nome] = {}
                        pratos[nome]['infos'] = []
                        pratos[nome]['infosTamanhos'] = []
                        pratos[nome]['infos'].push(infos)
                    }
                    pratos[nome]['infosTamanhos'].push(itens[i])
                }
                if (tipo == 2){
                    doces.push(itens[i])
                }
                if (tipo == 3){
                    lanches.push(itens[i])
                }
                if (tipo == 4){
                    salgados.push(itens[i])
                }
                if (tipo == 5){
                    porcoes.push(itens[i])
                }
                if (tipo == 6){
                    refri.push(itens[i])
                }
                if (tipo == 7){
                    cervejas.push(itens[i])
                }
            }
            res.render('main/home', {
                almoco: pratos, 
                doces: doces,
                salgados: salgados,
                lanches: lanches,
                porcoes: porcoes,
                refrigerantes: refri,
                cervejas: cervejas
            })
        })

    //addbag
    /*Rota para adicionar item a sacola, onde ele realizar uma busca do item no banco de dados e após encontra-lo
    verifica se há algum valor no variavel local beg, caso não tenha ele cria um objeto e inseri o item com a quantidade 1
    e caso já tenha algum valor nessa variavel ele verificar se dentro desse objeto há o item verificando o id do item do banco de dados dentro
    do objeto e caso já tenha esse item, ele adiciona mais 1 a quantidade, e caso não tenha ele define o item com a quantidade 1 e adiciona a sacola
    e após isso redireciona a página inicial novamente*/
        router.get("/addbag/:id", function(req, res){
            Item.findOne({
                include: Tamanho,
                where: {
                    id: req.params.id
                }
            }).then((item) => {
                id_do_item = item['dataValues']['id']
                if(req.app.locals.beg){
                    if(req.app['locals']['beg'][id_do_item]){
                        req.app['locals']['beg'][id_do_item]['quantity']++
                        req.app['locals']['beg'][id_do_item]['total'] = req.app['locals']['beg'][id_do_item]['valor'] * req.app['locals']['beg'][id_do_item]['quantity']
                    }else{
                        item['dataValues']['quantity'] = 1
                        item['dataValues']['total'] = item['dataValues']['valor']
                        req.app['locals']['beg'][item.dataValues.id] = item.dataValues
                    }
                }else{
                    item['dataValues']['quantity'] = 1
                    item['dataValues']['total'] = item['dataValues']['valor']
                    req.app.locals.beg = {}
                    req.app['locals']['beg'][item.dataValues.id] = item.dataValues
                }
                res.redirect("/")
            }).catch((err) => {
                req.flash("error_msg", "Não foi possivel encontrar o item do banco de dados, tente novamente! " + err)
                res.redirect("/")
            })
        })

    //cleanbag
    /*Rota para limpar a sacola, ele apenas define a variavel local beg como um objeto vazio ou retorna um erro caso não consiga,
    e redireciona a tela inicial*/
        router.get("/cleanbag", function(req, res){
            try{
                delete req.app.locals.beg
                res.redirect("/")
            } catch (error) {
                req.flash("error_msg", "Não foi possivel limpar a sacola, tente novamente! " + error)
                res.redirect("/")
            }
        })

    //additem
    /*Rota para aumentar a quantidade do item na sacola, apenas aumentando mais 1 na quantidade do item em espécifico
    ou retorna um erro caso não consiga e redireciona a tela incial*/
        router.get("/additem/:id", function(req, res){
            try {
                id = req.params.id
                req.app['locals']['beg'][id]['quantity']++
                req.app['locals']['beg'][id_do_item]['total'] = req.app['locals']['beg'][id_do_item]['valor'] * req.app['locals']['beg'][id_do_item]['quantity']
                res.redirect("/")
            } catch (error) {
                req.flash("error_msg", "Não aumentar a quantidade do item, tente novamente! " + error)
                res.redirect("/")
            } 
        })

    //subitem
    /*Rota para subtrair a quantidade do item na sacola, apenas subtrai mais 1 na quantidade do item em espécifico
    e caso a quantidade do item especifico seja igual a 0, é deletado essa propriedade(item) do objeto, caso ela não consiga executar
    ele retorna um erro caso não consiga e redireciona a tela incial*/
        router.get("/subitem/:id", function(req, res){
            try {
                id = req.params.id
                req.app['locals']['beg'][id]['quantity']--
                req.app['locals']['beg'][id_do_item]['total'] = req.app['locals']['beg'][id_do_item]['valor'] * req.app['locals']['beg'][id_do_item]['quantity']
                if(req.app['locals']['beg'][id]['quantity'] == 0){
                    delete req.app['locals']['beg'][id]
                    if(Object.keys(req.app.locals.beg).length == 0) {
                        delete req.app.locals.beg
                    }
                }
                res.redirect("/")
            } catch (error) {
                req.flash("error_msg", "Não aumentar a quantidade do item, tente novamente! " + error)
                res.redirect("/")
            } 
        })

    //Sacola
    /*Rota para sacola */
        router.get("/sacola", begEnough, eUsuario, somarTotal, function(req, res){
            console.log(req.app.locals.beg)
            res.render("main/payment")
        })

    //Informações
    /*Rota para visualizar as informações do restaurante */
        router.get("/informacoes", function(req, res){
            Cronograma.findAll().then((cronograma) => {
                res.render("main/informacoes", {cronograma: cronograma})
            }).catch((err) => {
                let erro = "não foi possivel carregar o cronograma " + err
                res.render("main/informacoes", {cronograma: erro})
            })
        })

    //Contratamos 
    /*Em breve */
        router.get("/contratamos", function(req, res){
            res.render("main/contratamos")
        })

    //Rota não encontrada
        router.use(function(req, res, next) {
            res.status(404).render("main/rota404")
        });

//exportando as rotas
module.exports = router