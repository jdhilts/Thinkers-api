
const createArticle =(req, res, db)=> {
	
	db('article')
	.insert({id: req.params.id, title: req.body.title, body: req.body.body, date_published: new Date()})
	.then(article => res.status(200).json('Created article.'))
	.catch(error => res.status(400).json('Unable to post article.'))	
}

module.exports = {createArticle: createArticle}