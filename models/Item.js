const DataTypes = require('sequelize')
const banco = require("./conexao_bd")
const Tamanho = require("./Tamanho")
const Tipo = require("./Tipo")

const Item = banco.define('item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT
    },
    tamanho_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Tamanho,
            key: 'id'
        }
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Tipo,
            key: 'id'
        }
    },
    imagem_do_item: {
        type: DataTypes.BLOB('medium')
    },
    valor: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
})

module.exports = Item