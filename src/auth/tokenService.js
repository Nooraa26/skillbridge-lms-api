const jwt = require('jsonwebtoken');

// Mengambil secret dan expired dari process.env
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

function issueToken(userId) {
    return jwt.sign(
        { sub: String(userId) },
        JWT_SECRET,
        { algorithm: 'HS256', expiresIn: JWT_EXPIRES_IN }
    );
}

function verifyToken(token) {
    try {
        const claims = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
        if (typeof claims?.sub !== 'string' || !/^[1-9]\d*$/.test(claims.sub)) return null;
        return claims;
    } catch {
        return null;
    }
}

module.exports = { issueToken, verifyToken };