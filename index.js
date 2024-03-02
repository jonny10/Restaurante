// Carregando módulos
    const express = require("express")
    const app = express()
    const { engine } = require('express-handlebars')
    const main = require("./routes/main_routes")
    const admin = require("./routes/admin")
    const usuario = require("./routes/usuario_route")
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')
    const passport = require("passport")
    require("./config/auth")(passport)
// Configurações
    // Public
        app.use(express.static(path.join(__dirname, "public")))
    // Sessão
        app.use(session({
            secret: "pRN?I7%1~0'_",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })
        app.use((req, res, next) => {
            if(req.user){
                if(req.user.dataValues.perfil_id == 2){
                    res.locals.eAdminLocal = 1
                    next()
                }else{
                    res.locals.eAdminLocal = null 
                    next()
                }
            }else{
                next()
            }
        })
    // Handlebars
        app.engine('handlebars', engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        }))
        app.set('view engine', 'handlebars')
    // Body-Parser
        app.use(express.urlencoded({extended: false}))
        app.use(express.json())


//importando rotas
    //admin
        app.use ("/admin", admin)
    //usuario
        app.use ("/usuario", usuario)
    //main
        app.use ("/", main)
        
        

//Rota não encontrada
    app.use(function(req, res, next) {
        res.status(404).render("rota404")
    });

// Outros
port = 8800
app.listen(port, () => {
    console.log("Servidor Online!")
})