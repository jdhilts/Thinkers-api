
const handleProfile =(req, res, db)=> {

	db.from('users')
	.where({id: req.params.id})
	.then(user => res.status(200).json(user))
	.catch(error => res.status(400).json('Could not get the user!'))
}

module.exports = {handleProfile: handleProfile}
