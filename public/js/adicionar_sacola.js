const Tamanho = require("../../models/Tamanho")
const Item = require("../../models/Item")


function adicionar(item){
    const produto = Item.findOne(
        {
            include: Tamanho,
            where: {
                id: item
            }
        }
    )
    sacola.push(produto)
}