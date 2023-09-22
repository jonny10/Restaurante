const express = require('express')
const router = express.Router()
const Item = require("../models/Item")
const fs = require('fs');
const { type } = require('os');


router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/adicionar-item', (req, res) => {
    res.render('adicionar-item')
})

router.post('/form-item', (req, res) => {
    titulo = req.body.nome
    descricao = req.body.descricao
    tipo = req.body.tipo
    tamanho = req.body.tamanho
    valor = req.body.valor
    imagem = req.body.imagem
    //multer
    /*Item.create(
        {
            titulo: titulo, 
            descricao: descricao, 
            tamanho_id: tamanho, 
            tipo_id: tipo, 
            imagem_do_item: imageItem, 
            valor: valor
        }
    ).then(() => {
        res.redirect('/')
    }).catch((erro) => {
        res.send('falho paizão' + erro)
    })*/
})

module.exports = router