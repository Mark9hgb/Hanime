const bcrypt = require('bcryptjs');
const { db, read } = require('../utils/db');
const { nanoid } = require('nanoid');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  await read();
  const { email, password, dob } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email+password required' });
  if (db.data.users.find(u=>u.email===email)) return res.status(400).json({ error: 'email exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: nanoid(), email, password: hashed, dob: dob||null, role: (email==='markjavier1648@gmail.com') ? 'admin' : 'user', createdAt: new Date().toISOString() };
  db.data.users.push(user);
  await db.write();
  res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
};
