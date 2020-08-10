const jwt = require('jsonwebtoken');

// Check if the client request has token in header without falcification 
module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    if (token == null) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
};