 const handleArticleUpdate =(req, res, db)=> {

 	db('article')
	.where({article_id: req.params.article_id})
	.update({title: req.body.title, body: req.body.body})
	.then(article => res.status(200).json(article))
	.catch(error => res.status(400).json('Unable to update profile.'))
 }

 module.exports = {handleArticleUpdate: handleArticleUpdate}