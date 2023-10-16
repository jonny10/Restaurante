const DataTypes = require('sequelize')
const banco = require("./conexao_bd")
const Usuario = require("./Usuario")
const Status_do_pedido = require("./Status_do_pedido")

const Pedido = banco.define('pedidos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status_do_pedido,
            key: 'id'
        }
    },
    tempo_de_entrega: {
        type: DataTypes.TIME  
    }
})
Usuario.hasMany(Pedido, {
    foreignKey: 'usuario_id'
})
Pedido.belongsTo(Status_do_pedido, {
    foreignKey: 'status_id'
})

module.exports = Pedido