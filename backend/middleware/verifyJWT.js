const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
}