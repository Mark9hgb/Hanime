const { db, read } = require('../utils/db');
module.exports = async (req, res) => {
  await read();
  const q = (req.query.q || '').toLowerCase();
  let items = (db.data.videos || []).filter(v=>v.published);
  if (q) items = items.filter(v=> (v.title||'').toLowerCase().includes(q) || (v.tags||[]).some(t=>t.includes(q)));
  res.json({ items, total: items.length });
};
