const express = require('express')
const router = express.Router()
const Item = require("../models/Item")
const Cronograma = require("../models/Cronograma")
const multer = require('multer')
const upload = multer()


router.get('/', async (req, res) => {
    const itens = await Item.findAll({include: 'tamanho'})
    for (var i = 0; i < itens.length; i++) {
        imagem = itens[i]['dataValues']['imagem_do_item']
        itens[i]['dataValues']['imagem_do_item'] = 'data:image/png;base64,' + Buffer.from(imagem, 'binary').toString('base64')
    }
    const cronograma = await Cronograma.findAll()
    res.render('admin', {produtos: itens, cronograma: cronograma})
})

router.get('/adicionar-item', (req, res) => {
    res.render('adicionar-item')
})

router.get('/apagar-item/:id', (req, res) => {
    Item.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/admin')
    }).catch((err) => {
        res.send('Falho paizão pq' + err)
    })
})

router.get('/editar-item/:id', async (req, res) => {
    const item = await Item.findAll({
        include: 'tamanho',
        where: {
            id: req.params.id
        }
    })
    for (var i = 0; i < item.length; i++) {
        imagem = item[i]['dataValues']['imagem_do_item']
        item[i]['dataValues']['imagem_do_item'] = 'data:image/png;base64,' + Buffer.from(imagem, 'binary').toString('base64')
    }
    res.render('alterar-produto.handlebars', {item: item})
})

router.post('/alterar-item', upload.single('imagem'), (req, res) => {
    Item.update(
        {
            titulo: req.body.nome, 
            descricao: req.body.descricao, 
            tamanho_id: req.body.tamanho, 
            tipo_id: req.body.tipo, 
            imagem_do_item: req.file.buffer, 
            valor: req.body.valor
        },
        {
            where: {
                id: req.body.item
            }
        }
    ).then(() => {
        res.redirect('/admin')
    }).catch((erro) => {
        res.send('falho paizão' + erro)
    })
})

router.post('/form-item', upload.single('imagem'), (req, res) => {
    titulo = req.body.nome
    descricao = req.body.descricao
    tipo = req.body.tipo
    tamanho = req.body.tamanho
    valor = req.body.valor
    imageItem = req.file.buffer
    //multer
    Item.create(
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
    })
})

router.post('/alterar-cronograma', (req, res) => {
    Cronograma.update(
        {
            segunda: req.body.segunda,
            terca: req.body.terca,
            quarta: req.body.quarta,
            quinta: req.body.quinta,
            sexta: req.body.sexta,
            sabado: req.body.sabado,
        },
        {
            where: {
                id: 1
            }
        }
    ).then(() => {
        res.redirect('/admin')
    }).catch((err) => {
        res.send('falho cria, pq ' + err)
    })
})

module.exports = router