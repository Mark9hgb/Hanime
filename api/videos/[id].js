const { db, read } = require('../utils/db');
module.exports = async (req, res) => {
  await read();
  const id = req.query.id || req.query['id'] || (req.url.split('/').pop());
  const v = (db.data.videos||[]).find(x=>x.id===id);
  if (!v) return res.status(404).json({ error: 'not found' });
  res.json(v);
};
