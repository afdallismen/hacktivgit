const routes = require('express').Router()
const { UserRepo, Repo } = require('../controllers')

routes.get('/:username', Repo.list)
routes.get('/user', UserRepo.list)
routes.get('/user/starred', UserRepo.starred)
routes.delete('/user/starred/:owner/:repo', UserRepo.unStar)
routes.post('/user', UserRepo.create)

module.exports = routes