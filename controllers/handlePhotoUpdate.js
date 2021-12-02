const fs = require('fs')

const handlePhotoUpdate =(req, res, db)=> {
	//Get the existing photo and delete it from the file system before updating 
	//with new photo.
	db.from('photos')
	.returning(['id, photo'])
	.where({id: req.params.id})
	.then(photo => {photo.map(photo => {
		const pathToFile = "./public/images/" + photo.photo
		fs.unlinkSync(pathToFile)
	})			
})		
	//Add new photo to file path
	.then(photo => {req.files.photo.mv('./public/images/' + req.files.photo.name)
	//Update photos table where id 
	db('photos')
	.where({id: req.params.id})
	.update({photo: req.files.photo.name})
	.then(photo => res.status(200).json('Success!'))
	.catch(error => res.status(400).json('Unable to update photo.'))
})
}
module.exports = {handlePhotoUpdate: handlePhotoUpdate}