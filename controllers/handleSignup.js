const nodemailer = require('nodemailer')	

const handleSignup =(req, res, db, bcrypt)=> {
	//Check to see if there is already an account with same email.
	db.from('login')
	.select('email')
	.where({email: req.body.email})
	.then(email => {
		!email[0] ? addAccount(req, res, db, bcrypt)
		:
		res.status(400).json('Duplicate email.')		
	})
	.catch(error => Promise.reject(error))
}

const addAccount =(req, res, db, bcrypt)=> {
			//Hash out the password and insert into users and login.
			const hash = bcrypt.hashSync(req.body.password)
			confirmEmail(req, res)

			db('users')
			.insert({name: req.body.name, email: req.body.email, password: hash, date_joined: new Date()})
			.then(login => {
				db('login')
				.returning(['id','email','password'])
				.insert({email: req.body.email, password: hash})
				.then(user => res.status(200).json(user))
				.catch(error => Promise.reject('Server side error.'))
			})
		}

		const confirmEmail =(req, res)=> {

			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'kingjamesofcali@gmail.com',
					pass: 'Jh$207528'
				}
			})

			const {email} = req.body

			let mailOptions = {
				from: 'kingjamesofcali@gmail.com',
				to: email,
				subject: 'Thinkers email address confirmation.',
				text: 'Confirm your email address. Click the link below.',
				html: `<p>Click <a href="http://localhost:3001/login/">Confirm</a> to confirm your email address.</p>`
			}
			transporter.sendMail(mailOptions)
			.then(email => res.status(200).json(email))
			.catch(console.log)
		}

		module.exports = {handleSignup: handleSignup}



