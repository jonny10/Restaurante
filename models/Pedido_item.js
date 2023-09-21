const DataTypes = require('sequelize')
const banco = require("./conexao_bd")
const Pedido = require("./Pedido")
const Item = require("./Item")

const Pedido_item = banco.define('pedidos_itens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pedidos_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Pedido,
            key: 'id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Item,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    valor_item: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    valor_total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
})
Pedido_item.sync({force: true})
module.exports = Pedido_item