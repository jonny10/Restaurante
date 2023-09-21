// Carregando módulos
    const express = require("express")
    const app = express()
    const { engine } = require('express-handlebars')
    const admin = require("./routes/admin")
    const path = require('path')
// Configurações
    // Handlebars
        app.engine('handlebars', engine())
        app.set('view engine', 'handlebars')
    // Public
        app.use(express.static(path.join(__dirname, "public")))
    // Body-Parser
        app.use(express.urlencoded({extended: false}))
        app.use(express.json())
// Rotas
app.get("/", (req, res) => {
    res.render('home')
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
