const DataTypes = require('sequelize')
const banco = require("./conexao_bd")

const Cronograma = banco.define('cronograma', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    segunda: {
        type: DataTypes.STRING
    },
    terca: {
        type: DataTypes.STRING
    },
    quarta: {
        type: DataTypes.STRING
    },
    quinta: {
        type: DataTypes.STRING
    },
    sexta: {
        type: DataTypes.STRING
    },
    sabado: {
        type: DataTypes.STRING
    }
})

module.exports = Cronograma