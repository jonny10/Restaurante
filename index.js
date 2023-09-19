// Carregando módulos
    const express = require("express")
    const app = express()
    const { engine } = require('express-handlebars')
    const admin = require("./routes/admin")
    const path = require('path')
    const bodyparser = require('body-parser')
// Configurações
    // Handlebars
        app.engine('handlebars', engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        }))
        app.set('view engine', 'handlebars')
    // Public
        app.use(express.static(path.join(__dirname, "public")))
    // Body-Parser
        app.use(bodyparser.urlencoded({extended: false}))
        app.use(bodyparser.json())
// Carregando models
    const Item = require("./models/Item")
    const Tamanho = require("./models/Tamanho")
const { and } = require("sequelize")
// Rotas
app.get("/", async (req, res) => {
    pratos = {}
    doces = []
    salgados = []
    lanches = []
    porcoes = []
    refri = []
    cervejas = []
    radio = []
    const itens = await Item.findAll({include: Tamanho})
    for (var i = 0; i < itens.length; i++) {
        itens[i]['dataValues']['imagem_do_item'] = 'data:image/png;base64,' + Buffer.from(itens[i]['dataValues']['imagem_do_item'], 'binary').toString('base64')
        tipo = itens[i]['dataValues']['tipo_id']
        nome = itens[i]['dataValues']['titulo']
        id = "btnradio" + itens[i]['dataValues']['id']

        if (tipo == 1){
            if (!pratos[nome]) {
                pratos[nome] = [];
            }
            pratos[nome].push(itens[i])
        }
        if (tipo == 2){
            doces.push(itens[i])
        }
        if (tipo == 3){
            salgados.push(itens[i])
        }
        if (tipo == 4){
            lanches.push(itens[i])
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
        refri: refri,
        cervejas: cervejas,
        radio: radio
    })
})

app.use ("/admin", admin)

app.get("/login", function(req, res){
    res.render('login')
})

app.get("/cadastro", function(req, res){
    res.render('cadastro')
})

app.get("/sacola", function(req, res){
    res.sendfile()
})

app.get("/informacoes", function(req, res){
    res.render("informacoes")
})

app.get("/contratamos", function(req, res){
    res.render("contratamos")
})


// Outros
port = 8800
app.listen(port, () => {
    console.log("Servidor Online!")
})
