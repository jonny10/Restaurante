const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('página inicial ADM')
})

module.exports = router