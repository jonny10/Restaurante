const DataTypes = require('sequelize')
const banco = require("./conexao_bd")

const Perfil = banco.define('perfil', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    perfil: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

module.exports = Perfil