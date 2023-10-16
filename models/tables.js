const DataTypes = require('sequelize')
const banco = require("./conexao_bd")

banco.authenticate().then(function(){
    console.log("sucesso paizão")
}).catch(function(erro){
    console.log("vish paizaão " + erro)
})

/*TABELA CRONOGRAMA */
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

/*TABELA PERFIL DO USUARIO*/
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

/*TABELA USUARIO */
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
Usuario.belongsTo(Perfil, {foreignKey: 'perfil_id'})

/*TABELA STATUS DO PEDIDO */
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

/*TABELA PEDIDOS */
const Pedido = banco.define('pedidos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status_do_pedido,
            key: 'id'
        }
    },
    tempo_de_entrega: {
        type: DataTypes.TIME  
    }
})
Usuario.hasMany(Pedido, {
    foreignKey: 'usuario_id'
})
Pedido.belongsTo(Status_do_pedido, {
    foreignKey: 'status_id'
})

/*TABELA TIPOS */
const Tipo = banco.define('tipo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

/*TABELA TAMANHOS */
const Tamanho = banco.define('tamanho', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tamanho: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

/*TABELA ITEM */
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

/*TABELA DE JUNÇÃO PEDIDOS_ITEM */
const Pedido_item = banco.define('pedidos_itens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pedidos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Item,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    valor_item: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
})
Pedido.belongsToMany(Item, { through: Pedido_item, foreignKey: 'pedidos_id', uniqueKey: 'id' })
Item.belongsToMany(Pedido, { through: Pedido_item, foreignKey: 'item_id', uniqueKey: 'id' })

/*
module.exports = {
    cronograma,
    usuario,
    status_do_pedido,
    pedidos,
    tipo,
    tamanho,
    item,
    pedidos_itens
}
*/

/** 
 * sincronizar banco
banco.sync({force: true})
*/