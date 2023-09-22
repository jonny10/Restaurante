// Carregando módulos
    const express = require("express")
    const app = express()
    const { engine } = require('express-handlebars')
    const admin = require("./routes/admin")
    const path = require('path')
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
        app.use(express.urlencoded({extended: false}))
        app.use(express.json())
// Carregando models
    const Item = require("./models/Item")
    const Tamanho = require("./models/Tamanho")
    const { and } = require("sequelize")
// Rotas
titulos = []
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
        itens[i]['dataValues']['imagem_do_item'] = 'data:image/png;base64,' + Buffer.from(itens[i]['dataValues']['imagem_do_item'], 'binary').toString('base64')
        tipo = itens[i]['dataValues']['tipo_id']
        nome = itens[i]['dataValues']['titulo']
        imagem = itens[i]['dataValues']['imagem_do_item']
        titulos.push(itens[i]['dataValues']['titulo'])
        if (tipo == 1){
            infos = {
                titulo: nome,
                imagem_do_item: imagem
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
        cervejas: cervejas
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

app.get("/perfil",(req, res) => {
    res.render('perfil')
})

app.get("/pedidos",(req, res) => {
    res.render('pedidos')
})

// Outros
port = 8800
app.listen(port, () => {
    console.log("Servidor Online!")
})

module.exports = titulos