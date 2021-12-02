const handleProfileUpdate =(req, res, db)=> {

	db('users')
	.returning('email')
	.where({id: req.params.id})
	.update({name: req.body.name, email: req.body.email})
	.then(email => {
		db('login')
		.where({id: req.params.id})
		.update({email: req.body.email})
		.then(update => res.status(201).json('Update Successful!'))})
	.catch(error => res.status(400).json('Unable to update profile.'))
}

module.exports = {handleProfileUpdate: handleProfileUpdate}