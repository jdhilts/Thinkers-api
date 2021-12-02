const redisClient = require('./handleLogin').redisClient

const requireAuth =(req, res, next)=> {
	const {authorization} = req.headers
	if(!authorization){
		return res.status(401).json('Unauthorized!')
	} 
		return redisClient.get(authorization, (error, reply)=> {
			if(error || !reply){
				return res.status(401).json('Unauthorized!')
			}
			return next()
		})
		console.log('You can have your way!')
		
	}	


module.exports = {requireAuth: requireAuth}