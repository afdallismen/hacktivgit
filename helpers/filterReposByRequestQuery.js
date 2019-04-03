module.exports = (query, repos) => {
  let filters = Object.keys(query)
    .filter(field => field !== 'q')
    .reduce((acc, curr) => {
      acc[curr] = query[curr]
      return acc
    }, {})

  for (let field in filters) {
    repos = repos.filter(repo => Object.keys(repo).includes(field)
      ? String(repo[field]) === filters[field]
      : true
    )
  }

  let { q } = query
  
  if (q) {
    repos = repos.filter(repo => {
      const regex = new RegExp(`/.*${q}.*/`, 'i')
      let searchIn = [repo.owner.login, repo.name, repo.description]
      return searchIn.reduce((acc, curr) => acc || regex.test(curr) ,false)
    })
  }

  return repos
}