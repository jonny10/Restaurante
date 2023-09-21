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
        allowNull: true,
        unique: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    tamanho_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: Tamanho,
            key: 'id'
        }
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
Item.belongsTo(Tamanho, {foreignKey: 'tamanho_id'})

module.exports = Item