const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config');

const Authentication = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) return res.status(401).json({ status: 200, message: 'Access denied' });
    try {
        const verified = jwt.verify(token, tokenSecret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ status: 200, message: 'Invalid token.' });
    }
}

module.exports = Authentication;