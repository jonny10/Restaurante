const express = require("express")
const app = express()

app.get("/", function(req, res){
    res.sendfile(__dirname + "/views/index.html")
})

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

app.listen(8800, function(){
    console.log("Servidor Online!")
})