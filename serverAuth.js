require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const jwt = require('jsonwebtoken')
const { join } = require('path');
const cwd = process.cwd();
const public = join(cwd, 'public');
const axios = require('axios');

app.use(express.json())
app.use(express.static(public));
app.use(cookieParser());
let registeredUsers = [
    {
      username: 'Tosho',
      email: 'tosho@gmail.com',
      password: 'toshoPass'
    }
  ]
let refreshTokens = []

const indexHtml = join(cwd, 'public', 'index.html');
const loggedHtml = join(cwd, 'public', 'logged.html');

app.get('/', (req, res) => {
    res.sendFile(indexHtml)
})

app.get('/logged', (req, res) => {
    res.sendFile(loggedHtml);
});

app.post('/register',  (req, res) => {
    // console.log(req.body);
    //get data from request
    let userData = req.body;
    //check if credentials exist 
    if(registeredUsers.filter(user => user.email === userData.email).length > 0){
        console.log('user exists')
        //send res
        res.status(403).json({error: 'User with that email already exists'})
    }else{
        console.log('user does not exist')
        
        //add user to database
        registeredUsers.push(userData);
        console.log(registeredUsers)

        //generate token and resfresh token
        let access_token = generateAccessToken({username: userData.username});
        console.log(access_token);
        
        

        res.cookie('access_token', access_token, {
            httpOnly: true
        })

        let refresh_token = generateRefreshToken({username: userData.username});
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true
        })
        refreshTokens.push(refresh_token);
        console.log(refreshTokens);

        res.cookie('username', userData.username)


        res.json({success: true, redirect: 'http://localhost:3001/logged'})
    }
    
})



app.all('*', async (req, res) => {
    console.log(req.headers)
    console.log('authenticate token')
        const response = await axios({
            method: req.method,
            url: `http://localhost:3002${req.body.url}`,
            data: req.body,
            headers: {
                'Authorization': `Bearer ${req.cookies.access_token}`,
                'Cookie': req.headers.cookie
            },
            withCredentials: true
        })
    res.json(response.data)

})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1min'
    })
}

function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

app.listen(3001)