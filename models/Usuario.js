const DataTypes = require('sequelize')
const banco = require("./conexao_bd")

const Usuario = banco.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    cep: {
        type: DataTypes.INTEGER(8)
    },
    complemento: {
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.STRING(11)
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Usuario