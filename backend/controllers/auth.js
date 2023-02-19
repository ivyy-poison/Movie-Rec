const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db/index.js')


const handleLogin = async (req, res) => {

    username = req.body.username
    password = req.body.password
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and Password required.' });
    }

    const {rows} = await db.query('SELECT * FROM users WHERE username = $1', [username])
    const foundUser = rows[0]

    if (!foundUser) return res.sendStatus(401); //Unauthorized 
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
        res.sendStatus(401);
    }
}


module.exports = { handleLogin };