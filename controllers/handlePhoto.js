const handlePhoto =(req, res, db)=> {

	db('photos')
	.where({
		id: req.params.id
	})
	.then(photo => {
		res.status(200).json(photo)
	})
	.catch(error => {
		res.status(400).json('Unable to get photo.')
	})
}

module.exports = {
	handlePhoto: handlePhoto
}