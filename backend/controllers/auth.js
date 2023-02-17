const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../db/index.jsx')


const handleLogin = async (req, res) => {

    username = req.body.username
    password = req.body.password

    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    const {rows} = await db.query('SELECT * FROM users WHERE username = $1', [user])
    const foundUser = rows[0]

    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' } // change to 15 minutes
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        // const currentUser = { ...foundUser, refreshToken };
        // usersDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}


module.exports = { handleLogin };