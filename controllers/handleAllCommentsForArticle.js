const handleAllCommentsForArticle =(req, res, db)=> {


	db.from('comments')
	.select('*')
	.orderBy('date_of_comment', 'desc')
	.where({article_id: req.params.article_id})
	.then(comments => !comments[0] ? res.status(204).json('No Content') : res.status(200).json(comments))
	.catch(error => res.status(400).json('Could not get comments.'))
}

module.exports = {handleAllCommentsForArticle: handleAllCommentsForArticle}