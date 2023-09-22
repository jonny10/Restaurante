const DataTypes = require('sequelize')
const banco = require("./conexao_bd")

const Tamanho = banco.define('tamanho', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tamanho: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    }
})

module.exports = Tamanho