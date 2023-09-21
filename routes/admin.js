const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('página inicial ADM')
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
    /*item = Item.create(
        {
            titulo: titulo, 
            descricao: descricao, 
            tamanho_id: tipo, 
            tipo_id: tamanho, 
            imagem_do_item: imagem, 
            valor: valor
        }
    )*/
    res.render('home')
})

module.exports = router