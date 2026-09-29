const { verifyToken } = require('../auth/tokenService');

function authenticate(req, res, next) {
    const authHeader = req.get('Authorization') ?? '';
    
    const match = /^Bearer (\S+)$/i.exec(authHeader);


    const claims = match ? verifyToken(match[1]) : null;

    if (!claims) {
        return res.status(401).json({ success: false, message: 'Silakan login dengan token yang valid (Unauthorized).' });
    }

    req.auth = claims;
    next();
} 
module.exports = { authenticate };