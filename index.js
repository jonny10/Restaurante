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

// Rotas
app.get("/", (req, res) => {
    res.render('home')
})

app.use ("/admin", admin)

app.get("/informacoes", function(req, res){
    res.sendfile(__dirname + "/views/informacoes.html")
})

app.get("/cadastro", function(req, res){
    res.sendfile()
})

app.get("/login", function(req, res){
    res.sendfile()
})

app.get("/sacola", function(req, res){
    res.sendfile()
})

app.get("/contratamos", function(req, res){
    res.sendfile()
})


// Outros
port = 8800
app.listen(port, () => {
    console.log("Servidor Online!")
})
