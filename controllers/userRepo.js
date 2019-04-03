const axios = require('axios')
const { filterRepos } = require('../helpers')

const ax = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Authorization': `token ${process.env.GH_KEY}`
  }
})

module.exports = {
  list: (req, res) => {
    ax
      .get('/user')
      .then(({ status, data}) => res.status(status).json(data))
      .catch(({ response: { status, data } }) => res.status(status).json(data))
  },
  starred: (req, res) => {
    ax
      .get('/user/starred')
      .then(({ status, data}) => {
        data = filterRepos(req.query, data)
        res.status(status).json(data)
      })
      .catch(({ response: { status, data } }) => res.status(status).json(data))
  },
  create: ({ body: { name, description }}, res) => {
    ax
      .post('/user/repos', { name, description })
      .then(({ status, data }) => res.status(status).json(data))
      .catch(({ response: { status, data } }) => res.status(status).json(data))
  },
  unStar: ({ params: { owner, repo }}, res) => {
    ax
      .delete(`/user/starred/${owner}/${repo}`)
      .then(({ status, data }) => res.status(status).json(data))
      .catch(({ response: { status, data } }) => res.status(status).json(data))
  }
}