var express = require('express')
var routes = require('./routes/routes')

var app = express()
var router = express.Router()

app.use(`/api/v${process.env.APP_VERSION}`, router)
router.use(express.json())

routes.setup(router)

app.listen(process.env.PORT, console.info('API is up and running...'))