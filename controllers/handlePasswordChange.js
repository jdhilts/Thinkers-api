const handlePasswordChange =(req, res, db, bcrypt)=> {

	//First we hash the password
	let hash = bcrypt.hashSync(req.body.password)

	db('users')
	.returning('password')
	.where({id: req.params.id})
	.update({password: hash})
	.then(password => {
		db('login')
		.where({id: req.params.id})
		.update({password: hash})
		.then(update => res.status(201).json('Update Successful!'))})
	.catch(error => res.status(400).json('Unable to update profile.'))
}

module.exports = {handlePasswordChange: handlePasswordChange}