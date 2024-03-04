module.exports = {
    somarTotal: (req, res, next) => {
        valueTotal = 0
        for(item in req.app.locals.beg) {
            console.log(req.app.locals.beg[item]['total'])
            console.log(valueTotal)
            valueTotal = parseFloat(valueTotal) + parseFloat(req.app.locals.beg[item]['total'])
            console.log("value total do for: " + valueTotal)
        }
        req.app.locals.valueTotal = valueTotal
        next()
    }
}