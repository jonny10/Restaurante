const DataTypes = require('sequelize')
const banco = require("./conexao_bd")

const Tipo = banco.define('tipo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    }
})

module.exports = Tipo