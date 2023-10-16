const DataTypes = require('sequelize')
const banco = require("./conexao_bd")
const Perfil = require("./Perfil")

const Usuario = banco.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    perfil_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1,
        references: {
            model: Perfil,
            key: 'id'
        }
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING(14),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
Usuario.belongsTo(Perfil, {foreignKey: 'profile_id'})

module.exports = Usuario