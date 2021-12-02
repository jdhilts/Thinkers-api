const handleAllArticles =(req, res, db)=> {

	db.select('*')
	.from('users')
	.join('article', {'article.id': 'users.id'})
	.orderBy('date_published', 'desc')
	.limit(10)
	.then(articles => res.status(200).json(articles))
	.catch(error => res.status(400).json('Could not get articles.'))
}

module.exports = {handleAllArticles: handleAllArticles}