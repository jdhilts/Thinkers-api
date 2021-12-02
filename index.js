const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const signup = require('./controllers/handleSignup')
const login = require('./controllers/handleLogin')
const profile = require('./controllers/handleProfile')
const article = require('./controllers/createArticle')
const comment = require('./controllers/postComment')
const getArticle = require('./controllers/handleArticle')
const getAllArticlesByUser = require('./controllers/handleAllArticlesByUser')
const comments = require('./controllers/handleAllCommentsForArticle')
const photo = require('./controllers/uploadPhoto')
const updatePhoto = require('./controllers/handlePhotoUpdate')
const getPhoto = require('./controllers/handlePhoto')
const updateProfile = require('./controllers/handleProfileUpdate')
const updateArticle = require('./controllers/handleArticleUpdate')
const getAllArticles = require('./controllers/handleAllArticles')
const changePassword = require('./controllers/handlePasswordChange')
const resetPassword = require('./controllers/handleResetPassword')
const sendResetEmail = require('./controllers/handleSendResetEmail')
const bcrypt = require('bcryptjs')
const auth = require('./controllers/authorization')
const knex = require('knex');
const fileUpload = require('express-fileupload')

const db = knex({
	client: 'pg',
	connectionString: process.env.PORT,
	ssl: {
		rejectUnauthorized: false
	}
})

const app = express();
app.use(cors());
app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=> getAllArticles.handleAllArticles(req, res, db))
app.post('/signup', (req, res)=> signup.handleSignup(req, res, db, bcrypt))	
app.post('/login', (req, res)=> login.handleLoginAuth(req, res, db, bcrypt))
app.get('/profile/:id', auth.requireAuth, (req, res)=> profile.handleProfile(req, res, db))
app.put('/update_profile/:id',  auth.requireAuth, (req, res)=> updateProfile.handleProfileUpdate(req,res, db))
app.post('/create_article/:id', auth.requireAuth, (req, res)=> article.createArticle(req, res, db))
app.patch('/update_article/:article_id', auth.requireAuth, (req, res)=> updateArticle.handleArticleUpdate(req, res, db))
app.get('/article/:article_id', (req, res)=> getArticle.handleArticle(req, res, db))
app.get('/articles/:id', auth.requireAuth, (req, res)=> getAllArticlesByUser.handleAllArticlesByUser(req, res, db))
app.post('/profile/:id/article/:article_id/comment', (req, res)=> comment.postComment(req, res, db))
app.get('/comments/:article_id', (req, res)=> comments.handleAllCommentsForArticle(req, res, db))	
app.post('/upload_photo/:id', auth.requireAuth, (req, res)=> photo.uploadPhoto(req, res, db))	
app.put('/update_photo/:id', auth.requireAuth, (req, res)=>  updatePhoto.handlePhotoUpdate(req, res, db))	
app.get('/photo/:id', (req, res)=> getPhoto.handlePhoto(req, res, db))
app.patch('/update_password/:id', auth.requireAuth, (req, res)=> changePassword.handlePasswordChange(req, res, db, bcrypt))
app.post('/send_reset_email', (req, res)=> sendResetEmail.handleSendResetEmail(req, res, db))
app.patch('/reset_password/', (req, res)=> resetPassword.handleResetPassword(req, res, db, bcrypt))

app.listen(process.env.PORT || 3000)
