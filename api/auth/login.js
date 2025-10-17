const bcrypt = require('bcryptjs');
const { db, read } = require('../utils/db');
const { sign } = require('../utils/auth');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  await read();
  const { email, password } = req.body;
  const user = db.data.users.find(u=>u.email===email);
  if (!user) return res.status(400).json({ error:'invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error:'invalid credentials' });
  const token = sign(user);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
};
