const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
function sign(user){ return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' }); }
function verifyToken(token){ try{ return jwt.verify(token, JWT_SECRET); }catch(e){ return null; } }
module.exports = { sign, verifyToken };
