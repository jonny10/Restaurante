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
// Rotas
app.get("/", (req, res) => {
    Item.findAll({
        where: {
            tipo_id: 1
        }
    }).then((prato) => {
        res.render('home', {almoco: prato})
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
