const Item = require("../models/Item")
const Tamanho = require("../models/Tamanho")

converterImagem = (imagem) => {
    return 'data:image/png;base64,' + Buffer.from(imagem, 'binary').toString('base64')
}

dividirTamanho = (pratos, nome) => {
    infos = {
        titulo: nome.replace(/ /g, "-")
    }
    if (!pratos[nome]) {
        pratos[nome] = {}
        pratos[nome]['infos'] = [infos]
        pratos[nome]['infosTamanhos'] = []
    }
}

module.exports = {
    separar: async (req, res, next) => {
        console.time("função de separação")
        res.locals.pratos = {}
        res.locals.doces = []
        res.locals.salgados = []
        res.locals.lanches = []
        res.locals.porcoes = []
        res.locals.refri = []
        res.locals.cervejas = []

        const itens = await Item.findAll({include: Tamanho})

        for (var i = 0; i < itens.length; i++) {

            itens[i]['dataValues']['imagem_do_item'] = converterImagem(itens[i]['dataValues']['imagem_do_item'])

            tipo = itens[i]['dataValues']['tipo_id']
            nome = itens[i]['dataValues']['titulo']

            if (tipo == 1){
                dividirTamanho(res.locals.pratos, nome)
                res.locals.pratos[nome]['infosTamanhos'].push(itens[i])
            }
            if (tipo == 2){
                res.locals.doces.push(itens[i])
            }
            if (tipo == 3){
                res.locals.lanches.push(itens[i])
            }
            if (tipo == 4){
                res.locals.salgados.push(itens[i])
            }
            if (tipo == 5){
                res.locals.porcoes.push(itens[i])
            }
            if (tipo == 6){
                res.locals.refri.push(itens[i])
            }
            if (tipo == 7){
                res.locals.cervejas.push(itens[i])
            }
        }
        console.timeEnd("função de separação")
        next()
    }
}