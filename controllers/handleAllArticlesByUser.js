
const handleAllArticlesByUser =(req, res, db)=> {

	db.from('article')
    .select('id','title','body','date_published','article_id')
    .orderBy('date_published', 'desc')
	.where({id: req.params.id})
	.then(articles => res.status(200).json(articles))
	.catch(error => res.status(400).json('Could not get articles.'))
}

module.exports = {handleAllArticlesByUser: handleAllArticlesByUser}