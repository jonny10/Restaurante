//Carregando os modulos dessa rota
const express = require('express')
const router = express.Router()
const Item = require("../models/Item")
const Cronograma = require("../models/Cronograma")
const multer = require('multer')
const upload = multer()
const {eAdmin} = require("../helpers/acesso")


//rota inicial do admin, onde ficará as configurações disponiveis para o site
router.get('/', eAdmin, async  (req, res) => {
    const itens = await Item.findAll({include: 'tamanho'})
    for (var i = 0; i < itens.length; i++) {
        imagem = itens[i]['dataValues']['imagem_do_item']
        itens[i]['dataValues']['imagem_do_item'] = 'data:image/png;base64,' + Buffer.from(imagem, 'binary').toString('base64')
    }
    const cronograma = await Cronograma.findAll()
    res.render('admin/index', {produtos: itens, cronograma: cronograma})
})

//rota para renderizar um formulário para adicionar um novo item no restaurante
router.get('/adicionar-item', eAdmin, (req, res) => {
    res.render('admin/adicionar-item')
})

/*rota em post para receber as informações do formulário de adiçaõ de itens, para que receba
as informações dos inputs e faça um insert no banco de dado via sequelize e após isso
redirecione o usuario a página inicial de ADM*/
router.post('/form-item', eAdmin, upload.single('imagem'), (req, res) => {
    titulo = req.body.nome
    descricao = req.body.descricao
    tipo = req.body.tipo
    tamanho = req.body.tamanho
    valor = req.body.valor
    imageItem = req.file.buffer
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

/*rota em get que recebe o id do item como paremetro para executar um delete no banco de dados
via sequelize e após isso redireciona a página inicial de ADM*/
router.get('/apagar-item/:id', eAdmin, (req, res) => {
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

/*Rota em get que recebe o id do item como paremetro para buscar as informações desse item no banco de dados
e enviado a um formulário para ficar no value dos inputs e gerar um formulario já com as informações desse item
para que o admin possa edita-lo*/
router.get('/editar-item/:id', eAdmin, async (req, res) => {
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
    res.render('admin/alterar-produto.handlebars', {item: item})
})

/*Rota post que recebe o formulário de edição de itens e recebe as informações do form e executa um
update no banco de dados  e altera aquele item via sequelize e após isso redireciona a página inicial adm*/
router.post('/alterar-item', eAdmin, upload.single('imagem'), (req, res) => {
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

/*Rota post que recebe o formulário do cronograma que está na página inicial de adm e realiza um update
no banco de dado do cronograma do restaurante via sequelize e pós isso redireciona página inicial de ADM */
router.post('/alterar-cronograma', eAdmin, (req, res) => {
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
                id: req.user.dataValues.nome
            }
        }
    ).then(() => {
        res.redirect('/admin')
    }).catch((err) => {
        res.send('falho cria, pq ' + err)
    })
})

//exportando as rotas
module.exports = router