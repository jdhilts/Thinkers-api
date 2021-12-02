
const handleArticle =(req, res, db)=> {

	db.select('*')
	.returning('*')
	.from('article')
	.join('users', {'article.id': 'users.id'})	
	.where({article_id: req.params.article_id})
	.then(article => !article[0] ? res.status(204).json('No Content') : res.status(200).json(article))
	.catch(error => res.status(400).json('Could not get article.'))
}

module.exports = {handleArticle: handleArticle}