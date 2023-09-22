const fs = require('fs');
const Tipo = require("./Tipo")
const Tamanho = require("./Tamanho")
const Item = require("./Item")

var imageBife = fs.readFileSync('./transferir.jfif');
var imageChocolate = fs.readFileSync('./oxbvvg698zads1msu5k5.png');

//const pratos = Tipo.create({tipo: "Almoço"})
//const doces = Tipo.create({tipo: "Doces"})
//const salgados = Tipo.create({tipo: "Salgados"})
//const lanches = Tipo.create({tipo: "Lanches"})
//const porcoes = Tipo.create({tipo: "Porções"})
//const refri = Tipo.create({tipo: "Refrigerantes/Suco"})
//const cervejas = Tipo.create({tipo: "Cervejas"})


//const tamanh1 = Tamanho.create({id: 1, tamanho: "P"})
//const tamanho2 = Tamanho.create({id: 2, tamanho: "M"})
//const tamanho3 = Tamanho.create({id: 3, tamanho: "G"})
//const padrao = Tamanho.create({id: 4, tamanho: "Padrão"})

/*Item.update(
    {
        titulo: "Bife", 
        descricao: "Arroz, feijão, farofa, batata e bife acebolado", 
        tamanho_id: 1, 
        tipo_id: 1, 
        imagem_do_item: imageBife, 
        valor: 16.90
    },
    {
            where: {
            id: 8
        }
    }
)*/
/*doce = Item.create(
    {
        id: 2,
        titulo: "Chocolate", 
        descricao: "Snikers", 
        tamanho_id: 2, 
        tipo_id: 2, 
        imagem_do_item: imageChocolate, 
        valor: 4.00
    }
)*/

