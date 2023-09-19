const fs = require('fs');
const Tipo = require("./Tipo")
const Tamanho = require("./Tamanho")
const Item = require("./Item")

var imageFeijoada = fs.readFileSync('./transferir.jfif');
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

Item.update(
    {
        titulo: "Feijoada", 
        descricao: "Arroz e feijao preto 300g", 
        tamanho_id: 1, 
        tipo_id: 1, 
        imagem_do_item: imageFeijoada, 
        valor: 12.00
    },
    {
            where: {
            id: 1
        }
    }
)
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

