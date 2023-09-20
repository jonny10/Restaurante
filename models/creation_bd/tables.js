const DataTypes = require('sequelize')
const banco = require("../conexao_bd")

banco.authenticate().then(function(){
    console.log("sucesso paizão")
}).catch(function(erro){
    console.log("vish paizaão " + erro)
})

/*TABELA CRONOGRAMA */
const cronograma = banco.define('cronograma', {
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


/*TABELA USUARIO */
const usuario = banco.define('usuario', {
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

/*TABELA STATUS DO PEDIDO */
const status_do_pedido = banco.define('status_do_pedido', {
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
const pedidos = banco.define('pedidos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: usuario,
            key: 'id'
        }
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: status_do_pedido,
            key: 'id'
        }
    },
    tempo_de_entrega: {
        type: DataTypes.TIME  
    }
})

/*TABELA TIPOS */
const tipo = banco.define('tipo', {
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

/*TABELA TAMANHOS */
const tamanho = banco.define('tamanho', {
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

/*TABELA ITEM */
const item = banco.define('item', {
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
            model: tamanho,
            key: 'id'
        }
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: tipo,
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

/*TABELA DE JUNÇÃO PEDIDOS_ITEM */
const pedidos_itens = banco.define('pedidos_itens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pedidos_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: usuario,
            key: 'id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: item,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    valor_item: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    valor_total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
})

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

/** 
 * sincronizar banco
banco.sync({force: true})
*/