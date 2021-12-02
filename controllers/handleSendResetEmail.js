const nodemailer = require('nodemailer')

const handleSendResetEmail =(req, res, db)=> {

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'kingjamesofcali@gmail.com',
			pass: 'Jh$207528'
		}
	})

	db.from('users')
	.select('email')
	.returning('email')
	.where({
		email: req.body.email
	})
	.then(email => {
		if(!email[0].email){
			res.status(400).json('That email does not exist.')
		} else {
			email.map(email => {
				let mailOptions = {
					from: 'kingjamesofcali@gmail.com',
					to: req.body.email,
					subject: 'Reset Password Link',
					text: 'You have requested to reset your password. Click the link below.',
					html: `<p>Click <a href="http://localhost:3001/reset_password/">here</a> to reset your password</p>`
				}
				transporter.sendMail(mailOptions)
			})
		}
	})
	.then(sent => res.status(200).json('Email sent.'))
	.catch(error => res.status(400).json('Unable to send email.'))
}

module.exports = {handleSendResetEmail: handleSendResetEmail}
