const router = require("express").Router()

router.use('/', require('./lunch.routes'))
router.use('/test', require('./test.routes'))



module.exports = router
