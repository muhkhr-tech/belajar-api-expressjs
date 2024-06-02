const express = require('express')
const user = require('./routes/user')
const {user: userModel} = require('./models')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path');

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

const SECRET = '123'

const isValid = (req, res, next) => {
    try {
        jwt.verify(req.cookies.token, SECRET)
        next()
    } catch (err) {
        // res.sendFile(path.join(__dirname, '/index.html'))
        res.redirect('/login')
    }
}

app.use('/user', isValid, user)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'))
})

app.post('/login', async (req, res) => {
    
    try {
        const isUser = await userModel.findOne({where: {username: req.body.username}})

        if (!isUser) {
            return res.redirect('/login')
        }

        if (isUser.password !== req.body.password) {
            return res.redirect('/login')
        }
    
        const token = jwt.sign({
            user: 'rafiq123'
        }, SECRET, {expiresIn: '30s'})
    
        res.cookie('token', token).redirect('/')
    } catch (err) {
        res.status(500).send('Internal server error')
    }
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/register.html'))
})

app.post('/register', async (req, res) => {
    const isUserExists = await userModel.findOne({where: {username: req.body.username}})

    if (!isUserExists) {
        await userModel.create(req.body)
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, '/register.html'))
})

app.listen(3000, () => {
    console.log('server running on port 3000')
})