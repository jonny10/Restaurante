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
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Item,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    valor_item: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
})
Pedido.belongsToMany(Item, { through: Pedido_item, foreignKey: 'pedidos_id', uniqueKey: 'id' })
Item.belongsToMany(Pedido, { through: Pedido_item, foreignKey: 'item_id', uniqueKey: 'id' })

module.exports = Pedido_item