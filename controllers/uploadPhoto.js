
const uploadPhoto =(req, res, db)=> {

	req.files.photo.mv('./public/images/' + req.files.photo.name)

	db('photos')
	.insert({id: req.params.id, photo: req.files.photo.name})
	.then(photo => res.status(200).json('Success!'))
	.catch(error => res.status(400).json('Could not upload photo.'))	
}

module.exports = {uploadPhoto: uploadPhoto}