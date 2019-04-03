const routes = require('express').Router()

routes.use('/repos', require('./repos'))

module.exports = routes