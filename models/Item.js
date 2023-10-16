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
        allowNull: false,
        unique: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    tamanho_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
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
        type: DataTypes.BLOB('medium'),
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    }
})
Item.belongsTo(Tamanho, {foreignKey: 'tamanho_id'})
Item.belongsTo(Tipo, {foreignKey: 'tipo_id'})

module.exports = Item