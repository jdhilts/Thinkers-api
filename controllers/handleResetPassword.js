const handleResetPassword =(req, res, db, bcrypt)=>{

	//First we hash the password
	let hash = bcrypt.hashSync(req.body.password)

	db('login')
	.where({email: req.body.email})
	.then(email => {
		!email[0] ? res.status(400).json(email) 
		:
		db('users')
		.where({email: req.body.email})
		.update({password: hash})
		.then(password => {
			db('login')
			.where({email: req.body.email})
			.update({password: hash})
			.then(update => res.status(200).json('Reset was successful!'))
			.catch(error => res.status(400).json('Your password could not be reset.'))
		})
	})
}


module.exports = {handleResetPassword: handleResetPassword}