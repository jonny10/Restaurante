module.exports = {
    HelperSacola: (req, res, next) => {
        res.locals.sacola = []
        next()
    }
}