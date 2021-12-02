const jwt = require('jsonwebtoken');
const redis = require('redis')
const redisClient = redis.createClient()

const handleLogin =(req, res, db, bcrypt)=> {
	//See if the email and password exists in the login table.
	return db.from('login')
	.select('*')
	.where({email: req.body.email})
	.then(user => {
		const isValid = bcrypt.compareSync(req.body.password, user[0].password);
		if(isValid){
			return user[0]
		}
	})
	.catch(error => Promise.reject('Not able to get account.'))
}

const getLoginTokenId =(req, res)=> {
	const {authorization} = req.headers
	return redisClient.get(authorization, (error, reply)=> {
		if(error || !reply){
			return res.status(400).json('Unauthorized')
		} else {
			return res.status(200).json({id: reply})
		}
	})
}

const signToken =(email)=> {
	const jwtPayload = {email}
	return jwt.sign(jwtPayload, 'JWT_SECRET_CHANGE_TO_ENVIRONMENT_VARIABLE');
}

const setToken =(token, id)=>{
	return Promise.resolve(redisClient.set(token, id))
}

const createLoginSession =(user)=> {
	const {id, email} = user
	const token = signToken(email)
	return setToken(token, id)
	.then(()=> { return {success: 'true', id: id, token}})
	.catch(console.log)
}

const handleLoginAuth =(req, res, db, bcrypt)=> {
	const {authorization} = req.headers
	return authorization ? getLoginTokenId(req, res)
	:
	handleLogin(req, res, db, bcrypt)
	.then(user => {
		return user.id && user.email ? createLoginSession(user)
		:
		Promise.reject(user)
	})
	.then(session => res.status(200).json(session))
	.catch(error => res.status(400).json(error))
}

module.exports = {handleLoginAuth: handleLoginAuth, redisClient: redisClient}
