const axios = require('axios')
// const { filterRepos } = require('../helpers')

const ax = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Authorization': `token ${process.env.GH_KEY}`
  }
})

module.exports = {
  list: ({ params: { username }}, res) => {
    ax
      .get(`/users/${username}/repos`)
      .then(({ status, data}) => res.status(status).json(data))
      .catch(({ response: { status, data } }) => res.status(status).json(data))
  }
}