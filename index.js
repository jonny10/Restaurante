// Carregando módulos
    const express = require("express")
    const app = express()
    const { engine } = require('express-handlebars')
    const admin = require("./routes/admin")
    const usuario = require("./routes/usuario_route")
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')
    const passport = require("passport")
    require("./config/auth")(passport)
// Configurações
    // Public
        app.use(express.static(path.join(__dirname, "public")))
    // Sessão
        app.use(session({
            secret: "pRN?I7%1~0'_",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })
        app.use((req, res, next) => {
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
        })
    // Handlebars
        app.engine('handlebars', engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        }))
        app.set('view engine', 'handlebars')
    // Body-Parser
        app.use(express.urlencoded({extended: false}))
        app.use(express.json())
// Carregando models
    const Item = require("./models/Item")
    const Tamanho = require("./models/Tamanho")
    const Cronograma = require("./models/Cronograma")
// Rotas
    //Home
    /*Uma rota inicial que busca no banco de dados todos os itens e verififica o tipo de cada item
    e organiza o tipo do item em uma array para que no html cada tipo de item fique em um determinado lugar
    e se o item for do tipo almoço ele é criada um objeto com o nome no primeiro array e as 3 informações
    de cada tamanho daquele mesmo na segunda array, para que no html seja possivel alterar somente o tamanho
    para visualizar as demais informações do mesmo item*/
        app.get("/", async (req, res) => {
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
            res.render('home', {
                almoco: pratos, 
                doces: doces,
                salgados: salgados,
                lanches: lanches,
                porcoes: porcoes,
                refrigerantes: refri,
                cervejas: cervejas
            })
        })

    //Sacola
    /*Rota para savola */
        app.get("/sacola", function(req, res){
            res.sendfile()
        })

    //Informações
    /*Rota para visualizar as informações do restaurante */
        app.get("/informacoes", function(req, res){
            Cronograma.findAll().then((cronograma) => {
                res.render("informacoes", {cronograma: cronograma})
            }).catch((err) => {
                let erro = "não foi possivel carregar o cronograma " + err
                res.render("informacoes", {cronograma: erro})
            })
            
        })

   //Contratamos 
   /*Em breve */
        app.get("/contratamos", function(req, res){
            res.render("contratamos")
        })

//importando rotas
    //admin
        app.use ("/admin", admin)
    //usuario
        app.use ("/", usuario)

// Outros
port = 8800
app.listen(port, () => {
    console.log("Servidor Online!")
})