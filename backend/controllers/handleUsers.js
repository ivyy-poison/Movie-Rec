const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models/db.js')
const {createNewUser, getUser, updateUser, deleteUser, checkUsername} = require('../models/users.js')
const { body, validationResult } = require('express-validator');


const handleLogIn = async (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and Password required.' });
    }

    const foundUser = await checkUsername(username)
    
    if (!foundUser) return res.status(401).json({ message: "No such username exist in our database"}); //Unauthorized 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "userId": foundUser.id },
            process.env.ACCESS_TOKEN_SECRET
        );
        // const refreshToken = jwt.sign(
        //     { "userId": foundUser.id },
        //     process.env.REFRESH_TOKEN_SECRET,
        //     { expiresIn: '1d' }
        // );
        
        // res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: false, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        
        res.json({ accessToken: accessToken });
    } else {
        res.status(401).json({message: "Incorrect Password"});
    }
}

const verifyJWT = (req, res, next) => {
    
    token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({message:"Unable to find Access Token"});
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({message: "There was issue with verifying your token"});
    }
}

const handleSignUp = async (req, res) => {
    const {username, email, password} = req.body
    const existing = checkUsername(username)
    if (!existing) {
        createNewUser(username, email, password)
        .then((result) => {
        res.send({
            message: "successful sign up", 
            result: result}
        )
        })
    } else {
        res.status(400).send({ message: "User already exists"})
    }
}

// const viewSelfProfile
const getDashboard = async (req, res) => {
    
    if (!req.user) {
        res.status(400).send({ message: "Not logged in" })
    } else {
        const { userId } = req.user
        const user = await getUser(userId)
        res.send(user)
    }
}


module.exports = { handleLogIn, verifyJWT, handleSignUp, getDashboard };