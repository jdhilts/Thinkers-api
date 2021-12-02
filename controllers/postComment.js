
const postComment =(req, res, db)=> {

	db('comments')
	.insert({
		id: req.params.id, 
		article_id: req.params.article_id,
		date_of_comment: new Date(),
		comment: req.body.comment
	})
	.then(comment => res.status(200).json('Success!'))
	.catch(error => res.status(400).json('Unable to post comment.'))
}

module.exports = {postComment: postComment}