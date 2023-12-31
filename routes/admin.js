//Carregando os modulos dessa rota
const express = require('express')
const router = express.Router()
const Item = require("../models/Item")
const Cronograma = require("../models/Cronograma")
const multer = require('multer')
const upload = multer()
const {eAdmin} = require("../helpers/acesso")
const {verificarItem} = require("../helpers/verificar")


//rota inicial do admin, onde ficará as configurações disponiveis para o site
router.get('/', eAdmin, async  (req, res) => {
    const itens = await Item.findAll({include: ['tamanho', 'tipo']})
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
    let validarItem = verificarItem(req.body.nome, req.body.valor, req.body.tipo)
    if(validarItem.validar){ 
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
            req.flash("success_msg", "Item criado com sucesso!")
            res.redirect('/admin')
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao inserir o item no banco de dados, tente novamente! " + erro)
            res.redirect('/admin/adicionar-item')
        })
    }else{
        req.flash("error_msg", validarItem.erro)
        res.redirect('/admin/adicionar-item')
    }

})

/*rota em get que recebe o id do item como paremetro para executar um delete no banco de dados
via sequelize e após isso redireciona a página inicial de ADM*/
router.get('/apagar-item/:id', eAdmin, (req, res) => {
    Item.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        req.flash("success_msg", "Item apagado com sucesso!")
        res.redirect('/admin')
    }).catch((err) => {
        req.flash("error_msg", "Não foi possivel apagar o item do banco de dados, tente novamente! " + err)
        res.redirect('/admin')
    })
})

/*Rota em get que recebe o id do item como paremetro para buscar as informações desse item no banco de dados
e enviado a um formulário para ficar no value dos inputs e gerar um formulario já com as informações desse item
para que o admin possa edita-lo*/
router.get('/editar-item/:id', eAdmin, async (req, res) => {
    const item = await Item.findAll({
        include: ['tamanho', 'tipo'],
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
    let validarItem = verificarItem(req.body.nome, req.body.valor, req.body.tipo)
    if(validarItem.validar){ 
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
            req.flash("success_msg", "Item alterado com sucesso!")
            res.redirect('/admin')
        }).catch((erro) => {
            req.flash("error_msg", "Não foi possivel alterar as informações desse item no banco, tente novamente! " + erro)
            res.redirect('/admin')
        })
    }else{
        req.flash("error_msg", validarItem.erro)
        res.redirect('/admin/editar-item/'+ req.body.item)
    }
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
                id: 1
            }
        }
    ).then(() => {
        req.flash("success_msg", "Cronograma alterado com sucesso!")
        res.redirect('/admin')
    }).catch((err) => {
        req.flash("error_msg", "Não foi possivel alterar o cronograma no banco de dados, tente novamente! " + err)
        res.redirect('/admin')
    })
})

//exportando as rotas
module.exports = router