const Sequelize = require('sequelize')
const DataTypes = require('sequelize')
const banco = new Sequelize('railway','root', 'fTkhW48P9Gox2yuqQbXV', {
    host: 'containers-us-west-185.railway.app',
    dialect: 'mysql',
    port: '7153'
})

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
    },
    email: {
        type: DataTypes.email,
        unique: true
    },
    cep: {
        type: DataTypes.INTEGER(8),
    },
    complemento: {
        type: DataTypes.STRING
    },
    telefone: {
        type: DataTypes.STRING(11)
    },
    senha: {
        type: DataTypes.STRING
    }
})

usuario.sync({force: true})