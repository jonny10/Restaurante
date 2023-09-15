const DataTypes = require('sequelize')
const banco = require("./conexao_bd")

const Status_do_pedido = banco.define('status_do_pedido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING
    }
})

module.exports = Status_do_pedido